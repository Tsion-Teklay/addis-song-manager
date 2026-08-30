# Song Manager — Addis Software Test Project (MERN)

Full stack song library: an Express + MongoDB REST API and a React + TypeScript client that lists, creates, updates, deletes and filters songs, plus a statistics dashboard.

- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose, Docker
- **Frontend:** React, TypeScript, Redux Toolkit, Redux-Saga, Emotion, Styled System, Vite

## Features

- CRUD for songs (`title`, `artist`, `album`, `genre`, optional `year`)
- Server-side pagination, text search and filtering by genre / artist / album
- Statistics computed with a single MongoDB aggregation (`$facet`):
  - total songs, artists, albums, genres
  - songs per genre
  - songs and albums per artist
  - songs per album
- The UI updates immediately after create / update / delete — no page reload (sagas dispatch success actions, the reducer patches the list and re-requests stats)
- Centralised error handling with Mongoose validation messages surfaced in the UI

## Project Structure

```text
addis-song-manager/
├── docker-compose.yml  # mongo + api 
├── backend/            # Express REST API (TypeScript) 
└── frontend/           # React SPA (TypeScript)
```

## Getting Started

### 1. Start the Backend & Database (Docker)
Ensure Docker is running, then run the following in the root directory:

```bash
docker compose up --build -d
```
*This starts MongoDB and the API backend on port `5050`.*

**(Optional) Seed the database with sample data:**
```bash
docker compose exec api npm run seed:prod
```

### 2. Start the Frontend
Open a new terminal, navigate to the `frontend` folder, and install dependencies:

```bash
cd frontend
npm install
```

Create your environment file:
```bash
cp .env.example .env
```

Start the Vite development server:
```bash
npm run dev
```

*The frontend will be accessible at `http://localhost:5173` and connected to the backend.*

## Live Demo

- **Client:** https://addis-song-manager-lovat.vercel.app/
- **API:** https://addis-song-manager-api.onrender.com/api/health

> **Note to reviewers:** The API is hosted on Render's free tier, which goes to sleep after 15 minutes of inactivity. If the frontend shows a network error or takes a long time to load initially, please allow up to 30-50 seconds for the backend to wake up!