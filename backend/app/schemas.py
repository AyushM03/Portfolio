from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from .models import ReasonEnum


class InquiryCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str = Field(min_length=2, max_length=200)
    email: EmailStr
    linkedin_url: Optional[str] = Field(default=None, alias="linkedinUrl", max_length=500)
    phone: Optional[str] = Field(default=None, max_length=50)
    reason: ReasonEnum
    message: str = Field(min_length=10, max_length=5000)
    # honeypot — real visitors never see or fill this field (see CollabForm.tsx)
    company: Optional[str] = Field(default="", max_length=500)
