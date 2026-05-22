import json
from functools import lru_cache
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_ignore_empty=True,
        case_sensitive=False,
    )

    api_v1_prefix: str = "/api"
    project_name: str = Field("SV Blogger", alias="PROJECT_NAME")
    environment: str = Field("development", alias="ENVIRONMENT")
    database_url: str = Field(..., alias="DATABASE_URL")
    secret_key: str = Field(..., alias="SECRET_KEY")
    access_token_expire_minutes: int = Field(30, alias="ACCESS_TOKEN_EXPIRE_MINUTES")
    refresh_token_expire_days: int = Field(7, alias="REFRESH_TOKEN_EXPIRE_DAYS")
    allowed_origins: str = Field("http://localhost:3000", alias="ALLOWED_ORIGINS")
    upload_dir: str = Field("uploads", alias="UPLOAD_DIR")
    rate_limit_per_minute: str = Field("60/minute", alias="RATE_LIMIT_PER_MINUTE")

    @field_validator("allowed_origins", mode="before")
    @classmethod
    def normalize_origins(cls, value):
        if isinstance(value, list):
            return ",".join(value)
        return value

    @property
    def allowed_origins_list(self) -> list[str]:
        raw = self.allowed_origins.strip()
        if raw.startswith("["):
            try:
                parsed = json.loads(raw)
                if isinstance(parsed, list):
                    return [str(item).strip() for item in parsed if str(item).strip()]
            except json.JSONDecodeError:
                pass
        return [item.strip() for item in raw.split(",") if item.strip()]

    @property
    def database_url_async(self) -> str:
        url = self.database_url.strip()
        if url.startswith("postgresql+asyncpg://"):
            return url
        if url.startswith("postgresql://"):
            return url.replace("postgresql://", "postgresql+asyncpg://", 1)
        if url.startswith("postgres://"):
            return url.replace("postgres://", "postgresql+asyncpg://", 1)
        return url


@lru_cache
def get_settings() -> Settings:
    return Settings()
