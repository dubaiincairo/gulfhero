# Research Decisions: Saudi Hotel Group First Release

**Date**: 2026-07-13

This research resolves the planning decisions required by
[`plan.md`](./plan.md). It uses the founder-approved constitution and
specification as the source of truth; historical roadmap documents are not
used where they conflict with that direction.

## 1. Separate the paid release from the collaboration demo

**Decision**: Maintain two deliberately separate tracks. The First Paid Saudi
Release is the production-capable product. The Current Prototype companion is
a fixture-only Vercel demo for guided colleague and lead review.

**Rationale**: A collaboration link must not become a hidden production
environment or carry guest data, credentials, integrations, or paid-release
operational risk.

**Alternatives considered**: One shared environment was rejected because it
could expose real data. Deferring the demo was rejected because early Gulf
review is a stated founder requirement.

## 2. Application and data architecture

**Decision**: Retain React 19, Vite 6, and Ant Design for the existing desktop
experience. Use Supabase PostgreSQL as the planned primary database for the
First Paid Saudi Release, with property-scoped row-level security and database
transactions/RPC functions for critical operations. New paid-release domain and
data-access modules use TypeScript incrementally; there is no blanket Next.js
rewrite.

**Rationale**: The repository is a Vite/React prototype, not a Next.js project.
An incremental typed operational core protects progress and makes important
logic testable while preserving the user-reviewed desktop UI.

**Alternatives considered**: A full Next.js rewrite was rejected because it is
not a founder requirement and would delay core PMS integrity. Client-only
arrays or client-authorised mutations were rejected for paid operational data.

## 3. Tenant, property, and access boundary

**Decision**: Every operational and configuration record belongs to one Hotel
Group and one Property. A user works in one selected property at a time and
receives exactly one fixed role for that property. Group association alone
grants no property-record access; no cross-property roll-up is delivered in
the first release.

**Rationale**: Staff can hold different roles across branches, while each
branch must keep its own records and configuration isolated.

**Alternatives considered**: Group-wide implicit access and shared defaults
were rejected because they risk data leakage and configuration drift.

## 4. Fixed role contract

**Decision**: Version one has no custom roles. The baseline capability contract
is documented in `contracts/desktop-operational-contract.md`: Group Owner,
Group Admin, Property Manager, Front Office Manager, Receptionist,
Housekeeping Manager, and Accountant. All sensitive changes require explicit
confirmation and a reason; they do not require a second-person approval in
version one.

**Rationale**: Fixed permissions meet the founder requirement and enable
repeatable permission tests before role customisation is introduced.

**Alternatives considered**: Broad administrator access and custom roles were
rejected because they undermine predictable property isolation in the first
release.

## 5. Property-owned configuration and historical facts

**Decision**: Room types, rooms, rate plans, tax rules, policies, companies,
and travel agents are property-owned by default. Rates and tax rules are
effective-dated. Confirmed stays and posted folios retain rate and tax
snapshots rather than recalculating history from current settings.

**Rationale**: A later configuration change must not alter a confirmed rate,
posted charge, historical report, or audit record.

**Alternatives considered**: Unversioned global configuration and retroactive
recalculation were rejected as financially inaccurate.

## 6. Availability and reservation integrity

**Decision**: Reservation confirmation and room assignment are distinct. The
database performs a final authoritative availability check when a stay is
confirmed, changed, or moved. Reservation nights have a unique per-room,
per-night allocation guard. Out-of-order blocks remove inventory; normal room
readiness is visible separately.

**Rationale**: A UI-only check cannot prevent simultaneous final-room attempts.
No intentional overbooking or waitlist policy is part of version one.

**Alternatives considered**: Last-write-wins, manual override, and assigning a
physical room as the only confirmation method were rejected.

## 7. Saudi monetary and cashiering rules

**Decision**: Monetary values use one documented rounding policy and SAR
display by default. Tax is property-configured and effective-dated; the actual
Saudi tax default must be finance-reviewed before paid launch, not hard-coded
from a prototype assumption. Folio postings are append-only. Corrections use
linked reversals, voids, or adjustments, never edits or deletes of history.

**Rationale**: This preserves the internal accounting trail without creating
bank, payment-gateway, or government connections. Manual cashier close is
allowed; Night Audit execution is not.

**Alternatives considered**: Editable ledger rows, silent deletion, and
automatic Night Audit were rejected for integrity and scope reasons.

## 8. Audit evidence

**Decision**: Audit records are immutable and property-scoped. They capture
actor, role at time of action, property, canonical timestamp, operation,
target, before/after values, reason, and confirmation outcome. Audit views are
permissioned and redact values without an operational need to view them.

**Rationale**: Financial and operational changes must be explainable and
traceable in the selected property.

**Alternatives considered**: An editable activity feed or a record without
before/after values was rejected.

## 9. Masters, fixtures, and privacy

**Decision**: Guest, company, and travel-agent masters are property-scoped by
default and contain only the data needed for the paid release. Duplicate
warnings may guide staff, but destructive merges are manual, permissioned, and
audited. Demo fixtures use verified SwissBlue property and room facts plus only
approved English synthetic names; an empty training property proves
multi-property access without inventing a second hotel.

**Rationale**: The solution must feel realistic without copying live guest or
reference-PMS data.

**Alternatives considered**: Live data imports, copied eZee records, automatic
merges, and fabricated second-hotel facts were rejected.

## 10. Reporting and operational familiarity

**Decision**: First-release reports are selected-property and selected-period
views: arrivals, departures, in-house, availability/occupancy, room and
housekeeping status, folio balances, cashier activity, revenue, and tax. Each
declares its data cut-off. Workflow and terminology comparisons with eZee guide
operator familiarity but never copy eZee screens, assets, or records.

**Rationale**: This provides a complete property operational suite while
preserving the founder's no-central-dashboard and original-UI boundaries.

**Alternatives considered**: Generic undefined reporting, first-release group
comparisons, and pixel/content copying were rejected.

## 11. Vercel demo lifecycle

**Decision**: The demo is visibly non-production, fixture-only, and disposable.
It contains no secret, live database URL, production credential, webhook, or
retained reviewer data. It is built and shared only after explicit user
approval, a desktop smoke test, and a check that it does not fall back to live
data when unavailable.

**Rationale**: Colleagues and leads can try the product safely across the Gulf
without turning the demo into a production exposure.

**Alternatives considered**: Demo-to-live-database access, automatic sharing,
and reviewer-entered persistent data were rejected.

## 12. Measurable desktop experience and delivery order

**Decision**: Use a named click-count map and measure click-to-confirmed-state
time at 1440px or larger on a representative Chrome/Windows desktop setup.
The phased order is: safe prototype and fixture contract; tenancy/roles/audit;
rates-availability-reservations; front desk and cashiering; operations and
reports; final integrity, performance, and approved collaboration review.

**Rationale**: This puts property isolation, availability, and financial safety
ahead of breadth, while keeping common actions fast and familiar.

**Alternatives considered**: Isolated module delivery without integrity
foundations, mobile validation, and deployment before verification were
rejected.

## 13. Commercial subscription boundary

**Decision**: The approximate SAR 1,000 per-property annual subscription is a
commercial launch policy, not a billing workflow in this feature. Product
billing, checkout, and payment-gateway work need a separate approved initiative.

**Rationale**: It preserves the stated paid-release boundary.

**Alternatives considered**: Adding subscription checkout or a payment gateway
to this PMS release was rejected.

## 14. UI/UX-first early-bird gate

**Decision**: Clear, accurate, professional, globally competitive desktop
UI/UX is the first delivery priority. The early-bird offer may be marketed
during development only after the fixture-only Vercel demo passes a complete
readiness checklist: all core journeys complete, no dead primary controls,
no journey-blocking clarity/layout defects, 1440px browser review, passing
build, operator review, and an approved demo smoke test.

**Rationale**: The first online experience is a sales demonstration. It must
earn confidence before potential clients are asked to subscribe.

**Alternatives considered**: Marketing an unfinished demo or treating visual
polish as a final phase was rejected. Adding checkout or real customer data to
the demo was also rejected.
