from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.bookmark import Bookmark


async def toggle_bookmark(session: AsyncSession, user_id: int, blog_id: int) -> bool:
    result = await session.execute(
        select(Bookmark).where(Bookmark.user_id == user_id, Bookmark.blog_id == blog_id)
    )
    bookmark = result.scalar_one_or_none()
    if bookmark:
        await session.delete(bookmark)
        await session.commit()
        return False
    bookmark = Bookmark(user_id=user_id, blog_id=blog_id)
    session.add(bookmark)
    await session.commit()
    return True


async def list_bookmarks(session: AsyncSession, user_id: int) -> list[Bookmark]:
    result = await session.execute(select(Bookmark).where(Bookmark.user_id == user_id))
    return result.scalars().all()
