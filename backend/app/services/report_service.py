from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.report import Report


async def create_report(session: AsyncSession, reporter_id: int, data: dict) -> Report:
    report = Report(
        reporter_id=reporter_id,
        blog_id=data["blog_id"],
        reason=data["reason"],
    )
    session.add(report)
    await session.commit()
    result = await session.execute(
        select(Report).options(selectinload(Report.reporter)).where(Report.id == report.id)
    )
    return result.scalar_one()


async def list_reports(session: AsyncSession) -> list[Report]:
    result = await session.execute(select(Report).options(selectinload(Report.reporter)))
    return result.scalars().all()


async def get_report(session: AsyncSession, report_id: int) -> Report | None:
    result = await session.execute(select(Report).where(Report.id == report_id))
    return result.scalar_one_or_none()


async def update_report(session: AsyncSession, report: Report, status) -> Report:
    report.status = status
    session.add(report)
    await session.commit()
    await session.refresh(report)
    return report
