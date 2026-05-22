from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.follow import Follow
from app.models.user import User


async def get_user(session: AsyncSession, user_id: int) -> User | None:
    result = await session.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def update_user(session: AsyncSession, user: User, data: dict) -> User:
    for key, value in data.items():
        if value is not None:
            setattr(user, key, value)
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


async def toggle_follow(
    session: AsyncSession, follower_id: int, following_id: int
) -> bool:
    if follower_id == following_id:
        return False
    result = await session.execute(
        select(Follow).where(
            Follow.follower_id == follower_id, Follow.following_id == following_id
        )
    )
    follow = result.scalar_one_or_none()
    if follow:
        await session.delete(follow)
        await session.commit()
        return False
    follow = Follow(follower_id=follower_id, following_id=following_id)
    session.add(follow)
    await session.commit()
    return True
