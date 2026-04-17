"""add phone verification to parent_users

Revision ID: 002
Revises: 001
Create Date: 2026-04-14
"""

from alembic import op
import sqlalchemy as sa

revision = "002"
down_revision = "001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "parent_users",
        sa.Column("phone_number", sa.String(20), nullable=True),
    )
    op.add_column(
        "parent_users",
        sa.Column("phone_verified", sa.Boolean(), nullable=False, server_default="false"),
    )
    # Mevcut kullanıcılar (phone_number NULL) aktif kalır
    op.execute(
        "UPDATE parent_users SET is_active = true WHERE phone_number IS NULL"
    )


def downgrade() -> None:
    op.drop_column("parent_users", "phone_verified")
    op.drop_column("parent_users", "phone_number")
