# Zillur Rahman — Portfolio

Vite + React + TypeScript. Single scrolling page.

## Run locally

```bash
npm install
npm run dev
```

## Add your photo

Drop a square photo at `public/portrait.jpg` (it renders as an 84×84 circle in the hero). If the file is missing, the photo is simply hidden.

## Update content

All experience/education data lives in `src/data.ts` — edit there, no JSX changes needed. Copy/layout is in `src/App.tsx`.

The CV download serves `public/Zillur_Rahman_CV.pdf` — replace that file to update it.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. On vercel.com → **Add New Project** → import the repo.
3. Vercel auto-detects Vite; accept defaults and deploy.

Or via CLI: `npx vercel` from this folder.
