"""initial schema

Revision ID: 001
Revises:
Create Date: 2026-04-14

"""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "001"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # --- parent_users ---
    op.create_table(
        "parent_users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("first_name", sa.String(100), nullable=False),
        sa.Column("last_name", sa.String(100), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column("kvkk_accepted", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_parent_users_id", "parent_users", ["id"])
    op.create_index("ix_parent_users_email", "parent_users", ["email"], unique=True)

    # --- student_profiles ---
    op.create_table(
        "student_profiles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("parent_id", sa.Integer(), nullable=False),
        sa.Column("first_name", sa.String(100), nullable=False),
        sa.Column("last_name", sa.String(100), nullable=False),
        sa.Column("avatar", sa.String(100), nullable=False, server_default="avatar_1"),
        sa.Column("pin_hash", sa.String(255), nullable=False),
        sa.Column("class_level", sa.Integer(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.ForeignKeyConstraint(["parent_id"], ["parent_users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_student_profiles_id", "student_profiles", ["id"])

    # --- enum types (raw SQL to avoid duplicate-create issues) ---
    op.execute("CREATE TYPE plantype AS ENUM ('monthly', 'yearly')")
    op.execute("CREATE TYPE subscriptionstatus AS ENUM ('trial', 'active', 'cancelled', 'past_due', 'expired')")
    op.execute("CREATE TYPE platform AS ENUM ('web', 'tablet', 'board')")

    # --- subscriptions ---
    op.create_table(
        "subscriptions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("parent_id", sa.Integer(), nullable=False),
        sa.Column("stripe_customer_id", sa.String(255), nullable=True),
        sa.Column("stripe_subscription_id", sa.String(255), nullable=True),
        sa.Column("plan_type", postgresql.ENUM(name="plantype", create_type=False), nullable=False),
        sa.Column(
            "status",
            postgresql.ENUM(name="subscriptionstatus", create_type=False),
            nullable=False,
            server_default="trial",
        ),
        sa.Column("trial_start", sa.DateTime(timezone=True), nullable=True),
        sa.Column("trial_end", sa.DateTime(timezone=True), nullable=True),
        sa.Column("current_period_end", sa.DateTime(timezone=True), nullable=True),
        sa.Column("auto_renew", sa.Boolean(), nullable=False, server_default="true"),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.ForeignKeyConstraint(["parent_id"], ["parent_users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("parent_id"),
        sa.UniqueConstraint("stripe_customer_id"),
    )
    op.create_index("ix_subscriptions_id", "subscriptions", ["id"])

    # --- game_sessions ---
    op.create_table(
        "game_sessions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("game_id", sa.String(100), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("correct_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("wrong_count", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("duration_seconds", sa.Integer(), nullable=False, server_default="0"),
        sa.Column(
            "platform",
            postgresql.ENUM(name="platform", create_type=False),
            nullable=False,
            server_default="web",
        ),
        sa.Column(
            "completed_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.ForeignKeyConstraint(["student_id"], ["student_profiles.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_game_sessions_id", "game_sessions", ["id"])
    op.create_index("ix_game_sessions_student_game", "game_sessions", ["student_id", "game_id"])


def downgrade() -> None:
    op.drop_table("game_sessions")
    op.drop_table("subscriptions")
    op.drop_table("student_profiles")
    op.drop_table("parent_users")

    op.execute("DROP TYPE IF EXISTS platform")
    op.execute("DROP TYPE IF EXISTS subscriptionstatus")
    op.execute("DROP TYPE IF EXISTS plantype")
