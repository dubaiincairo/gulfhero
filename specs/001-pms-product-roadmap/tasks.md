# Tasks: PMS Operational Completion Roadmap

**Input**: [spec.md](./spec.md), [plan.md](./plan.md),
[research.md](./research.md), [data-model.md](./data-model.md), and
[quickstart.md](./quickstart.md)

**Organization**: Tasks are grouped by independently reviewable operational
journey. Each delivery task preserves the desktop-only local prototype boundary.

## Phase 1: Roadmap Foundation

**Purpose**: Keep the delivery sequence, constraints, and completion evidence
visible before new UI implementation begins.

- [X] T001 Establish prototype principles in `.specify/memory/constitution.md`
- [X] T002 [P] Create the journey-first product roadmap in `specs/001-pms-product-roadmap/roadmap.md`
- [X] T003 [P] Define source, scope, and QA decisions in `specs/001-pms-product-roadmap/research.md`
- [X] T004 Define delivery waves and evidence relationships in `specs/001-pms-product-roadmap/data-model.md`

---

## Phase 2: Foundational Completion Gates

**Purpose**: Apply the same completion contract to every remaining PMS workspace.

- [X] T005 Read the relevant module section before each wave in `PMS_SITEMAP_RESEARCH.md`
- [X] T006 Verify each wave's data against approved SwissBlue source material before editing `src/App.jsx` or `src/operationalViews.jsx`
- [X] T007 Record every completed wave and its next priority in `PMS_SPRINT_BOARD.md`
- [X] T008 Run the browser interaction and 1440px visual gate for every completed wave using `package.json` scripts and Playwright

**Checkpoint**: No implementation wave starts without source, scope, and QA
criteria.

---

## Phase 3: User Story 1 - Front Desk Core (Priority: P1) 🎯 MVP

**Goal**: Complete Cashiering and Cash Drawer so the front-desk journey has a
credible local closeout surface after reservations, stay, rooms, and rates.

**Independent Test**: A reviewer can open Cashiering, switch center/drawer/
session/report states, create a temporary drawer session, and see finished local
status responses without a real payment or cash operation.

- [X] T009 [US1] Read Cashiering and Cash Drawer source details in `PMS_SITEMAP_RESEARCH.md`
- [X] T010 [US1] Define the local-only cashiering and drawer state model in `src/operationalViews.jsx`
- [X] T011 [US1] Build source-informed cashiering center, drawer session, and report tabs in `src/operationalViews.jsx`
- [X] T012 [US1] Add the temporary Create Drawer workflow and visible local completion feedback in `src/operationalViews.jsx`
- [X] T013 [US1] Polish Cashiering density, status hierarchy, and drawer states in `src/styles.css`
- [X] T014 [US1] Verify Cashiering primary controls at 1440px, run `npm run build`, and log evidence in `PMS_SPRINT_BOARD.md`

**Checkpoint**: The front-desk core journey is demonstrable without real payments
or external connections.

---

## Phase 4: User Story 2 - Service Operations (Priority: P2)

**Goal**: Complete Housekeeping followed by Guest & CRM as local service
operations journeys.

**Independent Test**: A reviewer can finish a housekeeping task and review a
guest/CRM local workflow with visible, source-safe outcomes.

- [X] T015 [US2] Read Housekeeping and Guest source details in `PMS_SITEMAP_RESEARCH.md`
- [X] T016 [US2] Complete House Status, Maintenance Block, and Work Order/Task local flows in `src/operationalViews.jsx`
- [X] T017 [US2] Add source-informed Housekeeping visual states and 1440px polish in `src/styles.css`
- [X] T018 [US2] Complete Guest Database, Notes, and Lost and Found local workflows with approved fixture data in `src/operationalViews.jsx`
- [X] T019 [US2] Add source-safe Guest & CRM visual states and local feedback in `src/styles.css`
- [X] T020 [US2] Verify both service journeys at 1440px, run `npm run build`, and log evidence in `PMS_SPRINT_BOARD.md`

**Checkpoint**: Service operations feel connected to the front-desk journey and
contain no copied live guest data.

---

## Phase 5: User Story 3 - Management Review and Release Readiness (Priority: P3)

**Goal**: Complete Reports, then make every visible primary path consistent and
review-ready across the desktop prototype.

**Independent Test**: A reviewer can select and preview reports, then follow
each primary module path without encountering a placeholder or dead primary
control.

- [X] T021 [US3] Read report taxonomy and output details in `PMS_SITEMAP_RESEARCH.md`
- [X] T022 [US3] Complete source-informed report selection, filters, preview, and presentation-only export states in `src/operationalViews.jsx`
- [X] T023 [US3] Polish report hierarchy and desktop density in `src/styles.css`
- [ ] T024 [US3] Audit every primary module control and complete or explicitly disable unsupported local actions in `src/App.jsx` and `src/operationalViews.jsx`
- [ ] T025 [US3] Perform 1440px and large-desktop journey review, run `npm run build`, and record release-readiness evidence in `PMS_SPRINT_BOARD.md`
- [ ] T026 [US3] Request an explicit deployment decision only after all desktop QA gates are met; do not deploy from this task in `PMS_SPRINT_BOARD.md`

**Checkpoint**: The prototype is ready for stakeholder review, not automatic
deployment.

---

## Dependencies and Execution Order

1. T001–T004 establish the roadmap foundation.
2. T005–T008 apply to every wave and block completion, not implementation.
3. T009–T014 deliver the Front Desk Core MVP first.
4. T015–T020 deliver Service Operations after the front-desk closeout journey is
   credible.
5. T021–T026 deliver Management Review, polish, and final decision readiness.

## Parallel Opportunities

- T005 and T006 can be prepared alongside the next wave's UI outline, but the
  verified source result must be known before data-bearing UI is written.
- Within a planned wave, source research and desktop CSS review can be prepared
  in parallel when they do not alter the same file.
- Browser review and build validation follow the implementation work and remain
  completion gates.

## Implementation Strategy

### MVP First

Implement only Phase 3 first. Stop after T014 and review the complete Front Desk
Core journey before starting service operations.

### Incremental Delivery

After each phase, preserve the board evidence and validate the journey before
moving forward. No phase grants authority to deploy or connect the prototype to
external systems.
