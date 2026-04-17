from datetime import datetime

from pydantic import BaseModel

from app.models.subscription import PlanType, SubscriptionStatus


class SubscriptionResponse(BaseModel):
    id: int
    plan_type: PlanType
    status: SubscriptionStatus
    trial_start: datetime | None
    trial_end: datetime | None
    current_period_end: datetime | None
    auto_renew: bool
    is_active: bool

    model_config = {"from_attributes": True}


class CreateCheckoutSession(BaseModel):
    plan_type: PlanType


class CheckoutSessionResponse(BaseModel):
    checkout_url: str
