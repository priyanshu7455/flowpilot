# FlowPilot — Premium Home Page

Acdyon Technologies Frontend Challenge, Part 2. A homepage for a fictional product, **FlowPilot** ("turn scattered work into clear execution"), built with React + Vite + Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

The development server runs at `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

The production files are generated in the `dist/` folder.

## Deploy

This is a static frontend with no backend and no environment variables required.

For Netlify or Vercel:

* Build command: `npm run build`
* Output directory: `dist`

## Architecture

```text
src/
├── components/
│   ├── Navbar.jsx                  nav, mobile menu, logo-click Easter egg trigger
│   ├── Hero.jsx                    headline, CTA, instrument-line indicator
│   ├── HeroPlanDemo.jsx            hero "goal → plan" simulation
│   ├── InsightSection.jsx          problem → insight transition
│   ├── InteractiveWorkspace.jsx    working product demo + Ask FlowPilot
│   ├── FeatureSection.jsx          feature explanation
│   ├── HowItWorks.jsx              3-step process
│   ├── FinalCTA.jsx                closing CTA
│   ├── Footer.jsx                  in-page navigation
│   └── SecretModal.jsx             "Hire me" modal
├── hooks/
│   ├── useReveal.js                scroll-reveal behavior
│   └── useReducedMotion.js         reduced-motion support
├── App.jsx
├── main.jsx
└── index.css
```

## Design Decisions

See `DECISIONS.md` for the main product, visual, technical, and development decisions.

## Interactions Implemented

1. **Hero goal → "Build my plan"** — users can enter a goal and submit it using the button or Enter key.

2. **Frontend plan-generation simulation** — submitting a goal shows a short planning state and then reveals a demo plan. This is a deterministic frontend simulation using fixed demo data; there is no AI API or real model inference behind it.

3. **Task completion** — clicking a task toggles its completed state, updates progress, shows a check animation, and adds an activity entry.

4. **Workspace switching** — users can switch between three independent flight plans, each with its own tasks and progress.

5. **All / Active / Done filtering** — users can filter the visible tasks.

6. **List / Board view** — users can switch between list and board layouts.

7. **Focus mode** — reduces the visual emphasis of the sidebar and activity feed so the task list becomes the main focus.

8. **Ask FlowPilot** — provides a deterministic suggestion based on the current workspace's unfinished tasks and their priorities. It does not call an AI API.

9. **Scroll-reveal animations** — sections animate into view using `IntersectionObserver`, with reduced-motion support.

10. **5-click FlowPilot logo Easter egg** — clicking the FlowPilot logo five times within a short period opens the secret modal.

11. **Secret "Hire me" modal** — a small accessible dialog with a backdrop, close button, Escape-to-close support, and a link to the LinkedIn profile already used in the project.

12. **Reduced-motion support** — animations and transitions are reduced when the user's operating-system setting requests reduced motion.

## Honesty

FlowPilot is a fictional concept product created for this frontend assignment.

The project does not claim real customers, users, statistics, testimonials, or AI performance.

The AI-style planning experience is a frontend demonstration using fixed demo data.
