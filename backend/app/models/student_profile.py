from datetime import UTC, datetime

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    parent_id: Mapped[int] = mapped_column(Integer, ForeignKey("parent_users.id"), nullable=False)
    first_name: Mapped[str] = mapped_column(String(100), nullable=False)
    last_name: Mapped[str] = mapped_column(String(100), nullable=False)
    avatar: Mapped[str] = mapped_column(String(100), nullable=False, default="avatar_1")
    pin_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    class_level: Mapped[int] = mapped_column(Integer, nullable=False)  # 1-6 (sınıf)
    daily_limit_minutes: Mapped[int] = mapped_column(Integer, nullable=False, default=60)
    screen_time_enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(UTC)
    )

    # Relationships
    parent: Mapped["ParentUser"] = relationship(  # noqa: F821
        "ParentUser", back_populates="student_profiles"
    )
    game_sessions: Mapped[list["GameSession"]] = relationship(  # noqa: F821
        "GameSession", back_populates="student", cascade="all, delete-orphan"
    )
