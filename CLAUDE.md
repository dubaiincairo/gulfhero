# CLAUDE.md — Gulf Hero PMS Prototype

Guidance for AI coding sessions working in this repository.

## Active project definition

Gulf Hero is a multi-tenant, browser-based SaaS product with a desktop-first
operational interface. The active delivery is a polished PMS prototype, not a
live hotel system. Preserve SaaS-ready property or tenant context, user roles,
and configurable modules in the UI and fixture model.

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

## Non-negotiable product rules

- **Multi-tenancy stays visible.** Model and display property/tenant context,
  user-role context, and configurable-module context. For future schemas, use
  `property_id` and property-scoped access patterns; do not implement live RLS
  or authentication in this prototype.
- **Verified data only.** Use verified SwissBlue Hotel Jeddah property and room
  facts. English client-name fixtures are allowed only with explicit approval.
  Never copy live guest personal data.
- **Desktop fidelity.** Use the source-informed eZee/iPMS operational language
  without copying its design. Every primary control must produce a finished
  local state or explicit unavailable feedback.
- **Explicit boundaries.** Booking Engine may be a desktop configuration and
  visual preview only. Marketplace, external connections, real payments,
  checkout, and Night Audit execution are out of scope.

## Working style

1. Read `PMS_SPRINT_BOARD.md`, `PMS_SITEMAP_RESEARCH.md`, and the project
   constitution before selecting work.
2. State the user journey, property/tenant and role context, local-fixture
   boundary, and acceptance criteria before substantial implementation.
3. Keep each wave desktop-only and independently reviewable. Use browser checks
   at 1440px or larger and run `npm run build` before completion.
4. Preserve unrelated working-tree and reference assets. Stage only intended
   repository files; never stage screenshots, exports, `node_modules`, `dist`,
   browser artifacts, `.agents`, `.specify`, or `specs` unless the user
   explicitly changes that boundary.
5. Do not deploy or alter production. A push requires the user’s requested
   workflow and must be validated first.
