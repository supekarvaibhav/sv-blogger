from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.notification import Notification


async def create_notification(session: AsyncSession, data: dict) -> Notification:
    notification = Notification(
        user_id=data["user_id"],
        title=data["title"],
        message=data["message"],
    )
    session.add(notification)
    await session.commit()
    await session.refresh(notification)
    return notification


async def list_notifications(session: AsyncSession, user_id: int) -> list[Notification]:
    result = await session.execute(
        select(Notification).where(Notification.user_id == user_id)
    )
    return result.scalars().all()


async def mark_read(session: AsyncSession, notification: Notification) -> Notification:
    notification.is_read = True
    session.add(notification)
    await session.commit()
    await session.refresh(notification)
    return notification


async def get_notification(session: AsyncSession, notification_id: int) -> Notification | None:
    result = await session.execute(
        select(Notification).where(Notification.id == notification_id)
    )
    return result.scalar_one_or_none()
