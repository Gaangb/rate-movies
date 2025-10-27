# RateMovies Web (React + Vite)

Frontend (React + Vite + MUI) that consumes the **Movies & Favorites API**.  
Browse/discover movies, **search by title**, view **details**, **favorite/unfavorite** with an optimistic UI, and **share** a favorites list.

---

## Table of Contents
1. [Overview](#overview)  
2. [Tech Stack](#tech-stack)  
3. [Key Behavior](#key-behavior)  
4. [Project Layout](#project-layout)  
5. [Setup](#setup)  
6. [Environment](#environment)  
7. [Commands](#commands)  
8. [Pages & Routes](#pages--routes)  
9. [API Integration](#api-integration)  
10. [Troubleshooting](#troubleshooting)

---

## Overview

This app is the **client** for your BFF-style API:

- **Discover/Search** movies (TMDb) with infinite scrolling.  
- **Movie details** (dedicated route).  
- **Favorites**: optimistic toggle; “favorite” flag shown in lists.  
- **Share favorites**: generates a *slug* (no spaces) and a shareable link.

---

## Tech Stack

- **React 18** + **Vite**
- **React Router**
- **Material UI (MUI)** + a bit of **Bootstrap** (navbar)
- **Axios** (HTTP client)
- **ESLint/Prettier** (optional)
- **Node.js 18+**

---

## Key Behavior

- **Navbar Search**  
  - The form updates the URL to `/?q=<term>`.  
  - Home reads `?q=` (via `useSearchParams`) and switches to `movies/search/`.  
  - Without `q`, it uses `movies/discover/`.

- **Infinite Scrolling**  
  - An *IntersectionObserver* watches a loader at the bottom of the grid.  
  - Deduplication uses a **Set of IDs**.

- **Favorite/Unfavorite**  
  - Optimistic UI + guard to avoid double requests.  
  - Calls `POST /favorites/` on the API.  
  - On Home, the hero section is hidden when a search (`?q=`) is active.

- **Share List** (Favorites page)  
  - Generates a `list_name` **without spaces** (sanitized to `-`).  
  - Calls `POST /share-list/` (or `/favorites/share/`, depending on backend).  
  - Copies/shares the URL `/list/<slug>`.

---

## Project Layout

```
src/
  api/
    api.js                 # axios with baseURL and Authorization
  components/
    movie-card/
      MovieCard.jsx
  pages/
    home/
      HomePage.jsx
    favorites/
      FavoritesPage.jsx
    movie/
      MovieDetails.jsx     # (movie details)
    shared-list/
      SharedListPage.jsx   # (optional if implemented)
  App.jsx
  main.jsx
```

---

## Setup

### 1) Clone
```bash
git clone https://github.com/<your-username>/rate-movies-web.git
cd rate-movies-web
```

### 2) Node & Package Manager
- Node **18+**
- Use **Yarn** (or NPM if you prefer)

### 3) Install deps
```bash
yarn
# or
npm install
```

### 4) Run in dev
```bash
yarn dev
# or
npm run dev
```

Open: `http://localhost:5173`

---

## Environment

Create a `.env` at the project root (Vite):

```ini
# Backend base URL (must end with a trailing /)
VITE_API_MOVIES=http://127.0.0.1:8000/api/v1/

# TMDb V4 token (the frontend forwards it via Authorization header)
VITE_API_TOKEN=eyJhbGciOiJIUzI1NiJ9...   # or "Bearer <token>" if your api.js expects the prefix

# TMDb account id (used to flag favorites in lists)
VITE_API_ACCOUNT_ID=1234567
```

> **CORS**: on the backend, include `http://localhost:5173` in `CORS_ALLOWED_ORIGINS`.

---

## Commands

| Command                | Description                     |
|------------------------|---------------------------------|
| `yarn dev`             | Development server              |
| `yarn build`           | Production build (Vite)         |
| `yarn preview`         | Preview the built app locally   |
| `yarn lint`            | Lint (if configured)            |

(With NPM: `npm run dev/build/preview/lint`.)

---

## Pages & Routes

- `/` **Home**  
  - Without `?q`, calls **Discover**.  
  - With `?q=term`, calls **Search**.  
  - Hero is shown only in Discover mode.  
  - Movie grid with **infinite scroll** and **favorite toggle**.

- `/favorites` **Favorites**  
  - Fetches the user's favorites via the API.  
  - **“Share list”** button: opens a modal, requires a name **without spaces**, generates a link.

- `/movie/:id` **Details**  
  - Loads movie details.

- `/list/:slug` **Shared List** *(optional)*  
  - If implemented, resolves `slug -> account_id` and renders the current TMDb favorites.

---

## API Integration

Via `src/api/api.js`:

```js
import axios from "axios";

const apiMovies = axios.create({
  baseURL: import.meta.env.VITE_API_MOVIES,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`, // TMDb V4
  },
});

export default apiMovies;
```

### Endpoints used by the frontend

- **Discover**  
  `GET /movies/discover/?page=&language=pt-BR&account_id=<id>`

- **Search**  
  `GET /movies/search/?query=<q>&page=&language=pt-BR&account_id=<id>`

- **Details**  
  `GET /movies/:tmdb_id/`

- **Favorites**  
  `POST /favorites/`  
  Body (current): `{ account_id, movie_id, favorite: bool, media_type: "movie" }`  
  > If your backend already migrated to the new serializer (with `title`, `overview`, etc.), the frontend sends those fields as well.

- **Share**  
  `POST /share-list/` *(or `/favorites/share/`)*  
  Body: `{ account_id, list_name }` → returns `{ slug }`.

---

## Troubleshooting

| Symptom | Check |
|---|---|
| **Two requests** in dev | React 18 **StrictMode** remounts components. The app uses guards and in-flight caching to prevent duplicates. As a last resort, remove `<StrictMode>` in dev only. |
| **Missing “favorite” flag** | Ensure `VITE_API_ACCOUNT_ID` is set and the backend forwards a valid `Authorization` header to TMDb. |
| **CORS in browser** | Add `http://localhost:5173` to `CORS_ALLOWED_ORIGINS` on the backend. |
| **Search doesn’t paginate** | Home resets state on `?q` change. Make sure the loader is visible and the `IntersectionObserver` is active. |
| **Favorite button triggers card click** | In `MovieCard`, call `e.stopPropagation()` on the favorite icon/button click. |
| **List name with spaces** | The Favorites modal sanitizes spaces to `-` and validates the input. |
