from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.services import bookmark_service

router = APIRouter(prefix="/bookmarks", tags=["bookmarks"])


@router.post("")
async def toggle_bookmark(
    blog_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    added = await bookmark_service.toggle_bookmark(session, current_user.id, blog_id)
    return {"bookmarked": added}


@router.get("")
async def list_bookmarks(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    items = await bookmark_service.list_bookmarks(session, current_user.id)
    return items
