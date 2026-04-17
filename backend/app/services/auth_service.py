import random
import string

import jwt
from fastapi import HTTPException, status
from redis.asyncio import Redis
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_refresh_token,
    create_student_session_token,
    decode_token,
    hash_password,
    hash_pin,
    verify_password,
    verify_pin,
)
from app.models.parent_user import ParentUser
from app.models.student_profile import StudentProfile
from app.schemas.auth import ParentRegister
from app.services.sms_service import send_otp_sms

_OTP_KEY = "otp:{phone}"
_OTP_TTL = 600  # 10 dakika
_REFRESH_BLOCKLIST_KEY = "refresh_blocklist:{jti}"
_REFRESH_BLOCKLIST_TTL = settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400


def _generate_otp() -> str:
    return "".join(random.choices(string.digits, k=6))


# ---- Veli Auth ----

async def register_parent(
    db: AsyncSession,
    redis: Redis,
    data: ParentRegister,
) -> tuple[ParentUser, str]:
    """
    Hesap oluşturur (is_active=False), OTP kodu Redis'e kaydeder.
    Döner: (parent, otp_code) — otp_code dev modda loga basılır / frontend'e verilir.
    """
    # E-posta kontrolü
    existing = await db.execute(select(ParentUser).where(ParentUser.email == data.email))
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu e-posta adresi zaten kullanılıyor.",
        )

    # Telefon kontrolü
    phone_existing = await db.execute(
        select(ParentUser).where(ParentUser.phone_number == data.phone_number)
    )
    if phone_existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bu telefon numarası zaten kayıtlı.",
        )

    parent = ParentUser(
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        phone_number=data.phone_number,
        phone_verified=False,
        is_active=False,  # OTP doğrulanana kadar aktif değil
        password_hash=hash_password(data.password),
        kvkk_accepted=data.kvkk_accepted,
    )
    db.add(parent)
    await db.flush()

    # OTP oluştur ve Redis'e kaydet
    otp_code = _generate_otp()
    otp_key = _OTP_KEY.format(phone=data.phone_number)
    await redis.setex(otp_key, _OTP_TTL, otp_code)

    await send_otp_sms(data.phone_number, otp_code)

    return parent, otp_code


async def verify_phone_otp(
    db: AsyncSession,
    redis: Redis,
    phone_number: str,
    code: str,
) -> tuple[ParentUser, str, str]:
    """OTP doğrular, hesabı aktif eder, token döner."""
    otp_key = _OTP_KEY.format(phone=phone_number)
    stored = await redis.get(otp_key)

    if not stored:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Doğrulama kodu süresi dolmuş. Lütfen tekrar kayıt olun.",
        )

    stored_code = stored.decode() if isinstance(stored, bytes) else stored
    if stored_code != code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Doğrulama kodu hatalı.",
        )

    # Kullanıcıyı bul ve aktif et
    result = await db.execute(
        select(ParentUser).where(ParentUser.phone_number == phone_number)
    )
    parent = result.scalar_one_or_none()
    if not parent:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Kullanıcı bulunamadı.",
        )

    parent.is_active = True
    parent.phone_verified = True
    await redis.delete(otp_key)
    await db.flush()

    access_token = create_access_token({"sub": str(parent.id), "role": "parent"})
    refresh_token = create_refresh_token({"sub": str(parent.id), "role": "parent"})
    return parent, access_token, refresh_token


async def login_parent(
    db: AsyncSession, email: str, password: str
) -> tuple[ParentUser, str, str]:
    result = await db.execute(select(ParentUser).where(ParentUser.email == email))
    parent = result.scalar_one_or_none()

    if not parent or not verify_password(password, parent.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-posta veya şifre hatalı.",
        )
    # Telefon doğrulaması zorunlu (eski hesaplar için phone_number NULL ise muaf)
    if not parent.is_active:
        if parent.phone_number and not parent.phone_verified:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Telefon numaranızı doğrulamanız gerekiyor.",
            )
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Hesabınız devre dışı bırakılmış.",
        )

    access_token = create_access_token({"sub": str(parent.id), "role": "parent"})
    refresh_token = create_refresh_token({"sub": str(parent.id), "role": "parent"})
    return parent, access_token, refresh_token


async def logout_parent(redis: Redis, refresh_token: str) -> None:
    """Refresh token'ı Redis blocklist'e ekler — süresi dolana kadar geçersiz."""
    try:
        payload = decode_token(refresh_token)
    except jwt.InvalidTokenError:
        return  # Zaten geçersiz, sessizce geç

    # jti yoksa token hash'ini kullan
    jti = payload.get("jti") or refresh_token[-32:]
    key = _REFRESH_BLOCKLIST_KEY.format(jti=jti)
    await redis.setex(key, _REFRESH_BLOCKLIST_TTL, "1")


async def refresh_parent_tokens(
    db: AsyncSession, refresh_token: str, redis: Redis | None = None
) -> tuple[ParentUser, str, str]:
    try:
        payload = decode_token(refresh_token)
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token süresi dolmuş.",
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Geçersiz refresh token.",
        )

    if payload.get("type") != "refresh" or payload.get("role") != "parent":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Geçersiz token.",
        )

    # Blocklist kontrolü
    if redis is not None:
        jti = payload.get("jti") or refresh_token[-32:]
        if await redis.exists(_REFRESH_BLOCKLIST_KEY.format(jti=jti)):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token geçersiz kılınmış. Lütfen tekrar giriş yapın.",
            )

    result = await db.execute(select(ParentUser).where(ParentUser.id == int(payload["sub"])))
    parent = result.scalar_one_or_none()
    if not parent or not parent.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Kullanıcı bulunamadı.",
        )

    access_token = create_access_token({"sub": str(parent.id), "role": "parent"})
    new_refresh = create_refresh_token({"sub": str(parent.id), "role": "parent"})
    return parent, access_token, new_refresh


# ---- Öğrenci PIN Auth ----

_PIN_KEY = "pin_attempts:{student_id}"
_PIN_LOCK_KEY = "pin_lock:{student_id}"


async def login_student_pin(
    db: AsyncSession,
    redis: Redis,
    student_id: int,
    pin: str,
    parent_id: int,
) -> tuple[StudentProfile, str]:
    """
    Öğrencinin PIN'ini doğrular. Brute-force koruması için Redis kullanır.
    parent_id: sadece kendi öğrencisi olduğundan emin olmak için.
    """
    # Kilit kontrolü
    lock_key = _PIN_LOCK_KEY.format(student_id=student_id)
    if await redis.exists(lock_key):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Çok fazla hatalı giriş. {settings.PIN_LOCKOUT_MINUTES} dakika sonra tekrar deneyin.",
        )

    result = await db.execute(
        select(StudentProfile).where(
            StudentProfile.id == student_id,
            StudentProfile.parent_id == parent_id,
        )
    )
    student = result.scalar_one_or_none()
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Öğrenci profili bulunamadı.",
        )

    if not verify_pin(pin, student.pin_hash):
        attempt_key = _PIN_KEY.format(student_id=student_id)
        attempts = await redis.incr(attempt_key)
        await redis.expire(attempt_key, settings.PIN_LOCKOUT_MINUTES * 60)

        remaining = settings.PIN_MAX_ATTEMPTS - int(attempts)
        if remaining <= 0:
            await redis.setex(lock_key, settings.PIN_LOCKOUT_MINUTES * 60, "1")
            await redis.delete(attempt_key)
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail=f"Çok fazla hatalı giriş. {settings.PIN_LOCKOUT_MINUTES} dakika sonra tekrar deneyin.",
            )

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Hatalı PIN. {remaining} deneme hakkınız kaldı.",
        )

    # Başarılı — sayacı sıfırla
    await redis.delete(_PIN_KEY.format(student_id=student_id))

    token = create_student_session_token(student.id)
    return student, token
