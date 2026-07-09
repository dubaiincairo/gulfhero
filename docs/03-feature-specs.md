# 03 — Feature Specs (module by module)

> Functional specs for every module. Each module lists: purpose, key screens, core behaviors, and edge cases AI sessions must handle. Build order is defined in `docs/06-build-roadmap.md`; AI feature details in `docs/07-ai-features.md`.

---

## M1. Property setup & administration

**Purpose:** everything a hotel configures once.

- Property profile: name, logo, address, timezone, currency, languages, check-in/out times, tax registration IDs.
- **Room types** (e.g., Standard, Deluxe, Suite): name (EN/AR), base occupancy, max adults/children, amenities, photos, description.
- **Rooms:** number/name, floor, room type, features (sea view, connecting), status.
- **Rate plans:** per room type; meal plan (RO/BB/HB/FB), refundable vs non-refundable, cancellation policy, derived plans (e.g., "BB = RO + 25 SAR/person").
- **Taxes & fees:** VAT %, municipality fee, tourism fee/service charge; inclusive or exclusive; per rate plan.
- **Users & roles:** Owner, Manager, Front Desk, Housekeeping, Accountant, Night Auditor. Invite by email. Role = a set of permissions (see M10).
- **Policies:** cancellation policies, deposit rules, no-show fees, child age brackets.

Edge cases: room type with 0 rooms; deleting a room type with future bookings (block it); tax changes must not rewrite historical folios (taxes snapshot onto folio items at posting time).

## M2. Rates & availability (ARI)

**Purpose:** single source of truth for **A**vailability, **R**ates, **I**nventory.

- **Rate calendar screen:** grid of rate plans × dates; inline edit a cell, bulk edit (date range × days-of-week), seasonal presets.
- Price components: base rate per night, extra adult, extra child; min/max stay, closed-to-arrival/departure, stop-sell flags.
- **Availability engine (core!):** `available(room_type, date) = physical rooms − OOO/OOS blocks − confirmed/checked-in reservations`. One canonical function used by the booking engine, front desk, and (later) channel sync. Overbooking is prevented at the database level (transactional allocation with row locks), with an override permission for managers (creates a flagged overbooking record, never silent).
- AI hook: rate suggestions render directly in the rate calendar (accept/dismiss per cell or per week).

Edge cases: DST/timezone (business date comes from property timezone); reservations spanning rate changes (price per night is captured at booking); room-type reassignment.

## M3. Reservations

**Purpose:** the heart of the PMS.

- **Statuses:** `inquiry → hold(expires) → confirmed → checked_in → checked_out`, terminal: `cancelled`, `no_show`. Transitions only via the state machine (side effects: folio creation, housekeeping tasks, availability changes, guest emails).
- **New booking flow (≤30s):** pick dates → see available room types with prices → guest name/phone (or pick existing guest) → optional deposit → done. Everything else (ID, preferences, notes) can be added later.
- **Sources:** walk-in, phone, website (booking engine), OTA (via channel sync), corporate. Source is tracked for production reports and commissions.
- **Group bookings:** one master booking with N rooms, shared or split folios, rooming list import (paste from Excel).
- **Modifications:** change dates (re-price with confirmation), change room type, move room (drag on tape chart), extend stay (checks availability), early departure (recalculate), split stay across rooms.
- **Cancellation & no-show:** applies the policy (fee posts to folio), frees inventory, logs reason.
- Guest-facing: confirmation email/WhatsApp with booking summary + online check-in link (Phase 5).

Edge cases: same-day book-and-check-in; overlapping modification conflicts (optimistic locking + friendly error); holds expiring while being edited; children/extra-bed pricing; bookings in the past (backfill with permission).

## M4. Front desk & tape chart

**Purpose:** the home screen; mission control for Rania.

- **Tape chart:** rooms (grouped by type/floor) × next 14–30 days. Reservation bars colored by status; hover card with guest+balance; drag to move room (with re-price warning if room type changes); click-drag empty cells to start a booking. Live-updates via Realtime.
- **Today panel:** arrivals (with "assign room" quick action), departures (with balance due badges), in-house count, occupancy %, unassigned bookings, rooms not ready for arriving guests (housekeeping conflict warning).
- **Check-in (<60s):** verify guest → assign/confirm room (only clean rooms selectable; override with warning) → capture ID scan/photo → signature on registration card (touch/mouse) → optional deposit → done. Prints/emails GR card.
- **Check-out:** review folio → settle balance (or route to city ledger) → invoice (print/email/PDF) → room flips to dirty + housekeeping task auto-created.
- **Command palette (⌘K):** global search (guests, rooms, bookings) + actions ("new booking", "check in 204").

Edge cases: check-in before room ready; checkout with unsettled balance (block, or manager override to city ledger); midnight-crossing operations (business date ≠ calendar date until night audit).

## M5. Guests & companies (CRM-lite)

- **Guest profile:** contact, nationality, ID/passport (encrypted at rest), preferences, tags (VIP, blacklist with reason), stay history, lifetime value, notes.
- Automatic **dedupe suggestions** (same phone/email/ID) with merge tool.
- **Companies & travel agents:** negotiated rates, credit limit, city ledger account, commission %, booker contacts.
- Consent flags for marketing; GDPR-style export/delete.

## M6. Billing, folios & payments

**Purpose:** money must always balance — this module gets the most tests.

- **Folio per reservation** (plus extra folios for splits/companies). Line items: room nights (auto-posted at night audit or on the fly), extras (minibar, laundry, transfers), POS postings, taxes (computed and snapshotted per line), discounts/allowances, payments, refunds.
- **Payments:** cash, card (via Stripe or regional gateways — pluggable provider interface), bank transfer, city ledger (company credit). Deposits before arrival; pre-auth notes.
- **Corrections:** void (same day) vs adjustment (after audit) — both audited with reason.
- **Invoices:** sequential legal numbering per property, bilingual template, VAT breakdown, QR code where required (e.g., KSA ZATCA-style layout later); email as PDF.
- **Cashier sessions:** open/close per staff shift with counted-cash reconciliation and shift report.
- **City ledger:** company statements, mark invoices paid, aging view.

Invariant: `folio.balance = sum(charges) + sum(taxes) − sum(payments/credits)` — computed, never stored-and-drifted. Property tests around this.

## M7. Housekeeping & maintenance

**Purpose:** Samir's mobile-first module.

- Room statuses: `clean / dirty / inspected / out_of_service (OOS) / out_of_order (OOO)` + occupancy overlay (vacant/occupied). Checkout ⇒ dirty automatically.
- **Housekeeping board (phone-first):** my assigned rooms today, ordered by AI priority (departures that have an arrival tonight first); tap to flip status; photo notes; "DND / refused service" flags.
- Supervisor view: assign attendants (manual or auto-balance), inspection queue, discrepancy report (front-desk vs housekeeping status).
- **Maintenance work orders:** report issue (photo), assign, track to resolution; OOO blocks inventory with date range.

## M8. Night audit & business date

- Guided end-of-day checklist: pending arrivals (mark no-show or extend hold), pending departures (extend or force checkout), unposted room charges, cashier sessions closed.
- Posts room+tax charges for the night, rolls `property.business_date`, snapshots the day's KPIs into `daily_stats` (occupancy, ADR, RevPAR, revenue by category) — reports read from these snapshots so history never shifts.
- Target: < 10 minutes; every blocking item deep-links to its fix.

## M9. Reports & dashboards

**Anti-eZee principle: 6 great dashboards + natural-language queries beat 100 menu items.**

- **GM dashboard:** today + MTD occupancy/ADR/RevPAR, revenue by category, pickup (bookings made last 7 days for future dates), channel mix, comparison to last year.
- Canned essentials: arrivals/departures lists, in-house list, police/government report export, cashier/shift report, tax report, city ledger aging, production by company/channel, forecast (next 30 days occupancy).
- Every report: filter by date range, export CSV/PDF, printable.
- **NL reports (AI):** ask anything; answers grounded in `daily_stats` + live queries (spec in doc 07).

## M10. Roles, permissions & audit

- Permission matrix (capability × role), editable per property. Sensitive capabilities: rate changes, folio adjustments, overbooking override, report access, data export.
- **Audit log:** every mutation records who/when/what (before→after), searchable by entity. Surfaced as history timeline on reservations and folios.

## M11. Booking engine (direct bookings)

- Public, brandable page per property: `book.gulfhero.com/{slug}` (embeddable widget later).
- Flow: dates+guests → live availability/prices (same engine as M2) → room selection with photos → guest details → payment (deposit or full, Stripe) → confirmation page + email.
- Mobile-perfect, bilingual, < 2s loads, SEO basics. Promo codes. Abandoned-booking recovery email (AI-written) later.
- Writes a `confirmed` reservation atomically with inventory check — same transaction path as front desk.

## M12. Guest communication hub

- Unified inbox per property: email (send/receive via Resend/Postmark inbound), WhatsApp (via Twilio/Meta Cloud API) — threaded per guest/reservation.
- Automated journeys: booking confirmation → pre-arrival (online check-in link + upsells) → welcome on check-in day → mid-stay check-in message → invoice + review request post-checkout. Each template bilingual, editable, per-property toggles.
- **AI drafting** for replies and translations (doc 07). Human-approve by default.

## M13. Channel connectivity (Phase 3+, carefully)

- v1: booking engine only (above) + **iCal import/export** per room type (covers Airbnb/Vrbo basics for small properties).
- v1.5: integrate ONE aggregator/channel-manager partner API to reach major OTAs without individual certifications.
- Later: direct Booking.com/Expedia connections after partner certification.
- Non-negotiable: inventory writes go through the same transactional allocator; sync failures alarm loudly (dashboard banner + WhatsApp to manager).

## M14. Guest self-service portal (Phase 5)

- Magic-link from confirmation: view booking, **online check-in** (details + ID upload + signature), select upsells (early check-in, late checkout, airport transfer, room upgrade — AI-personalized), view folio during stay, express checkout.

## M15. Multi-property (Phase 5)

- Organization layer above properties; cross-property dashboard (Layla with 3 hotels); shared guest profiles (opt-in); per-property everything else. `property_id` discipline from Phase 0 makes this an unlock, not a rewrite.
