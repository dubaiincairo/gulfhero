# Gulf Hero PMS Product Journey Roadmap

## North Star

Deliver a polished, desktop-only Gulf Hero PMS prototype that lets a reviewer
experience a coherent hotel operating day without exposing live data, payments,
integrations, or production behavior.

## Journey Map

```text
Front Desk Core
Dashboard → Reservations → Stay View → Room View → Cashiering → Cash Drawer

Revenue Control
Rates & Availability → Distribution

Service Operations
Housekeeping → Guest & CRM

Management Review
Reports → Cross-module polish → Desktop QA → Explicit release decision
```

## Delivery Waves

| Wave | Journey outcome | Current state | Completion gate |
| --- | --- | --- | --- |
| 0. Spec foundation | Principles, roadmap, plan, and tasks make work traceable | Complete | Constitution and `001-pms-product-roadmap` artifacts reviewed |
| 1. Cashiering and Cash Drawer | Front desk can review folios, payments as local presentation state, drawer sessions, and a temporary create-drawer flow | Next | Source review, no real payments, finished local controls, 1440px review, build passes |
| 2. Housekeeping | Operations can review room status, maintenance blocks, and work orders | Planned | Verified room data only, finished local task states, 1440px review, build passes |
| 3. Guest & CRM | Team can review guest records, notes, and lost-and-found workflows without copying live guest data | Planned | Approved English fixtures only, local outcomes, 1440px review, build passes |
| 4. Reports | Managers can select, preview, and export presentation-only operational reports | Planned | Source-informed taxonomy, no external exports, 1440px review, build passes |
| 5. Cross-module polish | Every visible primary path feels connected and finished | Planned | No placeholder/dead primary controls, journeys reviewed end-to-end |
| 6. Desktop QA and decision | Stakeholder can judge release readiness safely | Planned | 1440px and large-desktop pass, build pass, explicit deployment decision |

## Non-Negotiable Scope Guardrails

- Desktop prototype only.
- Local presentation state only.
- Booking Engine remains a visual configuration preview that stops before
  reservation, checkout, or payment.
- No Marketplace, integrations, real payments, checkout, Night Audit execution,
  external connections, production changes, or deployment without explicit user
  approval.
- Use only verified SwissBlue Hotel Jeddah property and room data; never copy
  live guest personal data.

## Cadence for Every Wave

1. Read the sprint board and relevant source research.
2. State the user journey, source basis, exclusions, and acceptance checks.
3. Build only the scoped desktop slice.
4. Exercise primary controls in Playwright at 1440px or larger and inspect the
   changed layout.
5. Run `npm run build`, update the sprint board, then commit only intended files.
