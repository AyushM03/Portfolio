import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import DateTime, Enum as SAEnum, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class ReasonEnum(str, enum.Enum):
    collaboration = "collaboration"
    recruiting = "recruiting"
    other = "other"


class StatusEnum(str, enum.Enum):
    new = "new"
    contacted = "contacted"
    archived = "archived"


class Inquiry(Base):
    __tablename__ = "inquiries"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(320), nullable=False)
    linkedin_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    reason: Mapped[ReasonEnum] = mapped_column(SAEnum(ReasonEnum, name="inquiry_reason"), nullable=False)
    message: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[StatusEnum] = mapped_column(
        SAEnum(StatusEnum, name="inquiry_status"), nullable=False, default=StatusEnum.new
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
