from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.services import like_service

router = APIRouter(prefix="/likes", tags=["likes"])


@router.post("")
async def toggle_like(
    blog_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    liked = await like_service.toggle_like(session, current_user.id, blog_id)
    if liked is None:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"liked": liked}
