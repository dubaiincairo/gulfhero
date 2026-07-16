# Gulf Hero Codex Working Agreement

This repository is the durable source of truth for Gulf Hero. Codex Cloud task
containers and local development folders are disposable working copies.

## Start every build task here

1. Read `PMS_SPRINT_BOARD.md` and `PMS_SITEMAP_RESEARCH.md` before changing UI.
2. Read `README.md`, `CLAUDE.md`, and `.specify/memory/constitution.md` before
   changing product scope, data architecture, or release boundaries.
3. Preserve the existing desktop visual language and completed work.

## Environment

- Setup command: `npm ci`
- Development command: `npm run dev`
- Required validation: `npm run build`
- The current prototype needs no secret or external service configuration.
- Use a large desktop viewport (1440 px or wider) for browser validation.

## Current non-negotiable scope

- Desktop-only, browser-based, fixture-only prototype.
- Use only source-verified SwissBlue Hotel Jeddah property, room-type,
  room-number, rate, and operational facts.
- The committed `src/marketFixtures.js` is the cloud-safe reservation fixture.
  Never upload or commit the private raw report used to derive it.
- Booking Engine is a visual configuration prototype only.
- Do not build or connect Marketplace, integrations, live authentication,
  payments, checkout, Night Audit execution, production databases, or any
  external endpoint without explicit founder approval.
- Do not copy guest contact details, government identifiers, payment remarks,
  tax identifiers, invoice/folio records, or unapproved personal data.

## Interaction and validation rules

- Use drawers, popovers, and modals for transient source-style workflows.
- Test changed workflows in a real browser and inspect screenshots for visual
  changes. Do not commit screenshots or browser artifacts.
- Run `git diff --check` and `npm run build` before committing.
- Update `PMS_SPRINT_BOARD.md` with one concise dated Run Log entry for a
  completed build wave.
- Stage only intentional project files. Never stage `node_modules`, `dist`,
  screenshots, drive exports, private reports, or browser artifacts.
- Do not deploy or alter production unless the founder explicitly requests it.

## SaaS safety boundary

Git history protects source code; it does not back up future tenant data. Before
any live customer is onboarded, the recovery controls in
`docs/CLOUD_DEVELOPMENT_AND_RECOVERY.md` must be implemented and restore-tested.
