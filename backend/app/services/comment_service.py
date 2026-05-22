from sqlalchemy import select
from sqlalchemy.orm import selectinload
from bleach import clean
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.comment import Comment


async def create_comment(session: AsyncSession, user_id: int, data: dict) -> Comment:
    sanitized = clean(data["comment"], tags=[], attributes={}, strip=True)
    comment = Comment(
        blog_id=data["blog_id"],
        user_id=user_id,
        comment=sanitized,
        rating=data.get("rating"),
    )
    session.add(comment)
    await session.commit()
    result = await session.execute(
        select(Comment).options(selectinload(Comment.user)).where(Comment.id == comment.id)
    )
    return result.scalar_one()


async def list_comments(session: AsyncSession, blog_id: int) -> list[Comment]:
    result = await session.execute(
        select(Comment)
        .options(selectinload(Comment.user))
        .where(Comment.blog_id == blog_id)
    )
    return result.scalars().all()


async def get_comment(session: AsyncSession, comment_id: int) -> Comment | None:
    result = await session.execute(select(Comment).where(Comment.id == comment_id))
    return result.scalar_one_or_none()


async def delete_comment(session: AsyncSession, comment: Comment) -> None:
    await session.delete(comment)
    await session.commit()
