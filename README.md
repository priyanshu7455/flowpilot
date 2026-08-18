# FlowPilot — Premium Home Page

Acdyon Technologies Frontend Challenge, Part 2. A homepage for a fictional
product, **FlowPilot** ("turn scattered work into clear execution"), built
with React + Vite + Tailwind CSS.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
```

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deploy

Static build, no backend, no env vars required. Drag `dist/` into Netlify,
or connect the repo to Vercel/Netlify with:

- Build command: `npm run build`
- Output directory: `dist`

## Architecture

```
src/
├── components/
│   ├── Navbar.jsx              nav, mobile menu, logo-click Easter egg trigger
│   ├── Hero.jsx                headline, CTA, instrument-line indicator
│   ├── HeroPlanDemo.jsx        hero "goal → plan" simulation (see below)
│   ├── InsightSection.jsx      problem → insight transition
│   ├── InteractiveWorkspace.jsx  the real, working product demo + Ask FlowPilot
│   ├── FeatureSection.jsx      alternating-row feature explanation
│   ├── HowItWorks.jsx          3-step numbered process
│   ├── FinalCTA.jsx            closing CTA
│   ├── Footer.jsx              in-page nav only, no dead links
│   └── SecretModal.jsx         "Hire me" modal shown by the Easter egg
├── hooks/
│   ├── useReveal.js            IntersectionObserver scroll-reveal
│   └── useReducedMotion.js     respects prefers-reduced-motion
├── App.jsx
├── main.jsx
└── index.css
```

## Design decisions

See `DECISIONS.md`.

## Interactions implemented

1. **Hero goal → "Build my plan"** — an editable goal input in the hero
   (pre-filled with an example) submits on click or Enter.
2. **Frontend plan-generation simulation** — submitting shows a brief
   "sorting tasks" state, then reveals a fixed demo plan. This is a
   **deterministic frontend simulation only** — there is no AI API call and
   no real inference behind it. The plan title reflects the typed goal
   text; the task list itself is fixed demo data.
3. **Task completion** — clicking a task in the workspace toggles it done,
   recalculates the progress bar, plays a small check animation, and logs
   an activity entry.
4. **Workspace switching** — the sidebar swaps between three independent
   task sets ("flight plans"), each with its own progress.
5. **All / Active / Done filtering** — tabs filter the visible task list.
6. **List / Board view** — toggles the task list between a list and a
   card/board layout.
7. **Focus mode** — dims the sidebar and activity feed so only the task
   list stays sharp.
8. **Ask FlowPilot suggestion** — a button in the workspace ("What should I
   work on next?") reveals a deterministic suggestion computed from the
   current workspace's own undone tasks, sorted by priority. Not an AI
   call — plain logic over the demo data already on screen.
9. **Scroll-reveal animations** — sections fade/rise into place once in
   view via IntersectionObserver, skipped under `prefers-reduced-motion`.
10. **5-click FlowPilot logo Easter egg** — clicking the logo in the nav
    five times (within a short window) opens the secret modal. Not hinted
    anywhere in the UI.
11. **Secret "Hire me" modal** — a small dialog with a backdrop, close
    button, Escape-to-close, and a link out to the real LinkedIn profile
    already used elsewhere in the project.
12. **Reduced-motion support** — `useReducedMotion` plus a global CSS rule
    collapse animation/transition durations near-instant when the OS
    setting is on; this covers the hero ring/plan animation, scroll
    reveals, the hero card's ambient float, and the task check animation.

## Pre-submission checklist

- [ ] `npm run build` completes with no errors
- [ ] No console errors/warnings in the browser
- [ ] Resize to 390px — no horizontal scroll, nothing clipped, nav works
- [ ] Resize to 768px and 1024px — layout reflows sensibly
- [ ] Resize to 1440px — content doesn't stretch awkwardly wide
- [ ] Tab through the whole page with keyboard only — every interactive
      element gets a visible focus ring, nothing is a dead end
- [ ] Toggle OS-level "reduce motion" — animations should disappear
- [ ] Click every button once — nothing is a no-op except intentionally
      inert copy (e.g. footer date)
- [ ] Read every line of copy out loud — cut anything that sounds like
      generic AI marketing filler
- [ ] Confirm there are no fabricated numbers, testimonials, or logos
      anywhere on the page
- [ ] Deploy to Vercel/Netlify and re-run this checklist against the live URL
- [ ] Push to a public (or challenge-visible) GitHub repo
- [ ] Fill out the submission form with the deployed URL + repo link
- [ ] Re-read `DECISIONS.md` and make sure you can defend every line of it
      out loud, unscripted — that's what the follow-up call is grading
