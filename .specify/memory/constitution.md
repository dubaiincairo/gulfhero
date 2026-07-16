<!--
Sync Impact Report
- Version change: 2.0.0 → 2.1.0
- Modified principles: I. Mission, Market, and Product Promise → I. Mission,
  Market, Commercial Demonstration, and Product Promise; II. eZee-Informed
  Operational Familiarity and UX Leadership → II. UI/UX Leadership and
  eZee-Informed Operational Familiarity; VI. Desktop Performance and Saudi
  Launch Readiness; VII. Release-Stage Boundaries; VIII. Planned Delivery and
  Evidence
- Added sections: UI/UX and Early-Bird Readiness Gate
- Removed sections: none
- Templates requiring updates: ✅ .specify/templates/plan-template.md; ✅
  .specify/templates/spec-template.md; ✅ .specify/templates/tasks-template.md
- Runtime guidance updated: ✅ CLAUDE.md; ✅ README.md; ✅ PMS_SPRINT_BOARD.md;
  ✅ specs/002-saudi-hotel-group-release/
- Follow-up TODOs: none
-->

# Gulf Hero PMS Constitution

## Product Direction

Gulf Hero will become the Gulf region's most affordable, beautiful, easy-to-use,
and professional PMS for hotel groups. It is built from ten years of Saudi
hospitality experience and practical learning from eZee Absolute, eZee Centrix,
and eZee Optimus. The commercial target is a SaaS subscription of approximately
SAR 1,000 per property per year.

The first paid market is Saudi Arabia. The launch experience is English,
browser-based, and desktop-first; SAR and Saudi VAT are the financial defaults.
Regional cloud hosting is acceptable only when property data isolation and
security are strong. Arabic and full RTL support are the first post-launch
expansion, followed by further regional, mobile, and integration work.

Gulf Hero MUST also be deployable through Vercel as a non-production,
fixture-only collaboration demo so colleagues and leads across the Gulf can try
the product in a browser. A demo deployment MUST NOT expose live guest data,
production credentials, or live operational integrations.

## UI/UX and Early-Bird Readiness Gate

UI/UX clarity, accuracy, and professional desktop quality are the first
delivery priority. Gulf Hero MAY market a discounted early-bird subscription to
potential clients while development continues only after the Current Prototype
has passed this gate and is online through an explicitly approved Vercel demo.
This commercial offer does not authorise in-product billing, checkout, payment
collection, real customer operations, or production deployment.

The founder-defined “100% clear, accurate, and professional” gate means all
core prototype journeys have complete desktop surfaces, plain operational
labels, no readability or layout defect that impedes a journey, and no dead
primary control. It requires a 1440px-or-larger browser review, a passing build,
a documented operator review, fixture-only data, and a passing Vercel smoke
test. Any material UI/UX, source-fidelity, accuracy, or demo-safety failure
blocks early-bird promotion until corrected and revalidated.

## Core Principles

### I. Mission, Market, Commercial Demonstration, and Product Promise

Gulf Hero MUST serve hotel groups before other customer segments. It MUST make
daily hospitality work easier than legacy PMS software through modern, clear,
and fast UI/UX while keeping a complete hospitality-management suite in one
product. Product decisions MUST support affordability, professional quality,
and the ambition to become the first-ranked PMS in the Gulf region. The first
commercial demonstration is an early-bird offer supported by a polished,
fixture-only Vercel experience—not by an unfinished or operationally live PMS.

### II. UI/UX Leadership and eZee-Informed Operational Familiarity

eZee Absolute, Centrix, and Optimus are the primary references for feature
coverage, workflow logic, operational actions, and familiar desktop layout.
Gulf Hero MUST prioritise clear, accurate, professional, globally competitive
desktop UI/UX before adding lower-priority functional breadth. It MUST provide
staff with familiar operational paths so experienced eZee users can adapt
quickly, while improving visual clarity, polish, and usability. Gulf Hero MUST
use its own brand, code, fixtures, and product implementation; live eZee guest
data or copied proprietary assets are never permitted.

### III. Property Isolation, Fixed Roles, and Configuration Ownership

Each property is the default operational and data boundary. A user MAY be
assigned to many properties, but each assignment MUST carry one fixed role for
that property. Initial roles are Group Owner, Group Admin, Property Manager,
Front Office Manager, Receptionist, Housekeeping Manager, and Accountant.
Custom roles are deferred.

Data and configuration MUST be isolated by property unless an authorised user
has an explicit assignment for that property. Room types, rate plans, taxes,
operating policies, companies, and travel-agent configuration belong to each
property by default. The first paid release works in one selected property at a
time; it does not require a central cross-property comparison dashboard.

### IV. First Paid Release Scope

The first paid release MUST make these core modules operational: Reservations;
Rates and Availability; Guest, Company, and Travel Agent Management;
Cashiering; Housekeeping; Reporting; and Configuration. Cashiering MUST support
real internal folio and accounting-style payment posting, but it MUST NOT yet
connect to government platforms, official banks, or payment gateways.

AI recommendations and channel-manager capability begin as visual or prototype
modules while the core PMS launches. When introduced as live capability, AI MAY
recommend actions but MUST NOT autonomously change rates, availability,
reservations, or financial records. A human with the appropriate property role
MUST approve every operational change.

### V. Operational Integrity, Auditability, and Controlled Change

Financial and cashiering accuracy, rates and availability accuracy, and
overbooking prevention are non-negotiable. Every important operational or
financial change MUST record the actor, property, timestamp, and before/after
change details. Voiding a charge, changing a posted rate, cancelling a
reservation, or editing a closed cashiering record MUST require confirmation,
a reason, and an audit entry.

### VI. Desktop Performance and Saudi Launch Readiness

Gulf Hero MUST support all modern desktop browsers, with Google Chrome on
Windows front-desk PCs as the primary environment. Normal screens and common
actions MUST feel immediate, targeting a response under two seconds on a
standard front-desk PC with reliable hotel internet. Core front-desk actions—
new reservation, check-in, check-out, room assignment, charge posting, and
payment—MUST be reachable within two clicks of the main operational workspace.
Reliable online operation is acceptable for the first release; offline operation
is deferred.

Before an early-bird offer is promoted, the Current Prototype MUST meet the
UI/UX and Early-Bird Readiness Gate. A polished but unclear, incomplete, or
dead-control experience is not commercially ready.

### VII. Release-Stage Boundaries

The current delivery is a browser-based, desktop-only local prototype. It MUST
use local fixtures and MUST NOT add live authentication, billing, integrations,
payments, checkout, Night Audit execution, government connections, or external
connections. Mobile layouts, native desktop wrappers, Android, and iOS are out
of scope for this prototype.

Any plan MUST name its release stage: Current Prototype, First Paid Saudi
Release, or Post-Launch Expansion. A scope permitted in a later stage MUST NOT
be implemented in an earlier stage without an explicit constitution amendment
or user approval.

Current Prototype work MAY be deployed through Vercel as a non-production demo
when explicitly approved by the user. Such deployments MUST retain the local
fixture boundary, remain separate from any future production environment, and
pass the UI/UX and Early-Bird Readiness Gate before supporting early-bird
promotion.

### VIII. Planned Delivery and Evidence

Work MUST be planned as independently reviewable operational journeys. Each
journey MUST name its release stage, target property and role context, source
basis, acceptance criteria, scope boundary, and dependencies. Prototype waves
MUST be browser-checked at 1440px or a larger desktop viewport, exercise their
changed primary controls, and pass `npm run build` before completion. UI/UX work
MUST resolve clarity, accuracy, professional finish, and primary-control gaps
before lower-priority scope. Only intended files may be committed. Vercel demo
deployments require explicit user approval and a post-deployment smoke test;
early-bird promotion also requires the documented readiness gate. Production
changes require separate explicit user approval.

## Current Prototype Scope

The current prototype demonstrates SaaS-ready tenant/property context,
role-aware workflows, configurable modules, and eZee-familiar desktop
operations using verified SwissBlue Hotel Jeddah facts and explicitly approved
English-language fixtures. It is not a deployed hotel service. Live guest
personal data MUST NOT be copied into the prototype or supporting artifacts.

## Product Evolution

After the first Saudi desktop release, Arabic and full RTL support are the
first planned expansion. Android and iOS applications, ZATCA, the Tourism
Observatory Platform, Shamoos, bank or payment-gateway connections, and wider
Gulf support are later product stages and require their own approved plans.

## Governance

This constitution governs product, roadmap, specification, and implementation
work in this repository. Amendments require a documented rationale, a semantic
version increment, and a review of the plan, specification, and task templates.
A MAJOR version redefines product direction, release boundaries, or a core
principle; a MINOR version adds or materially expands governance; a PATCH
version clarifies wording without changing meaning. Every review MUST verify
release-stage fit, property isolation, role fit, operational accuracy, source
fidelity, privacy, and required validation evidence.

**Version**: 2.1.0 | **Ratified**: 2026-07-13 | **Last Amended**: 2026-07-13
