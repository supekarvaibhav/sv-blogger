from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.user import UserPublic


class CommentCreate(BaseModel):
    blog_id: int
    comment: str
    rating: int | None = Field(default=None, ge=1, le=5)


class CommentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    blog_id: int
    user: UserPublic
    comment: str
    rating: int | None = None
    created_at: datetime
