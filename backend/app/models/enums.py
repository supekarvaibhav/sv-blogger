from enum import Enum


class UserRole(str, Enum):
    user = "user"
    admin = "admin"


class ReportStatus(str, Enum):
    open = "open"
    resolved = "resolved"


class TokenType(str, Enum):
    verify_email = "verify_email"
    reset_password = "reset_password"
