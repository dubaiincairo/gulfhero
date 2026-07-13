# CLAUDE.md — Gulf Hero PMS Prototype

Guidance for AI coding sessions working in this repository.

## Product direction

Gulf Hero is a multi-tenant, browser-based SaaS product with a desktop-first
operational interface for hotel groups. It is built from ten years of Saudi
hospitality experience and uses eZee Absolute, Centrix, and Optimus as primary
references for feature coverage, workflow logic, and familiar operations.
Gulf Hero improves the UI/UX while retaining familiar staff workflows.

The first paid market is Saudi Arabia. Target pricing is approximately
SAR 1,000 per property per year. The first paid release is English-first,
desktop-first, online-first, and uses SAR and Saudi VAT defaults. Arabic/RTL is
the first post-launch expansion; Android, iOS, government platforms, banks,
and payment gateways come later.

## Current prototype boundary

Build and test desktop layouts only. Do not build mobile layouts, responsive
mobile acceptance work, or a native desktop wrapper. Use local fixtures only;
do not add real authentication, billing, integrations, payments, checkout,
Night Audit execution, or external connections.

## Current implementation stack

- **Framework:** React 19 + Vite in `src/` (JavaScript)
- **Styling/UI:** custom CSS, Ant Design, and lucide-react
- **Data:** local fixtures. The `supabase/` directory is future-schema design
  scaffolding only; do not configure a live project or runtime connection.
- **Testing:** browser-based desktop workflow checks and `npm run build`
- **Collaboration demo:** Vercel-hosted, fixture-only demo deployments may be
  used for colleagues and leads after explicit user approval and smoke testing.

## Non-negotiable product rules

- **Property isolation and roles.** A user may work in many properties, but
  every user-property assignment has one fixed role: Group Owner, Group Admin,
  Property Manager, Front Office Manager, Receptionist, Housekeeping Manager,
  or Accountant. Work in one selected property at a time; configuration belongs
  to that property by default.
- **Operational integrity.** Financial and cashiering accuracy, rates and
  availability accuracy, and overbooking prevention are non-negotiable.
  Sensitive changes need confirmation, a reason, and an audit record.
- **Verified data only.** Use verified SwissBlue Hotel Jeddah property and room
  facts. English client-name fixtures are allowed only with explicit approval.
  Never copy live guest personal data.
- **Desktop fidelity.** Use the source-informed eZee/iPMS operational language
  and familiar layout, enhanced through Gulf Hero UI/UX. Every primary control
  must produce a finished local state or explicit unavailable feedback. Common
  front-desk actions must be reachable within two clicks; normal work should
  feel immediate, targeting under two seconds on standard Windows Chrome PCs.
- **Explicit boundaries.** Booking Engine may be a desktop configuration and
  visual preview only. Marketplace, external connections, real payments,
  checkout, and Night Audit execution are out of scope.

## Working style

1. Read `PMS_SPRINT_BOARD.md`, `PMS_SITEMAP_RESEARCH.md`, and the project
   constitution before selecting work.
2. State the release stage, user journey, property/tenant and role context,
   local-fixture or paid-release boundary, and acceptance criteria before
   substantial implementation.
3. Keep each wave desktop-only and independently reviewable. Use browser checks
   at 1440px or larger and run `npm run build` before completion.
4. Preserve unrelated working-tree and reference assets. Stage only intended
   repository files; never stage screenshots, exports, `node_modules`, `dist`,
   browser artifacts, `.agents`, `.specify`, or `specs` unless the user
   explicitly changes that boundary.
5. Do not deploy or alter production. A fixture-only Vercel collaboration demo
   requires explicit user approval and a post-deployment smoke test. A push
   requires the user’s requested workflow and must be validated first.
