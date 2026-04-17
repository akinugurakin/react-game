"""add leaderboard_entries table

Revision ID: 004
Revises: 003
Create Date: 2026-04-17

"""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "004"
down_revision: str | None = "003"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "leaderboard_entries",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("student_id", sa.Integer(), nullable=False),
        sa.Column("game_id", sa.String(100), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("rank", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("period", sa.String(10), nullable=False),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.text("now()"),
        ),
        sa.ForeignKeyConstraint(["student_id"], ["student_profiles.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_leaderboard_entries_id", "leaderboard_entries", ["id"])
    op.create_index("ix_leaderboard_entries_student_id", "leaderboard_entries", ["student_id"])
    op.create_index("ix_leaderboard_entries_game_id", "leaderboard_entries", ["game_id"])
    op.create_index(
        "ix_leaderboard_period_game",
        "leaderboard_entries",
        ["period", "game_id", "score"],
    )


def downgrade() -> None:
    op.drop_table("leaderboard_entries")
