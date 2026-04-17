"""add screen time to student profiles

Revision ID: 003
Revises: 002
Create Date: 2026-04-15

"""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "003"
down_revision: str | None = "002"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "student_profiles",
        sa.Column("daily_limit_minutes", sa.Integer(), nullable=False, server_default="60"),
    )
    op.add_column(
        "student_profiles",
        sa.Column("screen_time_enabled", sa.Boolean(), nullable=False, server_default="true"),
    )


def downgrade() -> None:
    op.drop_column("student_profiles", "screen_time_enabled")
    op.drop_column("student_profiles", "daily_limit_minutes")
