# Landwork

AI-powered landscape planning app. Zone painter, plant browser, shopping list, and AI photorealistic rendering.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import at vercel.com → Add New Project
3. Add all four environment variables (see table below)
4. Deploy — done. Your URL will be `landwork.vercel.app`

## Environment variables

Add these in Vercel → Project Settings → Environment Variables:

| Variable | Value | Where to get it |
|---|---|---|
| `SUPABASE_URL` | `https://xxxx.supabase.co` | Supabase dashboard → Settings → API |
| `SUPABASE_KEY` | `eyJh...` | Supabase dashboard → Settings → API → anon public |
| `MAPBOX_TOKEN` | `pk.eyJ1...` | mapbox.com → Account → Access tokens |
| `STABILITY_KEY` | `sk-...` | platform.stability.ai → API Keys |

## Local development

For local dev, temporarily paste credentials back into index.html (don't commit them).
Or use the Vercel CLI:

```bash
npm i -g vercel
vercel dev   # serves with env vars from your Vercel project
```

## File structure

```
/public/index.html   — full single-file app (no secrets)
/api/config.js       — serves public keys to browser
/api/render.js       — Stability AI proxy
/api/mapbox.js       — Mapbox proxy
/vercel.json         — routing config
```
