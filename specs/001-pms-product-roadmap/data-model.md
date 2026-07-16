# Delivery Model: PMS Operational Completion Roadmap

## Operational Journey

Represents an end-to-end reviewer story rather than a single navigation item.

| Field | Description |
| --- | --- |
| Name | Front Desk Core, Service Operations, Management Review, or Release Readiness |
| Outcome | The user value demonstrated by the journey |
| Entry Surface | The first existing PMS workspace used in the journey |
| Exit Condition | The reviewable state that proves the journey is complete |

## Delivery Wave

Represents a bounded implementation slice within an operational journey.

| Field | Description |
| --- | --- |
| Name | The workspace or finalization wave being delivered |
| Priority | Delivery order within the roadmap |
| User Outcome | The local desktop workflow made reviewable |
| Source Basis | Required research and verified data inputs |
| Scope Boundary | Explicitly excluded transactional, external, and production behavior |
| Completion Evidence | Browser interactions, visual review, build result, and board update |

## Validation Evidence

Records the proof required before a delivery wave is marked complete.

| Field | Description |
| --- | --- |
| Viewport Review | Desktop review at 1440px or larger |
| Interaction Check | Primary control outcomes exercised locally |
| Build Result | `npm run build` outcome |
| Board Entry | Completed item and concise run-log entry |

## Relationships

- An **Operational Journey** contains one or more **Delivery Waves**.
- A **Delivery Wave** requires one or more **Validation Evidence** items.
- A **Delivery Wave** cannot complete if its **Scope Boundary** or source basis
  has not been satisfied.
