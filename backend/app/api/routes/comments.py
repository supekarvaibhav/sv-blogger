from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.enums import UserRole
from app.models.user import User
from app.schemas.comment import CommentCreate, CommentOut
from app.services import comment_service

router = APIRouter(prefix="/comments", tags=["comments"])


@router.post("", response_model=CommentOut, status_code=status.HTTP_201_CREATED)
async def create_comment(
    data: CommentCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    comment = await comment_service.create_comment(
        session, current_user.id, data.model_dump()
    )
    return comment


@router.get("/{blog_id}", response_model=list[CommentOut])
async def list_comments(blog_id: int, session: AsyncSession = Depends(get_db)):
    return await comment_service.list_comments(session, blog_id)


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_comment(
    comment_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    comment = await comment_service.get_comment(session, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not allowed")
    await comment_service.delete_comment(session, comment)
