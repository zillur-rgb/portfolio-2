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

## Ask-my-CV dock

A fixed chat bar at the bottom of the page (`src/Agent.tsx`, logic in `src/agent.ts`). It answers from the same data as the page (`src/data.ts`) plus a few extra facts in `agent.ts` (skills, languages, AWS). Answers appear in a sheet above the bar; questions about experience, education or contact also get a "Show on page" button that scrolls to that section. It detects German vs English per question. No backend needed.

## Before you push

`node_modules/` was committed by accident. Remove it from git once:

```bash
git rm -r --cached node_modules
git add .gitignore && git commit -m "Ignore node_modules"
```
