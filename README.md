# GulfHero PMS

**A modern, AI-native Property Management System for hotels — built to beat eZee Absolute on UI/UX, intelligence, and staff-friendliness.**

GulfHero is a multi-tenant, browser-based SaaS PMS for independent hotels,
boutique properties, and small chains. It covers the same ground as eZee
Absolute (reservations, front desk, housekeeping, billing, booking engine,
distribution) but is designed from day one to be:

1. **Beautiful and fast to use** — a clean, modern interface where the most common front-desk actions take one or two clicks, not a hunt through crowded menus.
2. **Smart** — AI is woven into the core: an AI front-desk copilot, dynamic pricing suggestions, AI guest messaging, natural-language reports, and predictive housekeeping.
3. **Staff-first** — built around real hotel shifts (morning check-outs, evening check-ins, night audit), with role-based screens so a receptionist, housekeeper, and manager each see exactly what they need.

## Current prototype definition

The active deliverable is a **desktop-only browser prototype**. It demonstrates
SaaS-ready property/tenant context, user roles, and configurable modules using
local fixtures. It does not build or test mobile layouts, responsive mobile
behavior, or a native desktop wrapper.

The following are intentionally deferred: real authentication, billing,
integrations, payments, checkout, Night Audit execution, and all external
connections. The prototype uses verified SwissBlue Hotel Jeddah property and
room facts plus explicitly approved English-language fixture clients; it never
uses live guest personal data.

## How this project is built

This project is built with **AI vibe coding**: every feature is implemented step-by-step in AI coding sessions (Claude Code / Claude), following the roadmap in `docs/06-build-roadmap.md`. The docs in this repo are written to be *readable by both humans and AI* — each build step includes acceptance criteria and a ready-to-paste prompt.

**Start here:**

| Doc | What it covers |
|---|---|
| [`docs/01-ezee-absolute-study.md`](docs/01-ezee-absolute-study.md) | Study of eZee Absolute: features, design, how it works, and where it falls short |
| [`docs/02-vision-and-differentiators.md`](docs/02-vision-and-differentiators.md) | Product vision, target users, personas, and how GulfHero wins |
| [`docs/03-feature-specs.md`](docs/03-feature-specs.md) | Module-by-module functional specs (reservations, front desk, housekeeping, billing, …) |
| [`docs/04-architecture-and-stack.md`](docs/04-architecture-and-stack.md) | Tech stack, architecture, and why each choice suits AI-assisted development |
| [`docs/05-data-model.md`](docs/05-data-model.md) | Core database schema: properties, rooms, rates, reservations, folios, … |
| [`docs/06-build-roadmap.md`](docs/06-build-roadmap.md) | **The build plan** — phases, steps, acceptance criteria, and vibe-coding prompts |
| [`docs/07-ai-features.md`](docs/07-ai-features.md) | Detailed specs for every AI feature and how to implement them with the Claude API |
| [`docs/08-vibe-coding-playbook.md`](docs/08-vibe-coding-playbook.md) | How to run AI coding sessions on this repo: workflow, prompting patterns, guardrails |
| [`docs/09-screen-specs.md`](docs/09-screen-specs.md) | Every page/screen in detail: routes, layout, components, actions, states, navigation map |
| [`docs/10-technical-execution-plan.md`](docs/10-technical-execution-plan.md) | Exact engineering steps per roadmap item: migrations, files, functions, tests |
| [`docs/11-ezee-absolute-page-map.md`](docs/11-ezee-absolute-page-map.md) | Screen-by-screen map of eZee Absolute (from its official manuals) → GulfHero parity reference |

## Product vision status

The phases below describe the longer-term SaaS product vision. They are not
authorization to add live services to the current desktop-fixture prototype.

- ✅ Phase P — Planning (this documentation)
- ⬜ Phase 0 — Foundation: project scaffold, auth, multi-tenancy, design system
- ⬜ Phase 1 — Core PMS: rooms, rates, reservations, tape chart, check-in/out, folios
- ⬜ Phase 2 — Operations: housekeeping, night audit, reports, POS-lite
- ⬜ Phase 3 — Distribution: booking engine, payments, channel connectivity
- ⬜ Phase 4 — AI layer: copilot, dynamic pricing, AI messaging, NL reports
- ⬜ Phase 5 — Guest experience & scale: guest portal, online check-in, multi-property, PWA

## Quick start for a new AI coding session

1. Read `CLAUDE.md`, `.specify/memory/constitution.md`, and
   `PMS_SPRINT_BOARD.md` for the active prototype guardrails.
2. Read `PMS_SITEMAP_RESEARCH.md` before making source-sensitive UI changes.
3. Define the desktop journey, property/tenant and role context, fixture
   boundary, and acceptance criteria before implementing.
4. Use the long-term `docs/` roadmap only as product vision unless the user
   explicitly places a live-service phase in scope.
5. Build the desktop slice, validate it at a large desktop viewport, run
   `npm run build`, then update the sprint board.
