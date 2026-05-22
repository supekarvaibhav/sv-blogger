from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.enums import UserRole
from app.models.user import User
from app.schemas.blog import BlogCreate, BlogList, BlogOut, BlogUpdate
from app.services import blog_service

router = APIRouter(prefix="/blogs", tags=["blogs"])


@router.get("", response_model=BlogList)
async def list_blogs(
    page: int = 1,
    limit: int = 10,
    q: str | None = None,
    category: str | None = None,
    tags: list[str] | None = Query(default=None),
    sort: str | None = None,
    session: AsyncSession = Depends(get_db),
):
    items, total = await blog_service.list_blogs(
        session, page, limit, q, category, tags, sort
    )
    return BlogList(items=items, total=total, page=page, limit=limit)


@router.get("/{blog_id}", response_model=BlogOut)
async def get_blog(blog_id: int, session: AsyncSession = Depends(get_db)):
    blog = await blog_service.get_blog(session, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.post("", response_model=BlogOut, status_code=status.HTTP_201_CREATED)
async def create_blog(
    data: BlogCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    blog = await blog_service.create_blog(session, current_user.id, data.model_dump())
    return blog


@router.put("/{blog_id}", response_model=BlogOut)
async def update_blog(
    blog_id: int,
    data: BlogUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    blog = await blog_service.get_blog(session, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    if blog.author_id != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not allowed")
    blog = await blog_service.update_blog(session, blog, data.model_dump(exclude_none=True))
    return blog


@router.delete("/{blog_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(
    blog_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_db),
):
    blog = await blog_service.get_blog(session, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    if blog.author_id != current_user.id and current_user.role != UserRole.admin:
        raise HTTPException(status_code=403, detail="Not allowed")
    await blog_service.delete_blog(session, blog)
