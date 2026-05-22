from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user, require_admin
from app.core.database import get_db
from app.models.user import User
from app.schemas.notification import NotificationCreate, NotificationOut
from app.services import notification_service

router = APIRouter(prefix="/notifications", tags=["notifications"])


@router.get("", response_model=list[NotificationOut])
async def list_notifications(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    return await notification_service.list_notifications(session, current_user.id)


@router.post("", response_model=NotificationOut)
async def create_notification(
    data: NotificationCreate,
    admin: User = Depends(require_admin),
    session: AsyncSession = Depends(get_db),
):
    return await notification_service.create_notification(session, data.model_dump())


@router.patch("/{notification_id}/read", response_model=NotificationOut)
async def mark_notification_read(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    notification = await notification_service.get_notification(session, notification_id)
    if not notification or notification.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Notification not found")
    return await notification_service.mark_read(session, notification)
