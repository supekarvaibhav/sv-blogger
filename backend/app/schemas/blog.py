from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.schemas.common import PaginatedResponse
from app.schemas.user import UserPublic


class BlogBase(BaseModel):
    title: str
    content: str
    category: str
    tags: list[str] | None = None
    image: str | None = None


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: str | None = None
    content: str | None = None
    category: str | None = None
    tags: list[str] | None = None
    image: str | None = None


class BlogOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    content: str
    category: str
    tags: list[str] | None = None
    image: str | None = None
    likes_count: int
    read_time: int
    created_at: datetime
    updated_at: datetime
    author: UserPublic


class BlogList(PaginatedResponse):
    items: list[BlogOut]
