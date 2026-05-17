# ProjectPilot AI

ProjectPilot AI is a lightweight AI-assisted project and task management platform built with React, Express, Prisma, PostgreSQL, and Docker.

## Features

- User registration and login
- JWT authentication
- Create, edit, and delete projects
- Create, edit, and delete tasks
- Task status tracking: Todo, In Progress, Done
- Priority levels: Low, Medium, High
- Dashboard summary cards and progress bar
- Rule-based fake AI summary
- Docker Compose setup for local development
- GitHub Actions CI/CD workflow

## Tech Stack

- Frontend: React, Vite, TailwindCSS, Axios, React Router DOM
- Backend: Node.js, Express, Prisma, PostgreSQL, JWT, bcrypt
- DevOps: Docker, Docker Compose, GitHub Actions

## Installation

1. Clone the repository:
   ```bash
   git clone <repo-url> projectpilot-ai
   cd projectpilot-ai
   ```
2. Start services with Docker Compose:
   ```bash
   docker compose up --build
   ```
3. Open the frontend in the browser:
   - `http://localhost:5173`
4. API server runs on:
   - `http://localhost:5000`

## Environment Variables

### Backend

Create `backend/.env` with:

```env
DATABASE_URL=postgres://postgres:postgres@postgres:5432/projectpilot
JWT_SECRET=your_jwt_secret
```

### Frontend

Create `frontend/.env` with:

```env
VITE_API_URL=http://localhost:5000/api
```

## Docker Usage

- Build and run all services:
  ```bash
  docker compose up --build
  ```
- Stop services:
  ```bash
  docker compose down
  ```

## Deployment

This app is ready for deployment on Render.com or a similar container platform. Create services for:

- PostgreSQL
- Backend container
- Frontend container

Ensure environment variables are set correctly for each service.

## GitHub Actions

The repository includes `.github/workflows/ci-cd.yml` to build frontend and backend on push to `main`.
