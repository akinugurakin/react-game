import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from redis.asyncio import Redis
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.security import decode_token
from app.models.parent_user import ParentUser
from app.models.student_profile import StudentProfile
from app.models.subscription import Subscription

security_scheme = HTTPBearer()

_redis_client: Redis | None = None


async def get_redis() -> Redis:
    global _redis_client
    if _redis_client is None:
        _redis_client = Redis.from_url(settings.REDIS_URL, decode_responses=True)
    return _redis_client


def _decode_bearer(credentials: HTTPAuthorizationCredentials) -> dict:
    try:
        return decode_token(credentials.credentials)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token süresi dolmuş.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Geçersiz token.")


async def get_current_parent(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
    db: AsyncSession = Depends(get_db),
) -> ParentUser:
    payload = _decode_bearer(credentials)

    if payload.get("type") != "access" or payload.get("role") != "parent":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Geçersiz token.")

    result = await db.execute(select(ParentUser).where(ParentUser.id == int(payload["sub"])))
    parent = result.scalar_one_or_none()
    if not parent or not parent.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Kullanıcı bulunamadı.")
    return parent


async def get_current_student(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
    db: AsyncSession = Depends(get_db),
) -> StudentProfile:
    payload = _decode_bearer(credentials)

    if payload.get("type") != "student_session":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Geçersiz token.")

    result = await db.execute(
        select(StudentProfile).where(StudentProfile.id == int(payload["sub"]))
    )
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Öğrenci bulunamadı.")
    return student


async def require_active_subscription(
    parent: ParentUser = Depends(get_current_parent),
    db: AsyncSession = Depends(get_db),
) -> ParentUser:
    result = await db.execute(select(Subscription).where(Subscription.parent_id == parent.id))
    sub = result.scalar_one_or_none()
    if not sub or not sub.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Aktif abonelik bulunamadı. Lütfen abone olun.",
        )
    return parent
