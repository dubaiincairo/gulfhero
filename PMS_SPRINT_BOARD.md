# Gulf Hero PMS Sprint Board

## Goal

Deliver a desktop-only, visually faithful PMS prototype ready for publication.
The prototype must use polished mock data, working navigation, tabs, filters,
drawers, and temporary modal workflows. It is not a live transactional PMS.
Gulf Hero remains SaaS-ready in its visible property/tenant context, user-role
context, and configurable modules, but all prototype data stays local fixtures.

## Scope Rules

- Preserve the source-informed eZee/iPMS desktop visual language.
- Build and test browser-based desktop layouts only. Do not add mobile layouts,
  responsive mobile work, or a native desktop wrapper.
- Preserve property/tenant context, user roles, and configurable-module concepts
  in every wave, using local fixtures only.
- Do not add real authentication, billing, integrations, payments, checkout,
  Night Audit execution, or external connections.
- Build the Booking Engine configuration module as a visual desktop prototype,
  but do not connect it to a live booking endpoint or payment system.
- Do not build Marketplace, integrations, real payments, checkout, Night Audit
  execution, or external system connections.
- Keep dialogs, menus, and side panels temporary. Do not turn them into
  permanent page content.
- Do not deploy, push, or alter production without an explicit user request.
- A Vercel-hosted collaboration demo is allowed only when explicitly requested:
  it must be fixture-only, smoke-tested after deployment, and separate from
  production.
- Clear, accurate, professional desktop UI/UX is the first delivery priority.
  Do not market the discounted early-bird subscription until all core prototype
  journeys have no dead primary controls or journey-blocking clarity/layout
  defects and the approved fixture-only Vercel demo passes its readiness gate.
- Use verified SwissBlue Hotel Jeddah property data from the supplied source
  screenshots and research. Use only English client-name fixtures that have
  been explicitly approved for the prototype; do not copy live guest personal
  data from the demo account.
- Import room numbers under each room type only when they are source-verified.
- Read `PMS_SITEMAP_RESEARCH.md` before implementing a source-sensitive page.

## Completed

- [x] Application shell, desktop navigation, header controls, and temporary
      quick-menu, alerts, announcements, and user-menu surfaces.
- [x] Reservation list, temporary reservation detail drawer, action menus, and
      reservation workspace tabs.
- [x] Add Reservation local model: fixture-only multi-room stay creation,
      VAT/discount totals, unassigned-room handling, reservation detail, and
      room-type availability updates.
- [x] Stay View: 12-day room matrix, room-type availability context,
      collapsible groups, filters, matching reservation detail links, and the
      temporary date-first room-assignment drawer.
- [x] Configuration: Rooms and Rates hierarchy, the supplied ten room types,
      Room Only Flexible, and Room Only Non-Refundable rate plans.
- [x] SwissBlue Superior King Room numbers imported from the verified Stay View
      reference: 111, 211, 311, 411, 511, 611, 701, 702, 703, 704.

## Remaining Build Waves

- [x] Room View: source-informed room-state control board, count filters,
      local date controls, and temporary room detail/housekeeping surfaces.
- [x] Rates and Availability: complete all tabs, edit states, and rate detail
      drawer consistency.
- [x] Booking Engine: Booking Engine Summary, Settings, Analytics & Tracking,
      Customization, and Preferences as desktop prototype tabs, plus a local
      desktop preview drawer that intentionally stops before checkout/payment.
- [x] Cashiering and Cash Drawer: source-style list, drawer session/report
      tabs, and temporary Create Drawer workflow.
- [x] Housekeeping: House Status, Maintenance Block, and Work Order/Task
      workspaces with temporary forms.
- [x] Guest and CRM: guest records, notes, Lost and Found, and temporary forms.
- [x] Reports: legacy-style taxonomy, operational filters, preview and export
      states.
- [x] Supabase and access foundation: local Supabase project, membership-RLS
      schema migration, privacy-safe fixture seed, environment-aware client,
      email/password login, Abdalla Elfouly account identity, and lower-left
      Gulf Hero brand placement.
- [x] Cross-module polish: every visible tab/action has a finished desktop
      surface, no placeholder layouts, and no dead primary controls.
- [x] Desktop QA: 1440px and large-desktop visual review, build validation,
      then an explicit deployment decision.

## Scheduled Run Checklist

1. Have Sol apply `AI_TEAM_PROTOCOL.md`: select the bounded task owner and
   acceptance evidence before work starts.
2. Read this board and the source research.
3. Implement the first unfinished wave or the highest-impact remaining gap.
4. Keep edits scoped; do not replace unrelated completed work.
5. Start or reuse a local dev server, test the changed workflow with Playwright,
   and inspect screenshots when UI layout changes.
6. Run `npm run build`.
7. Sol commits only the intentional source changes and pushes the active prototype
   branch to GitHub after the build and visual verification succeed.
8. Mark the completed board item and add one concise log entry below.

## Run Log

- 2026-07-12: Reservation detail workflow, Rooms and Rates configuration, and
  Stay View were implemented and browser-verified locally.
- 2026-07-13: Completed the local-only Booking Engine desktop prototype and
  fixed the Housekeeping room-table key warning. Browser-verified navigation,
  tabs, preview drawer, local actions, 1440px layout, and clean console; build
  passes. Next: Room View polish.
- 2026-07-13 22:00: Completed Room View polish with source-informed state
  counters, color-coded room cards, local date navigation, and a temporary
  room detail/housekeeping workflow. Verified at 1440px with Playwright and a
  clean console; build passes. Next: Rates and Availability completion.
- 2026-07-13 22:00: Completed Rates and Availability with local rate edits,
  working plan/tax/derived filters, independent restriction matrices, save
  states, and completed rate-detail tabs. Playwright verified all tabs,
  grid edits, local saves, filters, and drawer states at 1440px; build passes.
  Next: Cashiering and Cash Drawer.
- 2026-07-13 22:00: Completed Cashiering and Cash Drawer with source-style
  ledger controls, a clearly local-only payment preview, Drawers and Cashier
  Report tabs, Audit Trail, and a temporary Create Drawer modal. Playwright
  verified the payment boundary, drawer creation, local report row, audit
  trail, and 1440px desktop layout with no relevant console errors; build
  passes. Next: Housekeeping.
- 2026-07-13 22:00: Completed Housekeeping with source-informed House Status,
  Maintenance Block, and Work Order/Task workspaces. Playwright verified a
  local maintenance block, temporary task form, local task resolution, and
  1440px desktop layout with no relevant console errors; build passes. Next:
  Guest and CRM.
- 2026-07-13 22:00: Completed Guest and CRM with a privacy-safe Guest Database,
  temporary room-linked profile and note forms, Front Desk Operations, and
  source-style Lost and Found flows. Playwright verified local profile and
  found-item saves, the complete temporary note form, the Housekeeping service
  tabs, and 1440px desktop layout with no relevant console errors; build
  passes. Next: Reports.
- 2026-07-13 22:00: Completed Reports with source-style legacy taxonomy,
  Arrival List local filter/output controls, presentation-only preview and
  export states, and a source-gap boundary for Graphs and Charts. Playwright
  verified report selection, local preview/export feedback, and 1440px layout
  with no relevant console errors; build passes. Next: Cross-module polish.
- 2026-07-13 22:00: Completed the Supabase and access foundation: RLS-scoped
  property, room, guest, reservation, folio, and entry schema; synthetic
  English-language SwissBlue fixture seed; environment-aware Supabase client;
  password login; Abdalla Elfouly account identity; and lower-left Gulf Hero
  product brand. Browser-verified the login, configuration boundary, seeded
  preview, account menu/logout, and fixture-rich Guest Database. `npm run
  build` passes. Local database execution is blocked because Docker is not
  installed. Supabase artifacts are now design scaffolding only under the
  current fixture-only definition; do not connect a remote project. Next:
  final desktop QA of local prototype journeys.
- 2026-07-13 22:00: Amended the active project definition: Gulf Hero is a
  multi-tenant, browser-based SaaS concept with desktop-first operational UI.
  Prototype work now preserves property/tenant, role, and configurable-module
  concepts through local fixtures only; mobile/native, real authentication,
  billing, payments, integrations, and external connections are explicitly
  deferred. This boundary governs future planning and implementation.
- 2026-07-13 22:00: Rebuilt the product constitution from founder discovery.
  It now distinguishes the current desktop-fixture prototype from the first
  paid Saudi hotel-group release, defines fixed per-property roles and
  configuration ownership, establishes financial/rate/overbooking integrity,
  confirms eZee functional familiarity with Gulf Hero UI/UX improvements, and
  documents the Saudi English-first, SAR/VAT, audit, performance, and staged
  integration roadmap.
- 2026-07-13 22:00: Added Vercel-hosted collaboration-demo readiness to the
  product direction. Demos enable Gulf-wide colleagues and leads to try the
  fixture-only desktop product; they remain non-production and require explicit
  deployment approval plus a post-deployment smoke test.
- 2026-07-13: Elevated globally competitive, clear, accurate, professional
  desktop UI/UX to the first delivery priority. A fixture-only Vercel demo must
  pass desktop/browser, build, operator-review, and smoke-test gates before it
  supports marketing the discounted early-bird subscription; this creates no
  checkout, billing, live-data, or production authorisation.
- 2026-07-13: Adopted `AI_TEAM_PROTOCOL.md`. Sol is the sole planner,
  supervisor, Git/deployment authority, and founder-facing decision maker;
  Terra owns UI/UX work, Luna owns product/research/documentation work, and
  5.5 owns complex engineering and verification when available. Every delegated
  task now requires a bounded packet, evidence, and Sol acceptance.
- 2026-07-13: Phase 0 UI/UX trust-and-clarity wave fixed dashboard and Room
  View reservation selection so the chosen guest opens the matching stay,
  added a working property/role context for Abdalla Elfouly, replaced technical
  database warnings with a fixture-preview boundary, clarified rate-control
  labels, repaired distribution action accessibility, and added reservation
  guide/boundary feedback. Browser-verified at 1440px and 1680px with no
  relevant console errors; build passes. Next: make Add Reservation mutate a
  coherent in-memory reservation/inventory model before the readiness gate.
- 2026-07-13 19:00: Completed the fixture-only Add Reservation local-state
  wave: multi-room rate/VAT totals, unassigned-room handling, coherent detail,
  and room-type availability updates. Playwright visual workflow checks and
  build pass. Next: cross-module polish and final desktop QA.
- 2026-07-13 20:00: Completed cross-module desktop polish: clarified the
  fixture-only access boundary, strengthened Reservations status/search flow,
  and tightened Stay View into a source-informed room-type matrix with mapped
  inventory context. Playwright verified local workspace entry, Stay View
  filtering, reservation filtering, and the visual-only Booking Engine preview
  (no checkout or payment controls) at 1440px and 1680px; build passes. Next:
  an explicit deployment decision.
- 2026-07-14 19:00: Completed final desktop QA at 1440px and 1680px; clarified
  the Booking Engine link control with a fixture-only review modal, verified no
  live endpoint/payment/checkout path, and confirmed the local build passes.
  Deployment remains unrequested; no production action was taken.
