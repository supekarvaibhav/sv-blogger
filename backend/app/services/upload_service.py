import os
import uuid

from fastapi import UploadFile

from app.core.config import get_settings


settings = get_settings()


def save_upload(file: UploadFile) -> str:
    os.makedirs(settings.upload_dir, exist_ok=True)
    extension = os.path.splitext(file.filename or "")[1]
    filename = f"{uuid.uuid4().hex}{extension}"
    path = os.path.join(settings.upload_dir, filename)
    with open(path, "wb") as buffer:
        buffer.write(file.file.read())
    return f"/uploads/{filename}"
