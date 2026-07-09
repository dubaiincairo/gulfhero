# 10 — Technical Execution Plan (exact steps)

> The engineering companion to `docs/06-build-roadmap.md`. For every roadmap step: the exact migrations, files, functions, components, and tests to produce. An AI session should be able to execute a step from this doc + the specs (03/05/07/09) without inventing structure. Paths follow the repo layout in `docs/04`.
>
> Migration numbering is reserved here so parallel sessions never collide. If reality forces a deviation, update this doc in the same commit.

---

## Phase 0 — Foundation

### 0.1 Scaffold & design tokens
**Commands:** `npx create-next-app@latest . --ts --tailwind --app --eslint`, `npx shadcn@latest init`, add shadcn components as needed (`button card dialog input select table tabs badge dropdown-menu sheet toast skeleton command popover calendar form`), `npm i lucide-react zod`, `npm i -D vitest @vitejs/plugin-react playwright @playwright/test prettier`.
**Files:**
- `app/layout.tsx` — html lang/dir wiring, theme provider, toaster
- `app/(dashboard)/layout.tsx` — sidebar + topbar shell (S-global in doc 09)
- `components/layout/sidebar.tsx`, `components/layout/topbar.tsx`
- `lib/design/status-colors.ts` — single source for status→color tokens (reservation statuses, HK statuses, alerts); Tailwind theme extension referencing CSS variables for light/dark
- `vitest.config.ts`, `playwright.config.ts`, `e2e/smoke.spec.ts` (loads shell)
- `package.json` scripts: `dev build lint typecheck test test:e2e`
**Done when:** AC of 06/0.1 + `status-colors.ts` is imported by a demo legend component on the empty home page.

### 0.2 Supabase + auth + tenancy
**Setup:** create Supabase projects (dev), `supabase init`, link; `.env.local` keys; `npm i @supabase/supabase-js @supabase/ssr`.
**Migration `0001_tenancy.sql`:** `property`, `app_user` (FK auth.users), `property_member`; enum `member_role`; helper `fn is_member(property_id)` + `fn my_role(property_id)` (SECURITY DEFINER, used by all later RLS); RLS: property readable/writable by members (role-gated for update); trigger to auto-create `app_user` row on auth signup.
**Files:**
- `lib/supabase/server.ts`, `lib/supabase/client.ts`, `lib/supabase/middleware.ts` (session refresh)
- `middleware.ts` — auth gate for `(dashboard)`, locale cookie
- `app/(auth)/login/page.tsx`, `signup/page.tsx` (+ create-property step), `invite/[token]/page.tsx`; `app/(auth)/actions.ts` (zod: signIn, signUp+createProperty, acceptInvite)
- `app/(dashboard)/settings/users/page.tsx` + `actions.ts` (inviteMember → Supabase admin invite w/ token row, changeRole, deactivate)
- `lib/auth/permissions.ts` — `PERMISSIONS` matrix (capability → roles), `can(user, property, capability)`; used by every later action
- `lib/database.types.ts` — `supabase gen types typescript` (add npm script `db:types`)
**Tests:** `lib/auth/permissions.test.ts`; RLS integration test (two users/two properties; cross-read must return 0 rows) in `supabase/tests/rls.test.ts` run against local Supabase.

### 0.3 Property settings & rooms
**Migration `0002_rooms.sql`:** `room_type`, `room`, `tax` per doc 05 (+ enums `hk_status`, `room_condition`, `tax_kind`); RLS member-scoped; unique `(property_id, number)` on room.
**Files:** `app/(dashboard)/settings/{property,room-types,rooms,taxes}/page.tsx` + co-located `actions.ts` (zod CRUD, `can()` checks); `components/settings/` form pieces; photo upload to Supabase Storage bucket `room-photos` (public-read) via `lib/storage.ts`; bulk room creation ("101–110") parser + preview.
**Tests:** bulk-range parser unit test; zod schema tests.

### 0.4 Seed script
**Files:** `supabase/seed.sql` — GulfHero Demo Hotel (Riyadh tz, SAR): 4 room types (Standard/Deluxe/Suite/Family), 24 rooms across 3 floors, VAT 15% + city fee 5 SAR/night, users owner/frontdesk/housekeeping (password via Supabase seed users), README section "Local setup" (supabase start → db reset → dev). Extend this file in every later step (marked below with 🌱).

### 0.5 Domain events + audit log
**Migration `0003_events.sql`:** `domain_events` per doc 05; append-only (revoke UPDATE/DELETE); index `(property_id, entity_type, entity_id, id desc)`.
**Files:** `lib/events.ts` — `logEvent({propertyId, type, entity, payload, actor})` called inside server actions (same transaction where critical via RPC); `components/history-timeline.tsx`; wire room edits (0.3 actions) to emit events.
**Tests:** event emitted on room update (integration).

### 0.6 i18n + RTL
**Files:** `lib/i18n/en.ts`, `lib/i18n/ar.ts` (typed dictionary, `t()` helper reading user locale from cookie/profile), `components/locale-toggle.tsx`; `dir` attribute from locale in root layout; sweep existing screens' strings into dictionaries; Tailwind logical properties (`ms-/me-/ps-/pe-`) convention noted in CLAUDE.md.
**Tests:** dictionary key parity test (en/ar same keys — fails CI if a key is missing).

---

## Phase 1 — Core PMS

### 1.1 Rate plans & rate calendar
**Migration `0004_rates.sql`:** `rate_plan`, `daily_rate` per doc 05 (+ enum `meal_plan`); derived-plan FK; RLS.
**Files:**
- `app/(dashboard)/settings/rate-plans/page.tsx` + `actions.ts` (CRUD + derivation editor)
- `app/(dashboard)/calendar/page.tsx` — server component fetching 30-day window; `components/rate-calendar/{grid,cell,bulk-editor,availability-row}.tsx` (availability row stubbed until 1.2)
- `app/(dashboard)/calendar/actions.ts` — `setDailyRate`, `bulkSetRates({dateFrom,dateTo,weekdays,planIds,patch})` (single SQL upsert), `toggleFlags`
- `lib/rates/derive.ts` — computes derived plan prices; `lib/money/` started here: `formatCents`, `addTax`, tax calc inclusive/exclusive
**Tests:** `lib/money/*.test.ts` (the money suite starts here — exhaustive); `derive.test.ts`; bulk-update weekday expansion test. 🌱 seed 90 days of rates.

### 1.2 Availability engine + allocator ⚠️ most critical step
**Migration `0005_availability.sql`:**
- `fn available_room_types(property_id, date_from, date_to, adults, children)` → (room_type_id, available_count, min_price) — counts in-service rooms minus blocks minus `reservation_night` overlaps (blocks/nights tables exist next step; create types here, or split function creation across 0005/0006 — keep both migrations in this step's commit)
- `fn allocate_room(p_reservation uuid, p_room_type uuid, p_from date, p_to date, p_room uuid default null)` SECURITY DEFINER: `SELECT … FOR UPDATE SKIP LOCKED` over candidate rooms, insert `reservation_night` rows for every night, raise on shortfall → whole transaction rolls back. Also `fn deallocate(reservation)` and `fn move_room(reservation, new_room)` (delete+insert in one tx).
**Files:** `lib/availability/index.ts` — typed RPC wrappers `getAvailability()`, `allocateRoom()`, `moveRoom()`.
**Tests:** `supabase/tests/allocator.test.ts` — the race test: `Promise.all` of two allocations for the last room → exactly one success; overlap boundary tests (checkout day = free for next checkin); block exclusion test (after 2.2).

### 1.3 Reservation state machine + new booking
**Migration `0006_reservations.sql`:** `guest`, `reservation`, `reservation_night` per doc 05 (+ enums `reservation_status`, `booking_source`); `unique(room_id, date)`; reservation `code` generator fn (`GH-YYYY-NNNNN` sequence per property); RLS.
**Files:**
- `lib/reservations/state.ts` — `TRANSITIONS` map, `transition(reservationId, to, ctx)`: validates edge, runs side effects (confirm→allocate if room chosen + event + confirmation message enqueue [3.5]; check_in→require room+clean, folio ensure [1.6]; check_out→folio settled check [1.7], HK task [2.1]; cancel/no_show→deallocate + fee [1.6] + event). Side effects registered as handlers so later phases plug in without editing call sites.
- `lib/reservations/pricing.ts` — quote(nights × daily_rate + extras + taxes) with per-night snapshot rows
- `components/booking/new-booking-dialog.tsx` (S5 spec) + `app/(dashboard)/reservations/actions.ts` — `createBooking` (tx: reservation + nights via allocator when room fixed, or type-level count check + nightly rows w/ null room), `createHold`, `quickCreateGuest`
- `app/(dashboard)/reservations/page.tsx` (S3 list) + `components/reservations/table.tsx`, filters
- `app/(dashboard)/reservations/[id]/page.tsx` (S4 skeleton: header + Stay + History tabs)
**Tests:** `state.test.ts` — every legal/illegal edge; pricing snapshot test; createBooking integration (availability decremented). 🌱 seed 15 guests + ~20 bookings around business date.

### 1.4 Tape chart v1
**Files:** `components/tape-chart/{index,room-row,reservation-bar,drag-layer,hover-card,legend}.tsx` — CSS grid, absolute-positioned bars spanning columns; virtualized rows if >60 rooms; pointer-events drag (no heavy DnD lib); `app/(dashboard)/page.tsx` composes S2; `app/(dashboard)/actions.ts` — `moveReservationRoom` (wraps `move_room` RPC + reprice check), `resizeReservation` (extend/shorten with quote confirm payload).
**Realtime:** `lib/realtime/use-property-channel.ts` — Supabase channel per property; tape chart + Today panel subscribe; optimistic updates with rollback.
**Tests:** Playwright: drag booking to another room in one browser, assert second browser context sees it; conflict drag shows error toast.

### 1.5 Today panel + check-in/out (no money yet)
**Files:** `components/today/{panel,arrivals-list,departures-list,alerts}.tsx`; check-in dialog `components/checkin/wizard.tsx` (steps per S4; signature canvas `components/signature-pad.tsx` → PNG to private bucket `guest-docs`; ID upload same bucket, signed URLs); `checkIn`/`checkOut` server actions calling `transition()`; GR card print route `app/(dashboard)/reservations/[id]/gr-card/page.tsx` (print CSS).
**Tests:** Playwright: walk-in → book&check-in ≤ 90s script; checkout creates HK-task row (table stubbed if 2.1 not yet — create `housekeeping_task` in migration `0007_hk_stub.sql` now, board comes in 2.1).

### 1.6 Folios & charges
**Migration `0008_folios.sql`:** `folio`, `folio_item` per doc 05 (+ enums); trigger: folio_item immutable when `business_date < property.business_date` except adjustment kinds; balance view `folio_balances`.
**Files:** `lib/billing/{post.ts,tax.ts,balance.ts}` — `postCharge()` snapshots taxes into `tax_snapshot`; `components/folio/{table,post-charge-dialog,void-dialog}.tsx` (S12 partial); folio tab wired into reservation detail; state-machine hooks: confirm→create folio, cancel/no_show→post fee from policy.
**Tests:** money property tests (random charge sets: balance invariant holds), inclusive vs exclusive tax, void reversal, immutability trigger test.

### 1.7 Payments & invoices
**Migration `0009_payments.sql`:** payment fields on `folio_item`, `invoice_counter` per property, `integration` table.
**Files:** `lib/payments/{provider.ts,stripe.ts,cash.ts}` — `PaymentProvider` interface (`charge`, `refund`); `app/api/webhooks/stripe/route.ts` (signature verify → mark payment settled); take-payment dialog (S12); `settleAtCheckout` guard in state machine; invoice: `assignInvoiceNumber` (sequence RPC), `app/(dashboard)/reservations/[id]/invoice/page.tsx` bilingual print view + `lib/pdf/invoice.ts` (react-pdf) + Resend email `lib/email/send.ts` (`npm i resend @react-email/components`).
**Tests:** E2E happy path (roadmap AC); webhook signature test; invoice number sequence race test (two concurrent issues → distinct numbers).

### 1.8 Guests & companies
**Migration `0010_companies.sql`:** `company`, guest additions (`merged_into_guest_id`), negotiated-rate link (`company_rate_plan`), city-ledger folio kind usage.
**Files:** S9/S10 pages + actions (`app/(dashboard)/guests/…`, `companies/…`); `lib/guests/dedupe.ts` (candidate query on phone/email/ID hash) + merge action (repoint FKs in tx, mark merged); company routing in booking dialog + folio split-to-company.
**Tests:** merge preserves reservations/folios; dedupe candidates correctness; company credit-limit warning.

---

## Phase 2 — Operations

### 2.1 Housekeeping board
**Migration `0011_housekeeping.sql`:** finalize `housekeeping_task` (priority, photos, assigned_to), auto-task trigger on checkout event; room `hk_status` transitions fn.
**Files:** `app/(dashboard)/housekeeping/page.tsx` (supervisor S7) + `my/page.tsx` (attendant); `components/housekeeping/{room-card,assign-board,task-detail-sheet}.tsx`; actions: `setRoomStatus` (+undo), `assignTasks`, `autoAssign` (round-robin by open count); realtime channel reuse; discrepancy query (occupied+clean w/o stayover service etc.).
**Tests:** Playwright phone-viewport flow (AC); auto-task-on-checkout integration.

### 2.2 Maintenance & room blocks
**Migration `0012_blocks.sql`:** `room_block`, `work_order`; availability fns updated to subtract blocks (regression-run allocator tests!).
**Files:** S8 page + actions; OOO toggle from room card/tape chart context menu; block bars render on tape chart.

### 2.3 Night audit
**Migration `0013_audit_day.sql`:** `daily_stats`; `fn run_night_audit(property_id)` — validates checklist server-side, posts room+tax folio items for the night (idempotency: skip nights already posted), computes+inserts `daily_stats`, advances `business_date`, emits event; all in one transaction.
**Files:** `app/(dashboard)/night-audit/page.tsx` (S16) + `actions.ts` (`getChecklist`, `runAudit`); checklist queries in `lib/audit/checklist.ts`; deep links.
**Tests:** idempotent re-run; stats reconcile with folio sums; blocked-until-resolved logic.

### 2.4 Cashier sessions & shift reports
**Migration `0014_cashier.sql`:** `cashier_session`; payment actions require open session when property setting on.
**Files:** session open/close dialogs in S11; shift report print route; variance calc in `lib/billing/cashier.ts` (+tests).

### 2.5 Reports v1 + GM dashboard
**Files:** `npm i recharts` (respect the `dataviz` skill when styling); `lib/reports/queries.ts` — typed readers over `daily_stats` + live tables (`occupancyRange`, `productionBy`, `pickup`, `forecast`, `arrivalsList`…) — **these same functions become AI tools in 4.6**; `app/(dashboard)/reports/page.tsx` (S15 tabs) + `components/reports/{kpi-tile,charts}.tsx`; CSV util `lib/export/csv.ts`; police-report format(s) in `lib/reports/police/{sa,ae,eg}.ts` (start with one).
**Tests:** report totals vs seeded folio ground truth.

### 2.6 POS-lite
**Migration `0015_pos.sql`:** `outlet`, `outlet_item`.
**Files:** `/settings/outlets` CRUD; `app/(dashboard)/pos/page.tsx` (S13) + `postOutletCharge` action (reuses `postCharge` with outlet tag).

---

## Phase 3 — Direct revenue

### 3.1–3.2 Booking engine + promos/policies
**Migration `0016_booking_engine.sql`:** `booking_engine_settings`, `promo_code`, policy fields.
**Files:** `app/book/[slug]/{page,rooms,details,pay,confirmed}` route group (S18) — public, no auth, anon Supabase key + **rate-limited API route wrappers** (never expose write RPCs to anon: booking creation goes through `app/api/public/book/route.ts` using service role *after* zod + captcha + availability re-check inside `allocate` tx); Stripe PaymentIntent flow; confirmation email; `/settings/booking-engine` page; cancellation self-service route with policy fee logic shared from `lib/policies/`.
**Tests:** race test through public route; Lighthouse budget in CI (optional); policy fee matrix unit tests.

### 3.3 iCal sync
**Migration `0017_ical.sql`:** `ical_feed`. **Files:** export route `app/api/ical/[feedId]/route.ts` (VEVENT per booked night-range per room type); import cron `app/api/cron/ical-sync/route.ts` (parse feeds → upsert external blocks; conflicts → red-banner event); `npm i ical.js` or hand-parse (VEVENT subset).

### 3.4 Channel partner (spike → build)
**Files:** `docs/decisions/001-channel-strategy.md` (spike output: chosen partner, auth model, rate/inventory push shape, reservation pull webhook); then `lib/channels/{types.ts,partner-x.ts}` behind `ChannelAdapter` interface; inbound reservations → same `createBooking` path with `source='ota:x'`; failure alarms via events + dashboard banner.

### 3.5 Guest messaging hub v1
**Migration `0018_messaging.sql`:** `message_thread`, `message`, `message_template`.
**Files:** S14 inbox pages; `lib/messaging/{send.ts,journeys.ts}` — journey engine reads templates + triggers, enqueues on reservation events, cron `app/api/cron/journeys/route.ts` sends due messages (Resend + Twilio WhatsApp via `lib/messaging/channels/`); inbound webhooks `app/api/webhooks/{resend-inbound,twilio}/route.ts` → thread matching by email/phone → unread badge realtime.
**Tests:** journey scheduling (T-1 pre-arrival) time math; webhook parsing fixtures.

---

## Phase 4 — AI layer (specs: doc 07)

### 4.1 AI gateway
**Migration `0019_ai.sql`:** `ai_settings`, `ai_suggestion`, `ai_usage`.
**Files:** `npm i @anthropic-ai/sdk`; `lib/ai/{gateway.ts,models.ts,prompts/,tools/registry.ts}` — gateway wraps messages.create with retry/timeout/usage-logging/budget-check; `/settings/ai` page (S17). **Consult the `claude-api` skill in-session when building this.**

### 4.2–4.3 Copilot (read → actions)
**Files:** `lib/ai/tools/read.ts` — zod-defined tools delegating to existing query functions (permission-checked with caller's ctx); `lib/ai/tools/propose.ts` — proposal builders returning typed `Proposal` objects (never executing); `components/copilot/{drawer,message,proposal-card}.tsx`; `app/(dashboard)/copilot/actions.ts` — `chat()` server action streaming tool-use loop; confirm handler maps proposal→existing server action (audit `via: 'copilot'`).
**Evals:** `e2e/ai-evals/copilot.eval.ts` — 15 Q&A vs seed (4.2) + 6 action flows (4.3); run with `npm run eval` (env-gated).

### 4.4 Message drafting
**Files:** `lib/ai/drafting.ts` (intent classify: Haiku; draft: Sonnet; guest text wrapped in `<guest_message>` delimiters, tool access = read-only availability/rates only); inbox AI panel wiring; auto-send rules in `ai_settings`. **Eval:** fixture inbound messages (ar/en) → drafted replies assert grounded facts.

### 4.5 Dynamic pricing suggestions
**Files:** `lib/pricing/features.ts` (deterministic: pace vs history, DOW baseline, lead-time, event flags from a simple `property_event` table added in `0020_pricing.sql`); `lib/ai/pricing.ts` (features → bounded suggestion + explanation, clamp in code); cron `app/api/cron/pricing/route.ts` (nightly, writes `ai_suggestion`); rate-calendar badges + review panel (S6); accept action writes `daily_rate` + audit. **Eval:** synthetic scenarios (hot Saturday, dead midweek) assert direction & bounds.

### 4.6 NL reports
**Files:** `lib/ai/tools/reports.ts` wrapping `lib/reports/queries.ts`; answer contract `{narrative, table, chartSpec}` rendered by `components/reports/ai-answer.tsx`; saved questions table in `0021_saved_questions.sql`. **Eval:** 10 questions vs SQL ground truth.

### 4.7 Daily digest & anomalies
**Files:** `lib/anomalies/rules.ts` (pure functions + tests); cron `app/api/cron/digest/route.ts` (rules → Claude narrative → WhatsApp/email per user pref); dashboard banner component for urgent anomalies.

### 4.8 Smart HK priority
**Files:** `lib/housekeeping/priority.ts` (pure scoring fn + tests); recompute on events (checkout, room-assign, walk-in); optional "explain plan" gateway call.

---

## Phase 5 — Guest experience & scale

- **5.1 Portal** — `0022_portal.sql` (portal tokens table, hashed); `app/stay/[token]/…` (S19); online check-in writes same guest-doc buckets; express checkout reuses payment provider. 
- **5.2 Upsells** — `0023_upsells.sql` (`upsell_offer`, `upsell_purchase`); AI ranking via gateway; folio posting + HK/room consequences (late checkout updates departure alerts).
- **5.3 Reviews** — post-stay journey template + internal feedback form route + feedback dashboard card.
- **5.4 Multi-property** — `0024_org.sql` (`organization` FKs live from 0.2; org dashboard route `/org`, property switcher in topbar, org-level roles in permissions matrix).
- **5.5 PWA/offline** — `manifest.ts`, service worker (serwist), read-cache tape chart/arrivals, HK write queue with replay + conflict toast.
- **5.6 Onboarding wizard** — `/onboarding` stepper; AI import (`lib/ai/import.ts`: file/photo → structured room types/rates via tool-use, human review table before commit).

---

## Standing engineering rules (every step)

1. **Migration discipline:** one numbered file per step as reserved above; never edit an applied migration; `npm run db:types` after each.
2. **Server action skeleton:** `zod.parse` → `can()` permission check → work in transaction (RPC when multi-table) → `logEvent` → revalidate/return typed result.
3. **New table checklist:** `property_id` + RLS policy + index on `(property_id, …)` + seed entry 🌱 + doc 05 update if core.
4. **AI calls** only via `lib/ai/gateway.ts`; every feature behind its `ai_settings` toggle.
5. **Definition of done** = roadmap step AC + cross-cutting list in doc 06 + this doc's file inventory actually exists.
