from pydantic import BaseModel, Field

ALLOWED_AVATARS = [f"avatar_{i}" for i in range(1, 13)]  # avatar_1 … avatar_12


class StudentCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    avatar: str = Field(default="avatar_1")
    pin: str = Field(min_length=4, max_length=6, pattern=r"^\d+$")
    class_level: int = Field(ge=1, le=6)

    def model_post_init(self, __context: object) -> None:
        if self.avatar not in ALLOWED_AVATARS:
            raise ValueError(f"Geçersiz avatar. İzin verilenler: {', '.join(ALLOWED_AVATARS)}")


class StudentUpdate(BaseModel):
    first_name: str | None = Field(default=None, min_length=1, max_length=100)
    last_name: str | None = Field(default=None, min_length=1, max_length=100)
    avatar: str | None = None
    pin: str | None = Field(default=None, min_length=4, max_length=6, pattern=r"^\d+$")
    class_level: int | None = Field(default=None, ge=1, le=6)
