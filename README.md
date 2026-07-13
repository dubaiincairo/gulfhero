# GulfHero PMS

**A modern, AI-native Property Management System for hotels — built to beat eZee Absolute on UI/UX, intelligence, and staff-friendliness.**

GulfHero is a multi-tenant, browser-based SaaS PMS for hotel groups. It is
built from ten years of Saudi hospitality experience and takes eZee Absolute,
Centrix, and Optimus as its main functional references. It covers the same
operational ground, then improves the experience through Gulf Hero UI/UX:

1. **Beautiful and fast to use** — a clean, modern interface where the most common front-desk actions take one or two clicks, not a hunt through crowded menus.
2. **Smart** — AI is woven into the core: an AI front-desk copilot, dynamic pricing suggestions, AI guest messaging, natural-language reports, and predictive housekeeping.
3. **Staff-first** — built around real hotel shifts (morning check-outs, evening check-ins, night audit), with role-based screens so a receptionist, housekeeper, and manager each see exactly what they need.

## Commercial and launch direction

- **Customer:** hotel groups
- **Subscription target:** approximately SAR 1,000 per property, annually
- **First market:** Saudi Arabia
- **Launch language:** English; Arabic and full RTL follow first after launch
- **Launch operation:** browser-based desktop application, online-first, with
  Google Chrome on Windows front-desk PCs as the primary environment
- **Financial defaults:** SAR and Saudi VAT, configurable per property
- **Hosting:** regional cloud is acceptable when security and strict
  property-data isolation are maintained
- **Collaboration access:** a Vercel-hosted, fixture-only demo will let
  colleagues and leads across the Gulf try the product before production
- **Early-bird commercial path:** discounted subscriptions may be marketed
  during development only after the Vercel demo passes the UI/UX readiness gate

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

A Vercel collaboration demo is permitted when explicitly approved. It must use
fixture data only, remain separate from production, and never include live
guest data, production credentials, or operational integrations.

## UI/UX and early-bird readiness gate

Clear, accurate, professional, globally competitive desktop UI/UX is Gulf
Hero's first delivery priority. Before the discounted early-bird subscription
is marketed, the online Vercel demo must show complete core prototype journeys,
plain operational labels, no journey-blocking readability or layout defects,
and no dead primary controls. It must pass 1440px desktop browser review,
`npm run build`, operator review, and a fixture-only Vercel smoke test. This
commercial gate does not add checkout, billing, real customer operations, or a
production deployment.

## First paid-release scope

The core operational release covers Reservations; Rates and Availability;
Guest, Company, and Travel Agent Management; Cashiering; Housekeeping;
Reporting; and Configuration. Internal cashiering and accounting-style payment
posting will be real in that release, but bank, payment-gateway, government,
ZATCA, Tourism Observatory Platform, and Shamoos connections are later work.
AI and channel-management capability begin as prototype/visual modules; AI
recommends actions for a human to approve and never acts autonomously.

## How this project is built

This project is built with **AI vibe coding**: every feature is implemented
step-by-step in AI coding sessions. The current approved delivery order is the
Saudi hotel-group plan in `specs/002-saudi-hotel-group-release/plan.md`; the
older `docs/` roadmap remains background product vision where it does not
conflict with the constitution.

The project uses the [AI Team Protocol](AI_TEAM_PROTOCOL.md): Sol is the single
planner and supervisor, routing bounded visual work to Terra, product/research
work to Luna, and complex engineering/verification to 5.5 when those roles are
available in the orchestration environment.

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
