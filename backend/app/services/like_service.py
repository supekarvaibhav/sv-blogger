from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.blog import Blog
from app.models.like import Like


async def toggle_like(session: AsyncSession, user_id: int, blog_id: int) -> bool | None:
    result = await session.execute(
        select(Like).where(Like.user_id == user_id, Like.blog_id == blog_id)
    )
    like = result.scalar_one_or_none()
    blog = await session.get(Blog, blog_id)
    if not blog:
        return None
    if like:
        await session.delete(like)
        blog.likes_count = max(0, blog.likes_count - 1)
        session.add(blog)
        await session.commit()
        return False
    like = Like(user_id=user_id, blog_id=blog_id)
    session.add(like)
    blog.likes_count = blog.likes_count + 1
    session.add(blog)
    await session.commit()
    return True
