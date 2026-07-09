# GulfHero PMS

**A modern, AI-native Property Management System for hotels — built to beat eZee Absolute on UI/UX, intelligence, and staff-friendliness.**

GulfHero is a cloud PMS for independent hotels, boutique properties, and small chains. It covers the same ground as eZee Absolute (reservations, front desk, housekeeping, billing, booking engine, distribution) but is designed from day one to be:

1. **Beautiful and fast to use** — a clean, modern interface where the most common front-desk actions take one or two clicks, not a hunt through crowded menus.
2. **Smart** — AI is woven into the core: an AI front-desk copilot, dynamic pricing suggestions, AI guest messaging, natural-language reports, and predictive housekeeping.
3. **Staff-first** — built around real hotel shifts (morning check-outs, evening check-ins, night audit), with role-based screens so a receptionist, housekeeper, and manager each see exactly what they need.

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

## Current status

- ✅ Phase P — Planning (this documentation)
- ⬜ Phase 0 — Foundation: project scaffold, auth, multi-tenancy, design system
- ⬜ Phase 1 — Core PMS: rooms, rates, reservations, tape chart, check-in/out, folios
- ⬜ Phase 2 — Operations: housekeeping, night audit, reports, POS-lite
- ⬜ Phase 3 — Distribution: booking engine, payments, channel connectivity
- ⬜ Phase 4 — AI layer: copilot, dynamic pricing, AI messaging, NL reports
- ⬜ Phase 5 — Guest experience & scale: guest portal, online check-in, multi-property, PWA

## Quick start for a new AI coding session

1. Read `CLAUDE.md` (repo conventions and stack).
2. Open `docs/06-build-roadmap.md`, find the first unchecked step.
3. Read the same step number in `docs/10-technical-execution-plan.md` (exact files/migrations/tests) and the relevant screen spec in `docs/09-screen-specs.md`.
4. Use the step's prompt, build it, meet the acceptance criteria, check the box, commit.
