import logging

from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address
from sqlalchemy.orm import Session

from .config import settings
from .database import get_db
from .models import Inquiry
from .notifications import send_inquiry_notification
from .schemas import InquiryCreate

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def client_ip(request: Request) -> str:
    # Render/Railway/most PaaS terminate TLS in front of the app and forward
    # the real client IP via this header — trust it over the socket peer
    # address (which would otherwise always be the proxy).
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return get_remote_address(request)


limiter = Limiter(key_func=client_ip)

app = FastAPI(title="Portfolio Collab API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/inquiries", status_code=201)
@limiter.limit(settings.rate_limit)
def create_inquiry(request: Request, payload: InquiryCreate, db: Session = Depends(get_db)):
    if payload.company:
        # Honeypot tripped — pretend success so the bot doesn't learn to
        # avoid this tell, but do not write anything or send a notification.
        return {"status": "ok"}

    inquiry = Inquiry(
        name=payload.name,
        email=payload.email,
        linkedin_url=payload.linkedin_url or None,
        phone=payload.phone or None,
        reason=payload.reason,
        message=payload.message,
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)

    try:
        send_inquiry_notification(inquiry)
    except Exception:
        # The inquiry is already saved — a notification-delivery failure
        # (bad API key, Resend outage) must not surface as a submit error.
        logger.exception("Notification failed for inquiry %s", inquiry.id)

    return {"status": "ok"}
