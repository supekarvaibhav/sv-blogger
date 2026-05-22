from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import require_admin
from app.core.database import get_db
from app.models.blog import Blog
from app.models.comment import Comment
from app.models.enums import ReportStatus
from app.models.user import User
from app.schemas.report import ReportOut
from app.schemas.user import UserOut
from app.services import report_service

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/users", response_model=list[UserOut])
async def list_users(
    session: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    result = await session.execute(select(User))
    return result.scalars().all()


@router.patch("/users/{user_id}/status")
async def update_user_status(
    user_id: int,
    is_active: bool,
    session: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    user = await session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_active = is_active
    session.add(user)
    await session.commit()
    return {"updated": True}


@router.delete("/blogs/{blog_id}")
async def delete_blog(
    blog_id: int,
    session: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    blog = await session.get(Blog, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    await session.delete(blog)
    await session.commit()
    return {"deleted": True}


@router.delete("/comments/{comment_id}")
async def delete_comment(
    comment_id: int,
    session: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    comment = await session.get(Comment, comment_id)
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    await session.delete(comment)
    await session.commit()
    return {"deleted": True}


@router.get("/reports", response_model=list[ReportOut])
async def list_reports(
    session: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    return await report_service.list_reports(session)


@router.patch("/reports/{report_id}/resolve")
async def resolve_report(
    report_id: int,
    session: AsyncSession = Depends(get_db),
    admin: User = Depends(require_admin),
):
    report = await report_service.get_report(session, report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    await report_service.update_report(session, report, ReportStatus.resolved)
    return {"resolved": True}
