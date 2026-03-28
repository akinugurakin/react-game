from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


# --- Request Schemas ---

class UserRegister(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3, max_length=50)
    password: str = Field(min_length=6, max_length=128)
    age: int = Field(ge=4, le=100)
    parent_email: EmailStr | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class TokenRefresh(BaseModel):
    refresh_token: str


# --- Response Schemas ---

class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    age: int
    avatar_url: str | None
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


class MessageResponse(BaseModel):
    message: str
