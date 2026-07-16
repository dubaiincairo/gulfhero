# Research: PMS Operational Completion Roadmap

## Decision 1: Sequence by operational journey, not sidebar order

**Decision**: Deliver the remaining work in this order: Cashiering and Cash
Drawer; Housekeeping; Guest & CRM; Reports; Cross-module polish and Desktop QA.

**Rationale**: The existing sprint board identifies Cashiering and Cash Drawer
as the first uncompleted wave. It completes the daily front-desk journey after
the currently available dashboard, reservations, stay, rooms, and rate surfaces.
Housekeeping and Guest & CRM then complete service operations. Reports and the
final quality waves are most credible after operational content is complete.

**Alternatives considered**:

- Deliver Reports next: rejected because it creates a management surface before
  the front-desk and service journeys are complete.
- Finish arbitrary sidebar modules in parallel: rejected because it obscures the
  user outcome and makes review evidence harder to assess.

## Decision 2: Treat source research as a per-wave prerequisite

**Decision**: Before implementing a source-sensitive screen, read the relevant
section of `PMS_SITEMAP_RESEARCH.md` and inspect the corresponding verified
reference material.

**Rationale**: The prototype must use verified SwissBlue data and preserve the
eZee/iPMS desktop visual language without copying live guest personal data.

**Alternatives considered**:

- Reuse generic hotel fixtures across all waves: rejected because it weakens
  visual and data fidelity.
- Add external connections to fill missing facts: rejected by prototype scope.

## Decision 3: Make evidence a hard completion gate

**Decision**: A wave completes only after its primary controls are exercised in
the browser at 1440px or larger, a screenshot is reviewed after layout changes,
and `npm run build` passes.

**Rationale**: The product goal is a polished desktop demonstration; code-only
validation cannot reveal dead controls, clipping, or density problems.

**Alternatives considered**:

- Mark a wave complete after static code review: rejected because visual
  fidelity is an explicit objective.
- Deploy after each wave: rejected because deployment needs a separate explicit
  user decision.
