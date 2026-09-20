"""create inquiries table

Revision ID: 0001
Revises:
Create Date: 2026-09-20

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    reason_enum = postgresql.ENUM("collaboration", "recruiting", "other", name="inquiry_reason")
    status_enum = postgresql.ENUM("new", "contacted", "archived", name="inquiry_status")
    reason_enum.create(op.get_bind(), checkfirst=True)
    status_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "inquiries",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("email", sa.String(320), nullable=False),
        sa.Column("linkedin_url", sa.String(500), nullable=True),
        sa.Column("phone", sa.String(50), nullable=True),
        sa.Column(
            "reason",
            postgresql.ENUM("collaboration", "recruiting", "other", name="inquiry_reason", create_type=False),
            nullable=False,
        ),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column(
            "status",
            postgresql.ENUM("new", "contacted", "archived", name="inquiry_status", create_type=False),
            nullable=False,
            server_default="new",
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
    )


def downgrade() -> None:
    op.drop_table("inquiries")
    postgresql.ENUM(name="inquiry_reason").drop(op.get_bind(), checkfirst=True)
    postgresql.ENUM(name="inquiry_status").drop(op.get_bind(), checkfirst=True)
