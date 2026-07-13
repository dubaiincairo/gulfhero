# Gulf Hero PMS Sprint Board

## Goal

Deliver a desktop-only, visually faithful PMS prototype ready for publication.
The prototype must use polished mock data, working navigation, tabs, filters,
drawers, and temporary modal workflows. It is not a live transactional PMS.

## Scope Rules

- Preserve the source-informed eZee/iPMS desktop visual language.
- Build the Booking Engine configuration module as a visual desktop prototype,
  but do not connect it to a live booking endpoint or payment system.
- Do not build Marketplace, integrations, real payments, checkout, Night Audit
  execution, or external system connections.
- Keep dialogs, menus, and side panels temporary. Do not turn them into
  permanent page content.
- Do not deploy, push, or alter production without an explicit user request.
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
- [ ] Reports: legacy-style taxonomy, operational filters, preview and export
      states.
- [ ] Cross-module polish: every visible tab/action has a finished desktop
      surface, no placeholder layouts, and no dead primary controls.
- [ ] Desktop QA: 1440px and large-desktop visual review, build validation,
      then an explicit deployment decision.

## Scheduled Run Checklist

1. Read this board and the source research.
2. Implement the first unfinished wave or the highest-impact remaining gap.
3. Keep edits scoped; do not replace unrelated completed work.
4. Start or reuse a local dev server, test the changed workflow with Playwright,
   and inspect screenshots when UI layout changes.
5. Run `npm run build`.
6. Commit only the intentional source changes and push the active prototype
   branch to GitHub after the build and visual verification succeed.
7. Mark the completed board item and add one concise log entry below.

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
