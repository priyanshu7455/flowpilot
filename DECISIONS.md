# DECISIONS.md — FlowPilot (Part 2: Premium Home Page)

# FlowPilot — Design Decisions

## Track & Scope

I chose **Part 2 — Premium Home Page**.

The goal was to make FlowPilot feel like a real product instead of a normal SaaS landing page.

---

## 1. Why I chose this approach

A common productivity website would have a large heading, a gradient background, some feature cards, and a few numbers.

I wanted to do something more useful.

Instead of only telling visitors what FlowPilot does, I made the homepage **show the product working**.

In the hero section, the user can enter a goal and see FlowPilot turn that goal into a simple plan.

Further down, there is an interactive workspace where users can:

- Complete tasks
- Switch between plans
- Filter tasks
- Change between list and board views
- Use Focus Mode
- Ask FlowPilot for a suggestion

This makes the website feel like a product demonstration rather than only a marketing page.

### Design choice

I chose a dark charcoal/navy background with an amber accent.

I also used monospace text for some data and status information and used a cockpit/instrument-panel style throughout the product interface.

I chose this style because it connects with the name **FlowPilot** and gives the product its own visual identity instead of using a common SaaS gradient design.

---

## 2. One trade-off I made

Because of the time limit, I decided not to build a light mode.

Instead of creating a light mode quickly and leaving it inconsistent, I focused on making the dark theme complete and polished.

If I had more time, I would add:

- Saving task changes after refreshing the page
- A proper empty state when there are no tasks
- A fully designed light mode

I chose quality and consistency over adding more unfinished features.

---

## 3. Where I used AI

I used **Claude extensively during development**.

I used it for:

- Setting up the React/Vite/Tailwind project
- Creating the first versions of components
- Writing the initial styling
- Creating interaction logic
- Drafting initial website copy
- Helping improve the design and user experience

I did not treat the generated output as final without checking it.

I personally tested the main interactions, including:

- Completing tasks
- Switching plans
- Filtering tasks
- List and board views
- Focus Mode
- Hero goal-to-plan interaction
- Ask FlowPilot suggestion
- Navigation and CTA buttons
- Responsive behavior

I also reviewed the design and copy and made changes to make the website better match the assignment.

The hero AI-style planning feature is a **frontend simulation using fixed demo data**. It does not call a real AI model or API, so the website does not make a false claim about using real AI.

I also checked that the website does not contain fake testimonials, fake user numbers, fake company logos, or fake statistics.

Finally, I personally ran:

```bash
npm run build
```

and confirmed that the production build completed successfully.

---

## Honesty Check

FlowPilot is a fictional concept product created for this frontend assignment.

The website does not claim to have real customers, real users, real statistics, or real AI performance.

The AI-style planning experience is a frontend demonstration using fixed demo data.

The purpose of the project is to demonstrate product thinking, frontend development, interaction design, and visual design.
