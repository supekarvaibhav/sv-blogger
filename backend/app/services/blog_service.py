from sqlalchemy import desc, func, select
from sqlalchemy.orm import selectinload
from bleach import clean
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.blog import Blog
from app.utils.reading_time import estimate_read_time
from app.utils.slug import slugify


async def _unique_slug(session: AsyncSession, title: str) -> str:
    base = slugify(title)
    slug = base
    counter = 1
    while True:
        result = await session.execute(select(Blog).where(Blog.slug == slug))
        exists = result.scalar_one_or_none()
        if not exists:
            return slug
        counter += 1
        slug = f"{base}-{counter}"


async def create_blog(session: AsyncSession, author_id: int, data: dict) -> Blog:
    slug = await _unique_slug(session, data["title"])
    sanitized = clean(data["content"], tags=[], attributes={}, strip=True)
    blog = Blog(
        title=data["title"],
        content=sanitized,
        category=data["category"],
        tags=data.get("tags"),
        image=data.get("image"),
        author_id=author_id,
        slug=slug,
        read_time=estimate_read_time(sanitized),
    )
    session.add(blog)
    await session.commit()
    result = await session.execute(
        select(Blog).options(selectinload(Blog.author)).where(Blog.id == blog.id)
    )
    return result.scalar_one()


async def list_blogs(
    session: AsyncSession,
    page: int,
    limit: int,
    q: str | None,
    category: str | None,
    tags: list[str] | None,
    sort: str | None,
) -> tuple[list[Blog], int]:
    query = select(Blog).options(selectinload(Blog.author))
    if q:
        query = query.where(Blog.title.ilike(f"%{q}%"))
    if category:
        query = query.where(Blog.category == category)
    if tags:
        query = query.where(Blog.tags.overlap(tags))

    count_query = select(func.count()).select_from(query.subquery())
    total = (await session.execute(count_query)).scalar_one()

    if sort == "trending":
        query = query.order_by(desc(Blog.likes_count))
    else:
        query = query.order_by(desc(Blog.created_at))

    query = query.offset((page - 1) * limit).limit(limit)
    result = await session.execute(query)
    items = result.scalars().all()
    return items, total


async def get_blog(session: AsyncSession, blog_id: int) -> Blog | None:
    result = await session.execute(
        select(Blog).options(selectinload(Blog.author)).where(Blog.id == blog_id)
    )
    return result.scalar_one_or_none()


async def update_blog(session: AsyncSession, blog: Blog, data: dict) -> Blog:
    for key, value in data.items():
        if value is not None:
            if key == "content":
                setattr(blog, key, clean(value, tags=[], attributes={}, strip=True))
            else:
                setattr(blog, key, value)
    if data.get("title"):
        blog.slug = await _unique_slug(session, blog.title)
    if data.get("content"):
        blog.read_time = estimate_read_time(blog.content)
    session.add(blog)
    await session.commit()
    await session.refresh(blog)
    return blog


async def delete_blog(session: AsyncSession, blog: Blog) -> None:
    await session.delete(blog)
    await session.commit()
