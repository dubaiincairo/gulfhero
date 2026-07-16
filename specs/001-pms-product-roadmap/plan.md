# Implementation Plan: PMS Operational Completion Roadmap

**Branch**: `001-pms-product-roadmap` | **Date**: 2026-07-13 | **Spec**:
[spec.md](./spec.md)

## Summary

Create and maintain a journey-first delivery roadmap for the Gulf Hero desktop
PMS prototype. The roadmap turns the existing sprint board into independently
reviewable waves: Front Desk Core, Service Operations, Management Review, and
Release Readiness. It guides future local UI work without adding transactional,
external, or production behavior.

## Technical Context

**Language/Version**: JavaScript with React 19

**Primary Dependencies**: Vite 6, Ant Design 6, Lucide React, Playwright

**Storage**: Local presentation state and Markdown planning artifacts only

**Testing**: Playwright interaction/visual checks and `npm run build`

**Target Platform**: Desktop web viewport at 1440px wide or larger

**Project Type**: Single-project desktop web prototype

**Performance Goals**: Each completed surface remains usable without horizontal
layout breakage at 1440px and responds to primary local controls during review.

**Constraints**: Source-informed SwissBlue data only; no live guest data;
desktop-only; no Marketplace, integration, real payment, checkout, Night Audit
execution, external connection, production deployment, or production changes.

**Scale/Scope**: Five remaining delivery waves: Cashiering and Cash Drawer;
Housekeeping; Guest & CRM; Reports; Cross-module polish and Desktop QA.

## Constitution Check

| Gate | Status | Evidence |
| --- | --- | --- |
| Verified property truth and privacy | Pass | Uses the sprint board and source research; each UI wave must verify its own data. |
| Desktop fidelity and working controls | Pass | Each wave has local interaction and 1440px visual acceptance criteria. |
| Local-only prototype boundary | Pass | Transactional, external, and production behavior is excluded. |
| Journey-first delivery | Pass | Waves are grouped and ordered by operational journey. |
| Evidence before completion | Pass | Browser checks and `npm run build` are explicit completion gates. |

**Post-design re-check**: Pass. The research decisions, entity model, and
quickstart preserve every constitutional boundary.

## Project Structure

### Documentation (this feature)

```text
specs/001-pms-product-roadmap/
├── checklists/requirements.md
├── data-model.md
├── plan.md
├── quickstart.md
├── research.md
├── spec.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── App.jsx                 # Shell, shared fixtures, primary module routing
├── operationalViews.jsx    # Operational workspace views and local interactions
├── pmsTheme.js             # Shared visual tokens
└── styles.css              # Desktop visual fidelity and responsive constraints

PMS_SPRINT_BOARD.md         # Current completion status and run log
PMS_SITEMAP_RESEARCH.md     # Source-informed navigation and UI research
package.json                # Build and local development commands
```

**Structure Decision**: This is a single React/Vite desktop prototype. Product
roadmap artifacts live under `specs/001-pms-product-roadmap/`; future UI waves
change only the affected source, stylesheet, and sprint-board files.

## Complexity Tracking

No constitutional violations require additional complexity. The roadmap is
documentation-led and uses the existing single-project structure.
