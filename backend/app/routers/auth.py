from fastapi import APIRouter, Depends
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_db
from app.core.deps import get_current_parent, get_redis
from app.models.parent_user import ParentUser
from app.schemas.auth import (
    MessageResponse,
    OTPSentResponse,
    ParentLogin,
    ParentRegister,
    ParentResponse,
    StudentPinLogin,
    StudentResponse,
    StudentTokenResponse,
    TokenRefresh,
    TokenResponse,
    VerifyPhoneOTP,
)
from app.services.auth_service import (
    login_parent,
    login_student_pin,
    refresh_parent_tokens,
    register_parent,
    verify_phone_otp,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=OTPSentResponse, status_code=201)
async def register(
    data: ParentRegister,
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
) -> OTPSentResponse:
    """Hesap oluşturur ve telefona OTP gönderir. Hesap, OTP doğrulanana kadar aktif olmaz."""
    parent, otp_code = await register_parent(db, redis, data)
    return OTPSentResponse(
        message="Doğrulama kodu telefonunuza gönderildi.",
        phone_number=data.phone_number,
        # Dev modda kodu döndür — production'da bu alan kaldırılmalı
        dev_code=otp_code if settings.DEBUG else None,
    )


@router.post("/verify-phone", response_model=TokenResponse)
async def verify_phone(
    data: VerifyPhoneOTP,
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
) -> TokenResponse:
    """OTP kodunu doğrular, hesabı aktif eder ve token döner."""
    parent, access_token, refresh_token = await verify_phone_otp(
        db, redis, data.phone_number, data.code
    )
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        parent=ParentResponse.model_validate(parent),
    )


@router.post("/login", response_model=TokenResponse)
async def login(
    data: ParentLogin, db: AsyncSession = Depends(get_db)
) -> TokenResponse:
    parent, access_token, refresh_token = await login_parent(db, data.email, data.password)
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        parent=ParentResponse.model_validate(parent),
    )


@router.post("/refresh", response_model=TokenResponse)
async def refresh(
    data: TokenRefresh, db: AsyncSession = Depends(get_db)
) -> TokenResponse:
    parent, access_token, refresh_token = await refresh_parent_tokens(db, data.refresh_token)
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        parent=ParentResponse.model_validate(parent),
    )


@router.get("/me", response_model=ParentResponse)
async def get_me(current_parent: ParentUser = Depends(get_current_parent)) -> ParentResponse:
    return ParentResponse.model_validate(current_parent)


@router.post("/student/login", response_model=StudentTokenResponse)
async def student_login(
    data: StudentPinLogin,
    db: AsyncSession = Depends(get_db),
    redis: Redis = Depends(get_redis),
    current_parent: ParentUser = Depends(get_current_parent),
) -> StudentTokenResponse:
    """Veli oturumu açıkken, profil seçim ekranından öğrenci PIN girişi."""
    student, token = await login_student_pin(
        db, redis, data.student_id, data.pin, current_parent.id
    )
    return StudentTokenResponse(
        student_session_token=token,
        student=StudentResponse.model_validate(student),
    )


@router.delete("/logout", response_model=MessageResponse)
async def logout() -> MessageResponse:
    # JWT stateless — client tarafında token silinir.
    return MessageResponse(message="Başarıyla çıkış yapıldı.")
