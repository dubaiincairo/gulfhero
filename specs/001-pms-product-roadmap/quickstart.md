# Quickstart: Review and Execute the PMS Roadmap

## Prerequisites

- Work from the repository root.
- Read `PMS_SPRINT_BOARD.md` for the current state.
- Read the relevant source section in `PMS_SITEMAP_RESEARCH.md` before changing
  a source-sensitive workspace.
- Use only verified SwissBlue property and room information.

## Delivery Sequence

1. **Front Desk Core** — complete Cashiering and Cash Drawer as local desktop
   workspaces; do not add real payments or live cash processing.
2. **Service Operations** — complete Housekeeping, then Guest & CRM, with
   finished local states for their primary controls.
3. **Management Review** — complete Reports with reviewable filters, previews,
   and export presentation states.
4. **Release Readiness** — remove placeholder/dead primary controls, perform
   cross-module visual polish, and run final desktop QA.
5. **Decision Gate** — present validation evidence and obtain an explicit user
   decision before any deployment action.

## Wave Validation

For each wave:

1. Start the local application with `npm run dev`.
2. Exercise the changed primary workflow in Playwright at 1440px or larger.
3. Inspect a current screenshot whenever the layout changes.
4. Run `npm run build`.
5. Update the sprint board only after all checks pass.

## Expected Outcome

The prototype progresses as a coherent PMS journey and remains a local,
desktop-only review artifact throughout. No quickstart step authorizes external
connections, transactions, production changes, or deployment.
