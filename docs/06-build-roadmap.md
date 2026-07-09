# 06 — Build Roadmap (the vibe-coding plan)

> The build is a sequence of **small vertical slices**, each completable in one focused AI coding session (roughly 1–3 hours of collaboration). Each step has: goal, acceptance criteria (AC), and a **ready-to-paste prompt** for Claude. Do them in order — later steps assume earlier ones. Tick the checkbox when the AC pass, in the same commit as the work.
>
> Session ritual: start by telling Claude to read `CLAUDE.md` + the step; end with lint/typecheck/tests green, seed data updated if needed, checkbox ticked, committed and pushed. Full workflow guidance: `docs/08-vibe-coding-playbook.md`.

---

## Phase 0 — Foundation (≈ 1 week of sessions)

- [ ] **0.1 Scaffold & design tokens.** Next.js (App Router, TS strict), Tailwind, shadcn/ui, lucide, ESLint/Prettier, Vitest, Playwright. Base layout with sidebar nav shell + top bar. Design tokens: status color palette (confirmed=blue, checked-in=green, dirty=amber, OOO=slate, etc. — define once, reuse everywhere), light+dark themes.
  *AC:* `npm run dev` shows themed shell; lint/typecheck/test scripts pass; one trivial Playwright test passes.
  *Prompt:* "Read CLAUDE.md and docs/04. Scaffold the Next.js app exactly per the repo layout section: Tailwind + shadcn/ui + strict TS + Vitest + Playwright. Build the dashboard shell (sidebar: Home, Reservations, Calendar, Housekeeping, Guests, Billing, Reports, Settings) with dark mode toggle and the status color tokens from docs/06 step 0.1. No features yet."

- [ ] **0.2 Supabase + auth + tenancy.** Supabase project, Auth (email/password), `property`, `app_user`, `property_member` migrations with RLS; signup flow creates property + owner membership; login/logout; invite teammate by email with role.
  *AC:* Two users in different properties cannot read each other's rows (write a test proving RLS blocks it); invited user lands with correct role.

- [ ] **0.3 Property settings & rooms.** Settings screens for property profile, room types (bilingual names), rooms, taxes. Migrations for `room_type`, `room`, `tax`.
  *AC:* Create the demo hotel via UI: 4 room types, 24 rooms, VAT 15% + city fee; all editable; validation with zod.

- [ ] **0.4 Seed script.** `supabase/seed.sql`: demo hotel, users per role, rooms, and (as later phases land) rates/guests/bookings.
  *AC:* Fresh clone → documented commands → running app with demo data in < 10 min.

- [ ] **0.5 Domain events + audit log.** `domain_events` table, `logEvent()` helper, audit timeline component (used later on reservations/folios).
  *AC:* Room edits appear in an audit view with actor + before/after.

- [ ] **0.6 i18n + RTL.** `lib/i18n/` en/ar dictionaries, locale switch per user, `dir` flips, sidebar/settings translated. From now on all new strings go through the dictionary.
  *AC:* Full settings area renders correctly in Arabic RTL.

## Phase 1 — Core PMS (≈ 3–4 weeks)

- [ ] **1.1 Rate plans & rate calendar.** `rate_plan`, `daily_rate` migrations; rate calendar grid (plans × 30 days), inline + bulk edit (range × weekdays), min-stay/stop-sell flags.
  *AC:* Set base rates for all plans for 90 days in < 2 min via bulk edit; keyboard navigable.

- [ ] **1.2 Availability engine + allocator.** SQL `available_rooms(room_type, from, to)` + `allocate_room()` function with row locks and the `unique(room_id,date)` guard; TS wrappers in `lib/availability/`.
  *AC:* Concurrency test: two simultaneous bookings for the last room — exactly one succeeds. **This is the most important test in the codebase.**

- [ ] **1.3 Reservation state machine + new booking.** `reservation`, `reservation_night` migrations; `lib/reservations/state.ts`; ≤30s booking dialog (dates → available types w/ prices → guest quick-create → confirm); reservations list with filters/search.
  *AC:* Booking creates nights + snapshot pricing + domain event; state transitions validated by unit tests; illegal transitions impossible.

- [ ] **1.4 Tape chart v1.** Rooms × 14 days grid, reservation bars (status colors), hover cards, click-drag empty cells → prefilled booking dialog, drag bar to another room (allocator-checked, re-price warning across types). Supabase Realtime refresh.
  *AC:* Two browsers see each other's changes live; drag conflicts are rejected gracefully.

- [ ] **1.5 Today panel + check-in/out (no money yet).** Arrivals/departures/in-house lists; check-in flow (assign clean room → guest details → signature canvas → done), checkout flow (flips room to dirty); GR card print view.
  *AC:* Rania scenario: walk-in booked + checked in < 90s total; checkout auto-creates a housekeeping task record.

- [ ] **1.6 Folios & charges.** `folio`, `folio_item` migrations; folio screen on reservation (charges, taxes snapshot, running balance); post extras; void with reason.
  *AC:* Money unit tests: tax inclusive/exclusive, discounts, void; balance invariant property test.

- [ ] **1.7 Payments & invoices.** Cash/bank payments; Stripe card payments (provider interface in `lib/payments/`); settle-at-checkout blocking unsettled balances; sequential invoice numbers; bilingual PDF invoice (print CSS or react-pdf); email via Resend.
  *AC:* Full happy path E2E: book → check in → charge minibar → pay card (Stripe test mode) → checkout → emailed PDF invoice with correct VAT.

- [ ] **1.8 Guests & companies.** Guest profiles w/ history + dedupe merge; company accounts + negotiated-rate link + city-ledger folios.
  *AC:* Company booking routes room charges to company folio; guest merge preserves history.

## Phase 2 — Operations (≈ 2 weeks)

- [ ] **2.1 Housekeeping board.** Room status flips, mobile-first attendant view (my rooms, ordered), supervisor assignment, checkout→dirty automation, discrepancy list.
  *AC:* Phone-width Playwright test: attendant marks 3 rooms clean; tape chart colors update live.

- [ ] **2.2 Maintenance & room blocks.** Work orders w/ photos; OOO/OOS blocks affecting availability.
  *AC:* OOO room excluded from availability for the block range; booking attempt fails cleanly.

- [ ] **2.3 Night audit.** Guided checklist (unresolved arrivals/departures, unposted charges, open cashier sessions) → post room+tax charges → roll `business_date` → write `daily_stats`.
  *AC:* Audit blocked until checklist resolved (each item deep-links); re-running is idempotent; stats snapshot matches folio postings.

- [ ] **2.4 Cashier sessions & shift reports.** Open/close with float + count; variance display; shift report print.
  *AC:* Payments recorded only inside an open session (config-toggleable); variance math correct.

- [ ] **2.5 Reports v1 + GM dashboard.** GM dashboard (occupancy/ADR/RevPAR/revenue/pickup, vs-last-year) from `daily_stats`; canned reports: arrivals/departures, in-house, police report export, tax report, production by source, 30-day forecast; CSV/PDF export.
  *AC:* Dashboard loads < 1s on seed data; report totals reconcile with folio data (test).

- [ ] **2.6 POS-lite.** Outlets (restaurant/spa/minibar) with item catalogs; post outlet charge to an in-house folio from a phone-friendly screen.
  *AC:* Restaurant posts lunch to room 204 in ≤ 3 taps; appears on folio with correct tax.

## Phase 3 — Direct revenue (≈ 2–3 weeks)

- [ ] **3.1 Booking engine.** Public `app/book/[slug]`: search → room cards (photos, bilingual) → guest form → Stripe deposit/full payment → confirmed reservation (same allocator!) → confirmation page + email. Brand settings (logo/colors/photos) in dashboard.
  *AC:* Lighthouse mobile ≥ 90; E2E: public booking appears on tape chart within seconds; double-booking impossible under race test.

- [ ] **3.2 Promo codes & policies.** Promo codes on the engine; cancellation policies shown and enforced; guest-initiated cancellation link honoring policy.
  *AC:* Non-refundable vs flexible behave per policy; fees post automatically.

- [ ] **3.3 iCal sync.** Export per room type; import from Airbnb-style feeds with conflict alarms.
  *AC:* Imported busy dates block availability; failures surface a red banner + event.

- [ ] **3.4 Channel-manager partner integration (spike → build).** Research partner APIs available to you (aggregator route); implement inventory/rate push + reservation pull behind `lib/channels/` interface.
  *AC (spike):* written decision doc in `docs/decisions/`. *AC (build):* sandbox OTA booking lands as reservation; stop-sell propagates.

- [ ] **3.5 Guest messaging hub v1.** Threads UI; outbound email (Resend) + WhatsApp (Twilio sandbox); automated journey: confirmation, pre-arrival (T-1), post-checkout w/ invoice; template editor (bilingual).
  *AC:* Journey messages fire on schedule via cron; thread shows delivery status.

## Phase 4 — The AI layer (≈ 3 weeks — specs in docs/07)

- [ ] **4.1 AI gateway + settings.** `lib/ai/` (Claude client, prompt registry, `ai_suggestion` table, cost logging, per-property toggles + kill switch).
  *AC:* Every AI call logged with tokens/cost/latency; features disable cleanly.

- [ ] **4.2 Front-desk copilot v1 (read-only).** ⌘K chat drawer answering questions via tool-use over real queries ("who's arriving Friday?", "what does 204 owe?", "occupancy next weekend?").
  *AC:* 15-question eval script answers correctly against seed data; always cites the screen where the answer lives.

- [ ] **4.3 Copilot v2 (actions).** Whitelisted tools: create booking, move room, extend stay, post charge, set HK status — each returns a **preview card the human confirms**; all actions attributed `via copilot` in audit.
  *AC:* "Extend Mr. Ahmed one night and add a late checkout" → two preview cards → confirm → done; destructive ops always confirm; permission checks identical to UI paths.

- [ ] **4.4 AI message drafting.** Inbound guest messages get suggested replies (guest's language, grounded in reservation + property facts); translate toggle; approve/edit/send. Optional auto-send for low-risk templates.
  *AC:* Arabic inquiry → correct Arabic draft w/ real availability quoted; drafts never auto-send unless enabled.

- [ ] **4.5 Dynamic pricing suggestions.** Nightly job: occupancy pace + DOW + lead time + events (property-entered) → per-date rate suggestions with explanations, shown in rate calendar; accept/dismiss (bulk); weekly digest of impact.
  *AC:* Suggestions visibly reasonable on seed scenarios (high demand ⇒ raise); every suggestion has a human-readable "why"; acceptance writes `daily_rate` + audit.

- [ ] **4.6 Natural-language reports.** "Ask your data" box on Reports: Claude tool-use over `daily_stats` + whitelisted read queries → chart + table + 2-sentence narrative; saved questions.
  *AC:* 10-question eval (occupancy comparisons, revenue by source, best weekday) returns correct numbers vs SQL ground truth.

- [ ] **4.7 Daily AI digest + anomaly flags.** Morning summary to GM (WhatsApp/email): last night's KPIs, today's outlook, anomalies (no-show spike, rate gaps, negative variance), suggested actions.
  *AC:* Digest matches `daily_stats` exactly; anomaly rules unit-tested; one-tap deep links.

- [ ] **4.8 Smart housekeeping priority.** Auto-order tasks: departures-with-arrival first, then arrivals-unassigned, VIPs, stayovers; re-sorts as the day changes.
  *AC:* Priority updates live when a walk-in takes a dirty room; supervisor can pin/override.

## Phase 5 — Guest experience & scale (≈ 2–3 weeks)

- [ ] **5.1 Guest portal + online check-in.** Magic-link portal: booking view, online check-in (details, ID upload to private bucket, signature), express checkout, folio view.
  *AC:* Pre-registered guest check-in at desk < 20s; ID images signed-URL only.

- [ ] **5.2 Upsells.** Configurable offers (early check-in, late checkout, upgrade, transfer); AI picks per guest; shown in pre-arrival message + portal; accepted offers post to folio.
  *AC:* Upsell → folio charge + housekeeping/room consequences applied.

- [ ] **5.3 Review & reputation loop.** Post-stay review request; internal feedback form for unhappy guests before public review; feedback dashboard.
- [ ] **5.4 Multi-property.** Organization dashboard (cross-property KPIs), property switcher, org-level users, consolidated guest profiles (opt-in).
- [ ] **5.5 PWA + offline hardening.** Installable; tape chart + arrivals cached read-only offline; write queue with replay for HK status flips.
- [ ] **5.6 Onboarding wizard.** New-hotel setup: property → room types (AI-assisted: paste your current room list/rate sheet, Claude structures it) → rates → users → go live checklist.

## Cross-cutting definition of done (every step)

1. Migrations + RLS for any new table; regenerate DB types.
2. zod validation on new server actions; permission checks.
3. i18n strings (en+ar) for all UI; responsive at 1280px and 390px.
4. Unit tests for logic, E2E when a flow changes; `lint`, `typecheck`, `test` green.
5. Seed data extended so the feature is visible in the demo hotel.
6. `domain_events` written for meaningful mutations.
7. Checkbox ticked here; concise commit message.
