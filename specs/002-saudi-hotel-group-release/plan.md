# Implementation Plan: Saudi Hotel Group First Release

**Branch**: `agent/gulf-hero-pms-prototype` | **Date**: 2026-07-13 | **Spec**:
[`spec.md`](./spec.md)

**Release Stage**: `First Paid Saudi Release`, with a separate `Current
Prototype` collaboration-demo companion

## Summary

Gulf Hero will progress from its polished local desktop prototype to an
English-first Saudi hotel-group PMS. The paid-release path adds a
property-isolated Supabase operational core behind the existing React desktop
experience, then proves the most safety-critical journeys before broader
operations: property-role access, rates and availability, reservations,
cashiering, housekeeping, configuration, and property-scoped reports.

The Vercel experience is a different track: it remains a fixture-only,
non-production browser demo for Gulf colleagues and leads. It must never point
to the paid database, expose real guest data or credentials, or be shared
before an approved desktop smoke test. This plan does not authorise a Vercel
deployment or a production release.

UI/UX clarity, accuracy, and professional finish are the first delivery
priority. The discounted early-bird subscription may be marketed while
development continues only after the fixture-only Vercel demo meets its
documented readiness gate; it does not add product checkout, billing, or live
customer operations.

The older `docs/06-build-roadmap.md` and `docs/10-technical-execution-plan.md`
contain historical ideas that conflict with this release (mobile-first work,
Stripe, Night Audit, public booking, and external integrations). The
constitution, this plan, and its linked specification are authoritative for
this release.

## Technical Context

**Language/Version**: ECMAScript modules and JSX in the current React 19
prototype; TypeScript for all new paid-release domain, data-access, and test
modules, introduced incrementally without a UI rewrite.

**Primary Dependencies**: React 19, Vite 6, Ant Design 6, Lucide, and
`@supabase/supabase-js`; add Vitest for pure domain logic and formalise the
existing Playwright dependency for desktop end-to-end checks.

**Storage**: Supabase PostgreSQL is the planned primary database for the First
Paid Saudi Release. Use append-only migrations, property-scoped row-level
security, and database transactions/RPC functions for inventory allocation and
financial posting. The Current Prototype demo uses browser-local fixtures only.

**Testing**: Vitest for money, permission, state-transition, rate/tax snapshot,
and availability rules; Supabase local integration tests for row-level security
and transactions; Playwright at 1440px or larger for role-based operational
journeys and the Vercel demo smoke test.

**Target Platform**: Modern desktop browsers, primarily Google Chrome on
Windows front-desk PCs; Vercel serves the fixture-only collaboration demo.

**Project Type**: Browser-based desktop SaaS application with a separately
deployable static fixture demo.

**Performance Goals**: At least 95% of measured common front-desk actions
show a confirmed result within two seconds on the representative desktop
fixture dataset. New reservation, check-in, check-out, room assignment, charge
posting, and payment posting each remain within two clicks of the main
operational workspace.

**Constraints**: One selected property at a time; one fixed role per
user-property assignment; English, SAR, and Saudi VAT defaults; no production
government, bank, payment-gateway, booking-engine checkout, Night Audit,
Marketplace, or external integration in this release; no mobile acceptance
work; no copied live guest data or proprietary eZee assets.

**Scale/Scope**: Seven fixed roles; property-owned rooms, rates, taxes,
policies, companies, and travel agents; eight operational modules in the paid
release. The first release deliberately excludes a central cross-property
comparison dashboard and custom roles.

## Constitution Check

*GATE: Passed before research; re-checked after Phase 1 design.*

- [x] The release stage is named. Paid operational work is kept separate from
      the Current Prototype collaboration demo.
- [x] The plan preserves visible property context, a fixed user-property-role
      context, and property-owned configuration.
- [x] The plan defines transactional availability and append-only financial
      posting, plus confirmation, reason, and audit evidence for sensitive
      changes.
- [x] Current Prototype work stays browser-based, desktop-only, fixture-only,
      and has no live service or external connection.
- [x] First Paid Saudi Release work is English-first with configurable
      property SAR and Saudi VAT defaults; government, bank, and payment-gateway
      connections are excluded.
- [x] The plan uses eZee-informed operational familiarity without copied data,
      screens, or assets, and leaves Gulf Hero UI/UX as its own product.
- [x] Clear, accurate, professional desktop UI/UX is the first delivery
      priority; early-bird marketing is gated on the fixture-only Vercel demo
      passing documented UI/UX readiness evidence.
- [x] Validation includes desktop, functional, audit, tenant-isolation,
      concurrency, and financial-invariant tests appropriate to the stage.
- [x] The Vercel companion is fixture-only, explicitly approved before sharing,
      and smoke-tested; production deployment is out of scope.

## Delivery Phases

### Phase 0 — Direction, Fixture Safety, and Prototype Closure

**Release stage**: Current Prototype

**Objective**: Make the existing desktop product safe and clear for review,
and prepare the paid-release foundation without connecting the demo to live
data.

1. Complete the UI/UX readiness gate before lower-priority functional scope:
   each core desktop journey is clear, accurate, professional, and free of
   journey-blocking readability/layout defects and dead primary controls.
2. Close cross-module prototype polish: every visible primary control either
   completes a local fixture state or explains its unavailable boundary.
3. Maintain a fixture provenance register: verified SwissBlue property and
   room facts, approved English-only synthetic client names, and clearly
   labelled fictional transactions.
4. Add an access-only, empty training property for property-switch and denial
   tests only; it must not claim unverified hotel or room facts.
5. Define the fixed role-capability matrix and selected-property header
   behaviour in the desktop workflow contract.
6. Produce the Vercel demo configuration and smoke checklist, but deploy only
   after explicit user approval. The demo has no Supabase environment values,
   no credential, no webhook, and no retained reviewer data.

**Exit evidence**: 1440px browser review; `npm run build`; fixture provenance
review; documented operator review; 100% passing UI/UX readiness checklist;
demo safety scan; and a documented manual smoke path ready for the approved
Vercel deployment. Only after the approved deployment smoke test may this demo
support early-bird marketing.

### Phase 1 — Paid Saudi Foundation: Tenancy, Roles, Audit, and Configuration

**Release stage**: First Paid Saudi Release

**Objective**: Establish the data and permission rules that every later
operational action relies on.

1. Add Hotel Group, Property, Profile, and User-Property Assignment data with
   all seven fixed roles: Group Owner, Group Admin, Property Manager, Front
   Office Manager, Receptionist, Housekeeping Manager, and Accountant.
2. Implement server-authoritative authentication and selected-property context
   for the paid release only. Browser clients never decide their own role or
   property access.
3. Expand membership row-level security to cover permitted reads and writes,
   with a tested capability matrix for every paid-release mutation.
4. Build property-owned setup for room types, rooms, tax rules, rate plans,
   policies, companies, and travel agents. Changes must be effective-dated
   where they can affect history.
5. Add immutable audit entries, recording actor, role at time of action,
   property, timestamp, operation, target, before/after values, reason, and
   confirmation outcome.
6. Create the common money, SAR display, Saudi tax, rounding, and datetime
   policy used by every operational module.

**Exit evidence**: Cross-property and cross-role denial tests; configuration
ownership tests; immutable audit tests; no hard-coded VAT percentage without
finance review; paid-release desktop access workflow passes.

### Phase 2 — Reservations, Rates, and Availability Integrity

**Release stage**: First Paid Saudi Release

**Objective**: Make it impossible for the paid release to confirm conflicting
inventory while preserving the rate and tax facts of every confirmed stay.

1. Build rate plans, daily rates, restrictions, and effective-dated tax
   configuration scoped to the selected property.
2. Implement the authoritative availability service in the database. It must
   evaluate sellable inventory, room blocks, and confirmed reservation nights
   in one transaction.
3. Add reservation, reservation-night, room-assignment, pricing-snapshot, and
   state-transition models. Reservation confirmation and physical room
   assignment remain distinct.
4. Build the eZee-familiar desktop new-reservation, search, Stay View, and
   room-assignment journeys with improved Gulf Hero visual clarity.
5. Enforce final availability checks when a stay is confirmed, changed, or
   moved. Conflicts return a clear next action; there is no overbooking or
   waitlist override in version one.
6. Add guest, company, and travel-agent masters with property-default scope,
   duplicate warnings, privacy-minimised data, and a permissioned manual merge
   only if the feature is implemented.

**Exit evidence**: Simultaneous final-room allocation allows exactly one
confirmation; checkout-day boundary tests; rate/tax snapshots survive later
configuration edits; reservation state tests; six primary front-desk actions
are mapped to two-click paths.

### Phase 3 — Front Desk, Folios, Cashiering, and Controlled Change

**Release stage**: First Paid Saudi Release

**Objective**: Operate a stay through check-in and check-out with internally
consistent balances, without bank, payment-gateway, or government links.

1. Implement check-in and check-out state transitions, room readiness checks,
   and front-desk Today/Arrival/Departure worklists.
2. Create a folio for each relevant stay and support append-only internal
   charge, payment, adjustment, reversal, and void postings.
3. Define permitted internal payment methods and cashier-session open/close
   controls. Cashier closing is a controlled manual state; this phase must not
   execute Night Audit.
4. Require confirmation and reason for voids, posted-rate changes,
   reservation cancellations, and closed-cashiering adjustments. Never delete
   the historical posting; correct it with a linked reversal or adjustment.
5. Calculate balances, tax, and reports from immutable posting facts and
   preserved snapshots, not from editable UI totals.

**Exit evidence**: Money invariants and Saudi rounding tests; no direct edit
or delete path for posted items; cancellation/void/adjustment audit tests;
check-in and check-out role tests; ledger balances reconcile with folio
postings.

### Phase 4 — Housekeeping, Operations, Reporting, and Property Management

**Release stage**: First Paid Saudi Release

**Objective**: Complete the property operations needed to run daily work from
one desktop suite.

1. Implement controlled room-readiness states, housekeeping tasks, maintenance
   blocks, and manager workflows. Out-of-order blocks remove sellable
   inventory; clean and inspected states govern assignment readiness.
2. Keep operational and configuration updates visibly scoped to the selected
   property, with audit records for impactful changes.
3. Deliver property-scoped reports for arrivals, departures, in-house guests,
   availability/occupancy, room and housekeeping status, folio balances,
   cashier activity, revenue, and tax. Each report declares its selected
   period and data cut-off.
4. Keep AI and channel-manager surfaces in recommendation/visual mode only.
   Any later live suggestion needs explicit human confirmation and its own
   approved plan.

**Exit evidence**: Housekeeping-to-front-desk readiness consistency tests;
room-block availability regression tests; property-scoped report tests that
reconcile to source operational and folio facts; role acceptance tests.

### Phase 5 — Pilot Readiness and Gulf-Wide Collaboration Review

**Release stage**: First Paid Saudi Release plus Current Prototype companion

**Objective**: Validate that the paid-release candidate is safe and usable,
then share only the separate fixture demo for guided reviewer feedback.

1. Run an experienced-operator review against a documented eZee workflow and
   terminology comparison for each core journey; do not copy screens or data.
2. Validate the two-second and two-click targets on a representative Windows
   Chrome desktop environment.
3. Complete tenant isolation, role, availability-concurrency, money,
   audit, report-reconciliation, and privacy regression suites.
4. Package a fixture-only Vercel demo from the Current Prototype. It must be
   visibly labelled non-production and use no live database, credentials,
   integration, or reviewer-retained data.
5. After explicit user approval, deploy the demo, run the documented smoke
   journey in a modern desktop browser, and share the link only after it
   passes. This is not production launch approval.

**Exit evidence**: Signed validation record, passing regression gates, passed
desktop demo smoke test, and explicit user approval for any Vercel sharing.

## Deliberately Deferred After These Phases

- Arabic and full RTL support
- Android and iOS applications
- Central cross-property comparison dashboard and custom roles
- Real public booking checkout, Marketplace, or payment gateways
- ZATCA, Tourism Observatory Platform, Shamoos, banks, and other external
  connections
- Night Audit execution, offline/PWA workflows, and real channel-manager or
  AI action automation

## Project Structure

### Documentation (this feature)

```text
specs/002-saudi-hotel-group-release/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── desktop-operational-contract.md
│   └── demo-deployment-contract.md
└── tasks.md                 # generated next by /speckit-tasks
```

### Source Code (repository root)

```text
src/
├── App.jsx                  # current desktop shell and fixture entry
├── operationalViews.jsx     # current prototype workspaces
├── pmsTheme.js
├── styles.css
└── lib/
    └── supabase.js          # optional client; no prototype connection

supabase/
├── migrations/
└── seed.sql

tests/                       # introduced for paid-release domain and E2E tests
├── unit/
├── integration/
└── e2e/
```

**Structure Decision**: Retain the current React/Vite/Ant Design desktop UI as
the Current Prototype. Build the paid-release domain, data-access, and tests
as typed modules alongside it, then migrate individual workspaces only after
their database rules and tests exist. This avoids an unapproved rewrite to
Next.js while making Supabase the planned primary data platform for the paid
release.

## Complexity Tracking

No constitution violation is required. The feature is deliberately split into
a fixture-only Current Prototype demo and a later First Paid Saudi Release
operational track to protect live hotel operations and data.
