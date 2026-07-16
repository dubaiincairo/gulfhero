# Feature Specification: Saudi Hotel Group First Release

**Feature Branch**: `002-saudi-hotel-group-release`

**Created**: 2026-07-13

**Status**: Ready for planning

**Release Stage**: `First Paid Saudi Release`

**Input**: Define the first paid Gulf Hero SaaS release for Saudi hotel groups:
an affordable, browser-based, English-first desktop PMS with fixed
per-property roles, fast core operations, strong financial and availability
integrity, a clear and professional UI/UX priority, and a safe Vercel
collaboration demo that can support early-bird marketing only after its
readiness gate passes.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Work Securely in an Assigned Property (Priority: P1)

As a hotel-group employee, I can select one of my assigned properties and work
with my fixed role for that property, so I see only the operations and
configuration I am authorised to use.

**Why this priority**: Hotel groups need many employees to work across many
branches without exposing one property's data or configuration to another.

**Independent Test**: Assign a user different fixed roles in two properties,
switch the selected property, and confirm that the visible operational and
configuration context follows the selected property and role.

**Acceptance Scenarios**:

1. **Given** an employee has an assignment to two properties, **When** they
   switch property, **Then** they work in one selected property at a time with
   the role assigned for that property.
2. **Given** an employee lacks an assignment to a property, **When** they try
   to access it, **Then** its operational records and configuration are not
   available to them.
3. **Given** a property manager updates a room, rate, tax, company, or travel
   agent setting, **When** another property is selected, **Then** that setting
   is not treated as a shared default.

---

### User Story 2 - Run Daily Front-Desk Operations Quickly and Accurately (Priority: P1)

As a Front Office Manager or Receptionist, I can manage reservations, rates and
availability, guests, companies, travel agents, rooms, and cashiering from a
familiar desktop operational workspace, so I can serve guests quickly without
creating availability or financial errors.

**Why this priority**: The core value is a professional, easy-to-use hospitality
suite that feels familiar to experienced eZee users while being clearer and
faster in daily work.

**Independent Test**: Complete a reservation, room assignment, check-in or
check-out, charge posting, and payment-posting journey inside one property;
verify that the appropriate role can complete each permitted action and that
the result appears within two seconds under normal conditions.

**Acceptance Scenarios**:

1. **Given** a Receptionist is in a selected property, **When** they create or
   locate a reservation, **Then** availability, guest, company, travel-agent,
   room, and rate context is visible in the familiar operational flow.
2. **Given** a room or date is no longer available, **When** a user tries to
   confirm a conflicting stay, **Then** the system prevents the overbooking and
   explains the available next action.
3. **Given** a permitted user posts a charge or payment, **When** it succeeds,
   **Then** the relevant folio and internal accounting balance are updated and
   an audit record is created.
4. **Given** a user uses a common front-desk action, **When** they start from
   the main operational workspace, **Then** the action is reachable within two
   clicks.

---

### User Story 3 - Control Property Operations and Review Performance (Priority: P2)

As a Property Manager, Housekeeping Manager, or Accountant, I can configure my
property, operate housekeeping and cashiering workflows, and review reports,
so I can run the hotel accurately without depending on disconnected tools.

**Why this priority**: Hotel groups need each branch to manage its own rooms,
rates, operational policies, housekeeping, financial controls, and reporting
without losing the consistency of a single product.

**Independent Test**: In one selected property, change a permitted configuration
item, complete a housekeeping status workflow, and open a relevant report;
confirm the role and property boundaries are retained throughout.

**Acceptance Scenarios**:

1. **Given** a Property Manager works in a selected property, **When** they
   configure room types, rates, taxes, policies, companies, or travel agents,
   **Then** those changes belong to that property by default.
2. **Given** a Housekeeping Manager updates a room status, **When** the update
   is saved, **Then** front-desk room readiness reflects the result without a
   conflicting availability state.
3. **Given** an Accountant or permitted manager reviews a report, **When** they
   select a reporting period, **Then** the report is scoped to the selected
   property and shows auditable operational or financial information.

---

### User Story 4 - Let Colleagues Try a Safe Gulf-Wide Demo (Priority: P3)

As a Gulf Hero product lead, I can share a Vercel-hosted collaboration demo
with colleagues and leads across the Gulf, so they can try the desktop product
without accessing real hotel operations or guest data.

**Why this priority**: Early hands-on feedback validates the product's ease of
use and professional quality before a paid production release.

**Independent Test**: Open the Vercel demo from a modern desktop browser,
complete the published smoke-test journey, and confirm all displayed records
are fixtures with no live operational integration.

**Acceptance Scenarios**:

1. **Given** a colleague receives the approved demo link, **When** they open it
   in a modern desktop browser, **Then** they can try the documented fixture
   journey without installation.
2. **Given** the demo is being reviewed, **When** a user views guests, folios,
   rates, or reports, **Then** the data is clearly fixture data and is separate
   from production.
3. **Given** a demo deployment is updated, **When** it is published, **Then** a
   smoke test confirms that the core desktop journey still works before it is
   shared.

### Edge Cases

- A user has different roles in different properties; switching property must
  immediately apply the correct role context rather than combining permissions.
- A user has no property assignment; the product must give a clear access state
  without exposing property records.
- Two users attempt incompatible availability actions; the final confirmed
  state must prevent an overbooking and make the outcome clear.
- A user attempts to void, cancel, change a posted rate, or edit closed
  cashiering data; the product must require confirmation, a reason, and audit
  evidence before accepting the change.
- A Vercel demo is unavailable or a smoke test fails; it must not be presented
  as a production service or expose a fallback with real data.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The product MUST target hotel groups and charge the planned SaaS
  subscription per property, per year.
- **FR-002**: The product MUST allow a user to have assignments to many
  properties while applying one fixed role to each assignment.
- **FR-003**: The first-release fixed roles MUST be Group Owner, Group Admin,
  Property Manager, Front Office Manager, Receptionist, Housekeeping Manager,
  and Accountant.
- **FR-004**: The product MUST operate in one selected property at a time and
  MUST isolate unassigned property data and configuration.
- **FR-005**: The first paid release MUST include Reservations; Rates and
  Availability; Guest, Company, and Travel Agent Management; Cashiering;
  Housekeeping; Reporting; and Configuration.
- **FR-006**: The product MUST prevent confirmed-stay conflicts that would
  cause an overbooking and MUST preserve accurate rates and availability.
- **FR-007**: The product MUST support internal folio, charge, and payment
  posting without a government, bank, or payment-gateway connection in this
  release.
- **FR-008**: Important operational and financial changes MUST record the
  actor, property, timestamp, and before/after change details.
- **FR-009**: Charge voids, posted-rate changes, reservation cancellations, and
  closed-cashiering edits MUST require confirmation and a stated reason.
- **FR-010**: The first release MUST be English-first, browser-based,
  desktop-first, online-first, and use SAR and Saudi VAT defaults that a
  property can configure.
- **FR-011**: Common front-desk actions—new reservation, check-in, check-out,
  room assignment, charge posting, and payment posting—MUST be reachable in at
  most two clicks from the main operational workspace.
- **FR-012**: AI and channel-manager modules MUST be presented as prototype or
  visual capability until separately released. AI MUST only recommend actions;
  an authorised human MUST approve any operational change.
- **FR-013**: The product MUST keep eZee-informed feature and workflow
  familiarity while using Gulf Hero branding and improved UI/UX.
- **FR-014**: A Vercel-hosted collaboration demo MUST use fixtures only, be
  separate from production, and be smoke-tested before sharing.
- **FR-015**: The first release MUST NOT include ZATCA, Tourism Observatory
  Platform, Shamoos, bank, payment-gateway, or mobile-app connections.
- **FR-016**: Before the fixture-only Vercel demo supports early-bird
  subscription marketing, every core prototype journey MUST be clear, accurate,
  professional, complete, and free of dead primary controls or
  journey-blocking readability/layout defects. It MUST pass desktop browser,
  build, operator-review, and demo smoke-test evidence.

### Gulf Hero Scope Contract *(mandatory)*

- **GSC-001**: The feature is planned for the First Paid Saudi Release. Its
  Vercel collaboration demo is a Current Prototype companion and MUST remain
  fixture-only.
- **GSC-002**: The feature preserves property context, a fixed role per
  user-property assignment, and property-owned configuration.
- **GSC-003**: The Current Prototype companion uses desktop browser layouts,
  local fixtures, and no live service, payment, government, or external
  connection.
- **GSC-004**: The paid release is English-first and uses SAR and Saudi VAT
  defaults. Government, bank, and payment-gateway connections remain deferred.
- **GSC-005**: The feature protects financial accuracy, availability accuracy,
  and overbooking prevention, and defines audit behavior for sensitive changes.
- **GSC-006**: The feature uses only approved English-language fixture clients
  and verified property facts in its demo material. It never uses live guest
  personal data or proprietary reference assets.
- **GSC-007**: Any Vercel demo is fixture-only, requires a smoke test before
  sharing, and is not a production deployment.
- **GSC-008**: UI/UX clarity, accuracy, and professional quality are the first
  delivery priority. Early-bird marketing is not permitted until its documented
  Vercel readiness gate passes; it does not add checkout, billing, or live
  customer operations.

### Key Entities *(include if feature involves data)*

- **Hotel Group**: The customer organisation that owns or operates one or more
  properties.
- **Property**: An individually configured hotel branch and default data
  boundary.
- **User-Property Assignment**: A link giving one user one fixed role in one
  property; one user may have many assignments.
- **Reservation and Availability**: A stay commitment and the property room
  inventory needed to prevent overbooking.
- **Folio and Posting**: The internal record of charges, payments, and balance
  for a reservation.
- **Audit Entry**: Evidence of an important operational or financial change.
- **Collaboration Demo**: A fixture-only, non-production environment used for
  hands-on review by colleagues and leads.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user with assignments to two properties can switch between them
  and see the correct fixed role and property-specific configuration in 100% of
  role-assignment acceptance tests.
- **SC-002**: In normal hotel internet conditions, a user sees the result of
  common front-desk actions within two seconds in at least 95% of measured
  attempts on a standard Windows front-desk PC.
- **SC-003**: 100% of confirmed-stay conflict tests prevent an overbooking, and
  100% of sensitive financial or reservation-change tests create the required
  audit evidence.
- **SC-004**: A reviewer can complete the six named common front-desk actions
  within two clicks from the main operational workspace in all acceptance
  tests.
- **SC-005**: A colleague can open the approved Vercel demo in a modern desktop
  browser, complete its smoke-test journey, and encounter only fixture data.
- **SC-006**: 100% of the documented core-prototype UI/UX readiness checklist
  passes before the Vercel demo is used to market an early-bird subscription.

## Assumptions

- Initial customers are Saudi hotel groups that need employees to work across
  multiple assigned branches.
- Group Owner and Group Admin may have assignments to many properties, but the
  first release does not include a central cross-property comparison dashboard.
- Reliable online operation is acceptable for the first release; offline work
  is deferred.
- Arabic and full RTL support are the first post-launch expansion; Android and
  iOS follow later.
- ZATCA, the Tourism Observatory Platform, Shamoos, banking, and payment
  gateway connections are separate later-stage initiatives.
- Early-bird subscription marketing is handled outside the product; it never
  creates an in-product billing or checkout requirement for this feature.
