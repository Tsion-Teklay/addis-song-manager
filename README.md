# Song Manager — Addis Software Test Project (MERN)

Full stack song library: an Express + MongoDB REST API and a React + TypeScript client
that lists, creates, updates, deletes and filters songs, plus a statistics dashboard.

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
- The UI updates immediately after create / update / delete — no page reload
  (sagas dispatch success actions, the reducer patches the list and re-requests stats)
- Centralised error handling with Mongoose validation messages surfaced in the UI

## Project structure
addis-song-manager/ ├── docker-compose.yml # mongo + api ├── backend/ # Express REST API (TypeScript) └── frontend/ # React SPA (TypeScript)


## Getting started

### 1. Run everything with Docker (recommended)

```bash
docker compose up --build -d          # starts MongoDB + the API on :5000
docker compose exec api npm run seed:prod   # optional sample data

 