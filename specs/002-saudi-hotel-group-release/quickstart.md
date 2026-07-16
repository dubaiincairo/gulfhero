# Validation Quickstart: Saudi Hotel Group First Release

This guide validates the planned stages. It does not authorise live Supabase
configuration, a Vercel deployment, or production operations.

## Current Prototype companion

### Prerequisites

- Node.js dependencies installed
- No live Supabase environment values configured for the fixture demo
- Modern desktop browser at 1440px or wider

### Run locally

```bash
npm run dev
```

Open the local address printed by Vite. Use the seeded preview, not a real
guest account. Confirm that the product uses the lower-left Gulf Hero mark,
the Abdalla Elfouly fixture identity, approved English fixture data, and
desktop-only layouts.

### Prototype validation

1. Complete the UI/UX readiness checklist: every core journey is clear,
   accurate, professional, legible at desktop size, and free of dead primary
   controls or journey-blocking layout defects.
2. Exercise a primary action in Reservations, Rates and Availability,
   Cashiering, Housekeeping, Guests, Reports, and Booking Engine.
3. Confirm each action stays local, reaches a completed presentation state, or
   explicitly states its unavailable/no-connection boundary.
4. Check the product at 1440px or larger; inspect the changed workflow with
   Playwright when implementation changes occur.
5. Run `npm run build` and record an experienced-operator review.

Expected result: the build passes and no action requests or changes real hotel,
payment, guest, or external data. The Vercel demo cannot support early-bird
marketing until every UI/UX checklist item passes and its approved smoke test
is complete.

## First Paid Saudi Release gates

Run these only when a separately approved paid-release environment and
synthetic test dataset exist. They are not valid against the public fixture
demo.

1. **Property and role isolation**: assign one test user distinct roles in two
   properties; switch context and prove forbidden records and actions are not
   reachable in either UI or database tests.
2. **Configuration ownership**: change a rate/tax/company/travel-agent setting
   in one property; prove another property does not inherit it and historical
   confirmed/posting snapshots do not change.
3. **Availability concurrency**: issue two final confirmation attempts for the
   last eligible room-night; exactly one succeeds and the other returns a clear
   conflict result.
4. **Stay operations**: create a reservation, assign a clean room, check in,
   post an internal charge and payment, then check out under permitted roles.
5. **Cashiering integrity**: void or adjust a posting with a reason; prove the
   original posting remains, a linked reversal exists, and the audit entry has
   actor, role, property, time, before/after details, and reason.
6. **Housekeeping and blocks**: change room readiness and create an
   out-of-order block; prove assignment/readiness and availability rules stay
   consistent.
7. **Reports**: run each report in one selected property and reconcile its
   financial/operational totals to the underlying immutable records.
8. **Desktop performance**: measure the six named main-workspace actions at
   1440px or larger. At least 95% show a confirmed result under two seconds.

Expected result: property isolation, availability, financial correctness,
auditability, and desktop usability pass before any paid-release pilot is
considered.

## Approved Vercel collaboration-demo check

Only after the user explicitly authorises deployment:

1. Build the fixture demo and verify it has no live environment values or
   secrets.
2. Deploy the static fixture demo to Vercel.
3. Open the deployed link at desktop width and complete the smoke journey in
   [`contracts/demo-deployment-contract.md`](./contracts/demo-deployment-contract.md).
4. Record the result and share the link only if the smoke journey passes.

Expected result: reviewers can try Gulf Hero across the Gulf without exposure
to production services or data.
