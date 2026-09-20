import html
import logging

import resend

from .config import settings
from .models import Inquiry

logger = logging.getLogger(__name__)
resend.api_key = settings.resend_api_key


def send_inquiry_notification(inquiry: Inquiry) -> None:
    if not settings.resend_api_key:
        logger.warning("RESEND_API_KEY not set — skipping notification email")
        return

    resend.Emails.send(
        {
            "from": settings.notify_email_from,
            "to": [settings.notify_email_to],
            "reply_to": inquiry.email,
            "subject": f"New collab inquiry from {html.escape(inquiry.name)}",
            "html": f"""
                <p><strong>Name:</strong> {html.escape(inquiry.name)}</p>
                <p><strong>Email:</strong> {html.escape(inquiry.email)}</p>
                <p><strong>Reason:</strong> {html.escape(inquiry.reason.value)}</p>
                <p><strong>LinkedIn:</strong> {html.escape(inquiry.linkedin_url or '—')}</p>
                <p><strong>Phone:</strong> {html.escape(inquiry.phone or '—')}</p>
                <p><strong>Message:</strong><br>{html.escape(inquiry.message).replace(chr(10), '<br>')}</p>
            """,
        }
    )
