# 02 — Vision & Differentiators

## Vision

**GulfHero is the PMS a receptionist actually enjoys using.** Every screen answers one question a hotel worker has *right now* ("who arrives today?", "which rooms can I sell tonight?", "what does room 204 owe?"), and an AI layer quietly handles the tedious parts: writing guest messages, suggesting prices, catching problems before they cost money.

One sentence pitch: *"Everything eZee Absolute does, redesigned for 2026 — with an AI copilot instead of a training manual."*

## Target market

- **Primary:** independent hotels and boutique properties, 10–150 rooms, in the Gulf, Egypt, and wider MENA — plus any small property worldwide.
- **Secondary:** small chains (2–10 properties), serviced apartments, guesthouses/hostels.
- **Price positioning:** eZee-class ($40–80/property/month base), because this segment will not pay Mews prices.

Regional edge (this is why it's called *Gulf*Hero): flawless **Arabic + English with RTL**, meal-plan rate types (RO/BB/HB/FB), VAT + municipality/tourism fee handling, hijri-date awareness on printed documents where needed, and reports formatted for local authorities. No mainstream modern PMS does this well.

## Personas (design every screen for one of these)

| Persona | Who | What they need | Success metric |
|---|---|---|---|
| **Rania — Receptionist** | Front desk, 8-hour shifts, interrupted constantly | Today's arrivals/departures, fast check-in/out, walk-in booking, take a payment, answer "do you have a room Friday?" instantly | Check-in in < 60 seconds; new booking in < 30 seconds |
| **Samir — Housekeeping supervisor** | Manages 4–8 attendants, works from a phone | Which rooms to clean first (departures→arrivals), assign tasks, mark clean/inspected, report maintenance | Zero paper; room status accurate within 5 minutes |
| **Layla — Owner/GM** | Checks in from her phone between meetings | Occupancy, ADR, RevPAR, today's revenue, anomalies ("3 no-shows last night"), approve rate changes | One-glance daily health; asks questions in plain language |
| **Yusuf — Night auditor / accountant** | Runs end-of-day, reconciles cash | Clean night audit, cashier/shift reports, tax-ready invoices, city ledger | Night audit < 10 minutes with zero surprises |
| **The Guest** | Books, stays, pays | Fast booking on their phone, online check-in, messages answered in minutes, clear folio | Direct booking conversion; response time |

## The three promises (and what they mean concretely)

### 1. Better UI/UX than eZee
- **Task-first navigation:** home screen = live tape chart + "Today" panel (arrivals, departures, in-house, unassigned rooms). Not a menu tree.
- **≤ 2 clicks** for the 10 most frequent actions (check-in, check-out, new booking, assign room, post charge, take payment, change room status, extend stay, print invoice, send message).
- **Command palette (⌘K):** type "check in 204" or a guest name from anywhere.
- **Modern visual language:** shadcn/ui-based design system, clear color semantics (status colors used consistently everywhere), dark mode, RTL-perfect.
- **Fully responsive PWA** — the same app works on the front-desk PC and the housekeeper's phone; installable, with offline read cache for the tape chart.
- **Zero-training goal:** every screen has an empty state that teaches, and the AI copilot answers "how do I…?" by *doing it*.

### 2. Smarter (AI-native, not AI-bolted-on)
- **Front-desk copilot:** chat/command box that executes real actions with confirmation ("move Mr. Ahmed to a sea-view room tomorrow", "why is room 12 blocked?").
- **Dynamic pricing suggestions:** nightly rate recommendations from occupancy pace, day-of-week, events, and lead time — one click to apply, with explanation. (Suggest-first; auto-pilot mode is opt-in later.)
- **AI guest messaging:** auto-drafted replies to guest emails/WhatsApp in the guest's language; pre-arrival upsell offers picked per guest.
- **Natural-language reporting:** "compare this Ramadan's occupancy to last year" → chart + table + narrative.
- **Predictive operations:** housekeeping auto-prioritization from arrivals; no-show risk flags; overbooking/conflict alerts.
- Full specs: `docs/07-ai-features.md`.

### 3. More user-friendly for hotel staff
- **Role-shaped home screens:** receptionist sees the desk; housekeeper sees rooms to clean; GM sees the numbers. Same app, different lenses.
- **Shift-aware:** cashier sessions per shift, handover notes, "what happened while I was away" digest.
- **Forgiving:** undo where safe, confirmations where not, and an audit log for everything — staff shouldn't fear the software.
- **Bilingual UI** (English/Arabic) switchable per user, not per property.

## Scope guardrails (what GulfHero is NOT, initially)

- **Not a channel manager built from scratch.** Direct OTA certifications (Booking.com, Expedia) take months of partner approval. Strategy: ship the booking engine first; integrate a channel-manager aggregator API (e.g., a SiteMinder/ChannelManager-style partner or open APIs) in Phase 3; direct certifications only after real properties are live. Never fake this — overbooking is the one unforgivable PMS sin.
- **Not a full restaurant POS** in v1. A "POS-lite" (post charges from named outlets to folios) covers most small properties; full POS is a later module, mirroring eZee Optimus.
- **Not enterprise.** No interfaces to door locks, PBX, or key cards in v1 (design the events so integrations can attach later).
- **Single-property first**, with `property_id` on everything so multi-property is a Phase 5 unlock, not a rewrite.

## Success criteria for v1 (definition of "launchable")

1. A real 20–50 room hotel can run a full day on GulfHero: bookings, check-ins, charges, payments, housekeeping, night audit, invoices.
2. Direct bookings flow from the hotel's booking-engine page into the tape chart with payment collected.
3. The GM gets a daily AI digest and can ask questions in plain language.
4. Staff onboarding takes < 1 hour per role.
5. Runs entirely on managed infra (Vercel + Supabase) at < $100/month for a single property.
