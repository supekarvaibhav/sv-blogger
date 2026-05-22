from datetime import datetime, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.security import (
    create_access_token,
    create_refresh_token,
    get_password_hash,
    verify_password,
)
from app.models.enums import TokenType, UserRole
from app.models.token import VerificationToken
from app.models.user import User
from app.utils.tokens import generate_token, hash_token


def _verification_expiry(hours: int = 24) -> datetime:
    return datetime.utcnow() + timedelta(hours=hours)


async def create_user(session: AsyncSession, name: str, email: str, password: str) -> User:
    user = User(
        name=name,
        email=email.lower(),
        password=get_password_hash(password),
        role=UserRole.user,
        is_active=True,
        is_verified=False,
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


async def authenticate_user(session: AsyncSession, email: str, password: str) -> User | None:
    result = await session.execute(select(User).where(User.email == email.lower()))
    user = result.scalar_one_or_none()
    if not user:
        return None
    if not user.is_active:
        return None
    if not verify_password(password, user.password):
        return None
    return user


def build_tokens(user: User) -> dict[str, str]:
    access = create_access_token(str(user.id), user.role.value)
    refresh = create_refresh_token(str(user.id), user.role.value)
    return {"access_token": access, "refresh_token": refresh, "token_type": "bearer"}


def build_tokens_for_subject(subject: str, role: str) -> dict[str, str]:
    access = create_access_token(subject, role)
    refresh = create_refresh_token(subject, role)
    return {"access_token": access, "refresh_token": refresh, "token_type": "bearer"}


async def create_verification_token(
    session: AsyncSession, user_id: int, token_type: TokenType
) -> tuple[str, VerificationToken]:
    raw, hashed = generate_token()
    token = VerificationToken(
        user_id=user_id,
        token_hash=hashed,
        token_type=token_type,
        expires_at=_verification_expiry(),
        used=False,
    )
    session.add(token)
    await session.commit()
    await session.refresh(token)
    return raw, token


async def verify_token(
    session: AsyncSession, raw_token: str, token_type: TokenType
) -> VerificationToken | None:
    token_hash = hash_token(raw_token)
    result = await session.execute(
        select(VerificationToken).where(
            VerificationToken.token_hash == token_hash,
            VerificationToken.token_type == token_type,
            VerificationToken.used.is_(False),
            VerificationToken.expires_at > datetime.utcnow(),
        )
    )
    return result.scalar_one_or_none()


async def mark_token_used(session: AsyncSession, token: VerificationToken) -> None:
    token.used = True
    session.add(token)
    await session.commit()
