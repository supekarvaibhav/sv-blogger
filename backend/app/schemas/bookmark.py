from datetime import datetime

from pydantic import BaseModel, ConfigDict


class BookmarkOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    blog_id: int
    created_at: datetime
