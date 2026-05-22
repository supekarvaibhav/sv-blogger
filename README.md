# SV Blogger

SV Blogger is a full-stack, modern blogging platform built with FastAPI and Next.js. It supports user registration, authentication, blog creation and management, comments, likes, bookmarks, and admin moderation tools.

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind CSS, Redux Toolkit, React Hook Form, Shadcn-style UI components, Framer Motion
- Backend: FastAPI, SQLAlchemy (async), PostgreSQL, Alembic, JWT auth, bcrypt

## Architecture Highlights

- Layered backend design (routes, services, schemas, models)
- Async SQLAlchemy with Postgres for scalable data access
- Modular frontend with reusable components, hooks, and services

## Project Structure

```
sv-blogger/
├── frontend/
├── backend/
└── README.md
```

## Quick Start

1. Follow backend setup in [backend/README.md](backend/README.md).
2. Follow frontend setup in [frontend/README.md](frontend/README.md).

## Deployment

- Frontend: Vercel
- Backend: Render or Railway
- Database: PostgreSQL

### Frontend (Vercel)

1. Set `NEXT_PUBLIC_API_URL` to your backend URL.
2. Build command: `npm run build`.
3. Output: `.next`.

### Backend (Render/Railway)

1. Set `DATABASE_URL`, `SECRET_KEY`, `ALLOWED_ORIGINS`.
2. Start command: `uvicorn app.main:app --host 0.0.0.0 --port 8000`.
3. Run migrations on deploy: `alembic upgrade head`.

### Sample Data

Use the seed script to create an admin account and a starter blog:

```
python scripts/seed.py
```

See the README files in each folder for full instructions.
