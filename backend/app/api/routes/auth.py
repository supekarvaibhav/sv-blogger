from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_current_user
from app.core.config import get_settings
from app.core.database import get_db
from app.core.security import decode_token, get_password_hash
from app.models.enums import TokenType
from app.models.user import User
from app.schemas.auth import (
    ForgotPasswordRequest,
    RefreshTokenRequest,
    ResetPasswordRequest,
    TokenPair,
    VerifyTokenRequest,
)
from app.schemas.user import UserCreate, UserLogin, UserOut
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()


@router.post("/register", response_model=TokenPair)
async def register(
    data: UserCreate, session: AsyncSession = Depends(get_db)
):
    existing = await session.execute(select(User).where(User.email == data.email.lower()))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    user = await auth_service.create_user(session, data.name, data.email, data.password)
    raw_token, _ = await auth_service.create_verification_token(
        session, user.id, TokenType.verify_email
    )
    tokens = auth_service.build_tokens(user)
    if settings.environment != "production":
        tokens["verification_token"] = raw_token
    return TokenPair(**tokens)


@router.post("/login", response_model=TokenPair)
async def login(
    data: UserLogin, session: AsyncSession = Depends(get_db)
):
    user = await auth_service.authenticate_user(session, data.email, data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    if not user.is_verified:
        raise HTTPException(status_code=403, detail="Email not verified")
    tokens = auth_service.build_tokens(user)
    return TokenPair(**tokens)


@router.post("/refresh", response_model=TokenPair)
async def refresh_token(data: RefreshTokenRequest):
    try:
        payload = decode_token(data.refresh_token)
        if payload.get("type") != "refresh":
            raise ValueError("Invalid token type")
        subject = payload.get("sub")
        role = payload.get("role")
        if not subject or not role:
            raise ValueError("Invalid token payload")
        subject = str(subject)
        role = str(role)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid refresh token") from None
    tokens = auth_service.build_tokens_for_subject(subject, role)
    return TokenPair(**tokens)


@router.get("/me", response_model=UserOut)
async def me(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/verify-email")
async def verify_email(
    data: VerifyTokenRequest, session: AsyncSession = Depends(get_db)
):
    token = await auth_service.verify_token(
        session, data.token, TokenType.verify_email
    )
    if not token:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    user = await session.get(User, token.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_verified = True
    await auth_service.mark_token_used(session, token)
    session.add(user)
    await session.commit()
    return {"message": "Email verified"}


@router.post("/forgot-password")
async def forgot_password(
    data: ForgotPasswordRequest, session: AsyncSession = Depends(get_db)
):
    result = await session.execute(select(User).where(User.email == data.email.lower()))
    user = result.scalar_one_or_none()
    if not user:
        return {"message": "If the account exists, a reset link was sent."}
    raw_token, _ = await auth_service.create_verification_token(
        session, user.id, TokenType.reset_password
    )
    response = {"message": "Reset token generated"}
    if settings.environment != "production":
        response["reset_token"] = raw_token
    return response


@router.post("/reset-password")
async def reset_password(
    data: ResetPasswordRequest, session: AsyncSession = Depends(get_db)
):
    token = await auth_service.verify_token(
        session, data.token, TokenType.reset_password
    )
    if not token:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
    user = await session.get(User, token.user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.password = get_password_hash(data.new_password)
    await auth_service.mark_token_used(session, token)
    session.add(user)
    await session.commit()
    return {"message": "Password updated"}
