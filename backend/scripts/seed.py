import asyncio
from datetime import datetime

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core.config import get_settings
from app.core.security import get_password_hash
from app.models.blog import Blog
from app.models.enums import UserRole
from app.models.user import User


async def seed():
    settings = get_settings()
    engine = create_async_engine(settings.database_url, pool_pre_ping=True)
    session_maker = async_sessionmaker(engine, expire_on_commit=False)

    async with session_maker() as session:
        admin = User(
            name="Admin",
            email="admin@svblogger.dev",
            password=get_password_hash("Admin123!"),
            role=UserRole.admin,
            is_active=True,
            is_verified=True,
            created_at=datetime.utcnow(),
        )
        session.add(admin)
        await session.flush()

        blog = Blog(
            title="Welcome to SV Blogger",
            slug="welcome-to-sv-blogger",
            content="SV Blogger is live. Start writing your first post.",
            category="General",
            tags=["welcome", "platform"],
            author_id=admin.id,
            likes_count=0,
            read_time=1,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow(),
        )
        session.add(blog)
        await session.commit()

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed())
