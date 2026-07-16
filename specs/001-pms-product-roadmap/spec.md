# Feature Specification: PMS Operational Completion Roadmap

**Feature Branch**: `001-pms-product-roadmap`

**Created**: 2026-07-13

**Status**: Ready for planning

**Input**: Define a concrete product journey and delivery roadmap for the
Gulf Hero desktop PMS prototype so every remaining wave has a clear purpose,
order, scope boundary, and acceptance evidence.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Follow the Front Desk Journey (Priority: P1)

A product lead can see the coherent daily front-desk journey, from dashboard to
reservation/stay/room context through cashiering and cash drawer closeout, and
identify the one unfinished wave that blocks a credible demonstration.

**Why this priority**: Cashiering and Cash Drawer are the next incomplete parts
of the core daily operational journey and are the biggest gap in a front-desk
demo.

**Independent Test**: A reviewer can open the roadmap and identify the journey
order, the Cashiering wave, its prototype-only boundary, and its completion
evidence without reading the codebase.

**Acceptance Scenarios**:

1. **Given** the current prototype completion board, **When** a reviewer reads
   the roadmap, **Then** the front-desk journey identifies Cashiering and Cash
   Drawer as the next implementation wave.
2. **Given** a Cashiering wave is proposed, **When** its scope is reviewed,
   **Then** it explicitly excludes real payments, live cash operations, and
   production deployment.

---

### User Story 2 - Follow Service Operations (Priority: P2)

A product lead can see how Housekeeping and Guest & CRM complete the service
operations journey after the front desk core is credible.

**Why this priority**: These two workspaces make the prototype feel like a
connected property operation while remaining independent local desktop surfaces.

**Independent Test**: A reviewer can identify the order, user outcome, source
research requirement, and QA gate for Housekeeping and Guest & CRM.

**Acceptance Scenarios**:

1. **Given** the front-desk journey is accepted, **When** service operations are
   planned, **Then** Housekeeping is delivered before Guest & CRM.
2. **Given** either workspace is completed, **When** it is reviewed, **Then**
   its primary controls have visible local outcomes and its data respects the
   verified-property and privacy rules.

---

### User Story 3 - Finish Management Review and Release Readiness (Priority: P3)

A product lead can see how Reports, cross-module polish, and desktop QA turn
the individual prototype surfaces into a review-ready release candidate.

**Why this priority**: Management visibility and cross-module consistency are
valuable only after the operational journeys are complete.

**Independent Test**: A reviewer can identify the final three waves and confirm
that the process ends with an explicit release decision rather than deployment.

**Acceptance Scenarios**:

1. **Given** operational waves are complete, **When** management review begins,
   **Then** Reports is implemented before cross-module polish and final QA.
2. **Given** final QA is complete, **When** the roadmap is reviewed, **Then** it
   requires an explicit deployment decision and does not authorize deployment.

### Edge Cases

- If a source reference does not verify a requested property or room fact, the
  relevant wave records a research dependency and does not invent the data.
- If a proposed task introduces a live payment, integration, checkout, Night
  Audit execution, or external connection, it is excluded from this prototype
  roadmap and requires a separate approved scope.
- If a primary control cannot receive a finished local outcome in its wave, the
  wave remains incomplete and the control is hidden or clearly disabled.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The roadmap MUST order remaining work as a front-desk journey,
  service-operations journey, management-review journey, and release-readiness
  journey.
- **FR-002**: The roadmap MUST name Cashiering and Cash Drawer as the next
  implementation wave.
- **FR-003**: Every wave MUST state its intended user outcome, scope boundary,
  source-research dependency, and browser/build completion evidence.
- **FR-004**: Every wave MUST preserve the desktop-only and local-only prototype
  boundaries.
- **FR-005**: Every wave that shows property or guest information MUST follow
  the verified SwissBlue data and privacy rules.
- **FR-006**: The roadmap MUST defer deployment until an explicit user decision
  after desktop QA.
- **FR-007**: The roadmap MUST make cross-module polish and desktop QA explicit
  final waves instead of treating them as implied follow-up work.

### Key Entities

- **Operational Journey**: A user-centered sequence of PMS workspaces with a
  clear start, end, and business outcome.
- **Delivery Wave**: A bounded implementation slice with priority, dependencies,
  scope limits, and acceptance evidence.
- **Scope Boundary**: A documented constraint that excludes transactional,
  external, or production behavior from the prototype.
- **Validation Evidence**: Browser interaction checks, desktop visual review,
  and build results required before a wave is complete.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A reviewer can explain the next five delivery waves and their
  dependency order in under five minutes using the roadmap artifacts.
- **SC-002**: Every remaining wave has at least one independently testable user
  outcome, one scope boundary, and one measurable completion check.
- **SC-003**: Every completed wave has browser evidence at a 1440px or larger
  desktop viewport and a passing production build command.
- **SC-004**: The final release-readiness gate contains zero knowingly dead
  primary controls and requires an explicit deployment decision.

## Assumptions

- The sprint board is the current source of truth for completed and remaining
  prototype waves.
- The current project remains a React/Vite desktop prototype, not a live PMS.
- The existing verified source research remains available for each
  source-sensitive implementation wave.
- Work will proceed one journey slice at a time unless the user explicitly
  prioritizes a different slice.
