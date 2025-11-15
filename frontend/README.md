# Frontend for API Movies

This is a minimal Next.js frontend that lists movies from the backend API.

Quick start

1. Copy `.env.local.example` to `.env.local` and adjust `NEXT_PUBLIC_API_URL` if needed.
2. Install dependencies:

```powershell
cd frontend; npm install
```

3. Run in development:

```powershell
npm run dev
```

The app will run at `http://localhost:3000` and will fetch movies from `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`).
