import stripe
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import get_current_parent
from app.models.parent_user import ParentUser
from app.models.subscription import PlanType, Subscription, SubscriptionStatus
from app.schemas.subscription import (
    CheckoutSessionResponse,
    CreateCheckoutSession,
    SubscriptionResponse,
)

router = APIRouter(prefix="/payments", tags=["payments"])

stripe.api_key = settings.STRIPE_SECRET_KEY

_PRICE_MAP = {
    PlanType.MONTHLY: settings.STRIPE_MONTHLY_PRICE_ID,
    PlanType.YEARLY: settings.STRIPE_YEARLY_PRICE_ID,
}


@router.get("/subscription", response_model=SubscriptionResponse | None)
async def get_subscription(
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> SubscriptionResponse | None:
    result = await db.execute(select(Subscription).where(Subscription.parent_id == parent.id))
    sub = result.scalar_one_or_none()
    if not sub:
        return None
    return SubscriptionResponse.model_validate(sub)


@router.post("/create-checkout-session", response_model=CheckoutSessionResponse)
async def create_checkout_session(
    data: CreateCheckoutSession,
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> CheckoutSessionResponse:
    price_id = _PRICE_MAP.get(data.plan_type)
    if not price_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Geçersiz plan tipi.",
        )

    # Mevcut Stripe customer kontrolü
    result = await db.execute(select(Subscription).where(Subscription.parent_id == parent.id))
    sub = result.scalar_one_or_none()
    customer_id = sub.stripe_customer_id if sub else None

    if not customer_id:
        customer = stripe.Customer.create(
            email=parent.email,
            name=f"{parent.first_name} {parent.last_name}",
            metadata={"parent_id": str(parent.id)},
        )
        customer_id = customer.id

    session = stripe.checkout.Session.create(
        customer=customer_id,
        payment_method_types=["card"],
        line_items=[{"price": price_id, "quantity": 1}],
        mode="subscription",
        subscription_data={
            "trial_period_days": 7,
            "metadata": {
                "parent_id": str(parent.id),
                "plan_type": data.plan_type.value,
            },
        },
        success_url=f"{settings.ALLOWED_ORIGINS.split(',')[0]}/odeme/basarili?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{settings.ALLOWED_ORIGINS.split(',')[0]}/ucretlendirme",
        metadata={"parent_id": str(parent.id), "plan_type": data.plan_type.value},
    )

    return CheckoutSessionResponse(checkout_url=session.url)


@router.post("/webhook", include_in_schema=False)
async def stripe_webhook(request: Request, db: AsyncSession = Depends(get_db)) -> dict:
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except stripe.SignatureVerificationError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Geçersiz imza.")

    event_type = event["type"]
    data_obj = event["data"]["object"]

    if event_type == "checkout.session.completed":
        await _handle_checkout_completed(db, data_obj)
    elif event_type == "customer.subscription.updated":
        await _handle_subscription_updated(db, data_obj)
    elif event_type == "customer.subscription.deleted":
        await _handle_subscription_deleted(db, data_obj)
    elif event_type in ("invoice.payment_failed", "invoice.payment_action_required"):
        await _handle_payment_failed(db, data_obj)

    return {"received": True}


async def _handle_checkout_completed(db: AsyncSession, session: dict) -> None:
    from datetime import UTC, datetime, timedelta

    parent_id = int(session["metadata"]["parent_id"])
    plan_type_str = session["metadata"]["plan_type"]
    customer_id = session["customer"]
    stripe_sub_id = session.get("subscription")

    result = await db.execute(select(Subscription).where(Subscription.parent_id == parent_id))
    sub = result.scalar_one_or_none()

    now = datetime.now(UTC)
    trial_end = now + timedelta(days=7)

    if sub:
        sub.stripe_customer_id = customer_id
        sub.stripe_subscription_id = stripe_sub_id
        sub.plan_type = PlanType(plan_type_str)
        sub.status = SubscriptionStatus.TRIAL
        sub.trial_start = now
        sub.trial_end = trial_end
    else:
        sub = Subscription(
            parent_id=parent_id,
            stripe_customer_id=customer_id,
            stripe_subscription_id=stripe_sub_id,
            plan_type=PlanType(plan_type_str),
            status=SubscriptionStatus.TRIAL,
            trial_start=now,
            trial_end=trial_end,
        )
        db.add(sub)

    await db.flush()


async def _handle_subscription_updated(db: AsyncSession, stripe_sub: dict) -> None:
    from datetime import UTC, datetime

    sub_id = stripe_sub["id"]
    result = await db.execute(
        select(Subscription).where(Subscription.stripe_subscription_id == sub_id)
    )
    sub = result.scalar_one_or_none()
    if not sub:
        return

    stripe_status = stripe_sub["status"]
    if stripe_status == "active":
        sub.status = SubscriptionStatus.ACTIVE
        period_end = stripe_sub.get("current_period_end")
        if period_end:
            sub.current_period_end = datetime.fromtimestamp(period_end, tz=UTC)
    elif stripe_status == "past_due":
        sub.status = SubscriptionStatus.PAST_DUE
    elif stripe_status == "canceled":
        sub.status = SubscriptionStatus.CANCELLED

    await db.flush()


async def _handle_subscription_deleted(db: AsyncSession, stripe_sub: dict) -> None:
    sub_id = stripe_sub["id"]
    result = await db.execute(
        select(Subscription).where(Subscription.stripe_subscription_id == sub_id)
    )
    sub = result.scalar_one_or_none()
    if sub:
        sub.status = SubscriptionStatus.CANCELLED
        await db.flush()


async def _handle_payment_failed(db: AsyncSession, invoice: dict) -> None:
    sub_id = invoice.get("subscription")
    if not sub_id:
        return
    result = await db.execute(
        select(Subscription).where(Subscription.stripe_subscription_id == sub_id)
    )
    sub = result.scalar_one_or_none()
    if sub:
        sub.status = SubscriptionStatus.PAST_DUE
        await db.flush()
