from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


# ---- Veli (Parent) Auth ----

class ParentRegister(BaseModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    phone_number: str = Field(min_length=10, max_length=20)
    password: str = Field(min_length=8, max_length=128)
    kvkk_accepted: bool

    def model_post_init(self, __context: object) -> None:
        if not self.kvkk_accepted:
            raise ValueError("KVKK onayı zorunludur.")


class VerifyPhoneOTP(BaseModel):
    phone_number: str
    code: str = Field(min_length=6, max_length=6)


class ParentLogin(BaseModel):
    email: EmailStr
    password: str


class TokenRefresh(BaseModel):
    refresh_token: str


# ---- Öğrenci PIN Auth ----

class StudentPinLogin(BaseModel):
    student_id: int
    pin: str = Field(min_length=4, max_length=6)


# ---- Responses ----

class ParentResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone_number: str | None
    phone_verified: bool
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class OTPSentResponse(BaseModel):
    message: str
    phone_number: str
    # Dev modda kodu döndür (production'da kaldırılacak)
    dev_code: str | None = None


class StudentResponse(BaseModel):
    id: int
    parent_id: int
    first_name: str
    last_name: str
    avatar: str
    class_level: int
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    parent: ParentResponse


class StudentTokenResponse(BaseModel):
    student_session_token: str
    token_type: str = "bearer"
    student: StudentResponse


class MessageResponse(BaseModel):
    message: str
