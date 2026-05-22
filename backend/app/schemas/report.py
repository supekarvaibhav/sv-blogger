from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.enums import ReportStatus
from app.schemas.user import UserPublic


class ReportCreate(BaseModel):
    blog_id: int
    reason: str


class ReportOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    blog_id: int
    reason: str
    status: ReportStatus
    created_at: datetime
    reporter: UserPublic
