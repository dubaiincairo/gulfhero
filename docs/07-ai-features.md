# 07 — AI Features Specification

> Detailed specs for GulfHero's AI layer — the core differentiator vs eZee Absolute. Everything here is built on the **Anthropic Claude API** with tool-use. Design stance: **AI suggests, humans confirm, deterministic code executes and records.**

## Platform rules (apply to every AI feature)

1. **One gateway.** All calls go through `lib/ai/gateway.ts`: model selection from env (default `claude-sonnet-5` for interactive, `claude-haiku-4-5-20251001` for high-volume drafting/classification), retries, timeouts, token+cost logging to `ai_usage` rows, per-property monthly budget caps.
2. **Grounding over knowledge.** Prompts always inject real data (reservation, rates, `daily_stats`) and instruct the model to answer only from it. The copilot and NL-reports use **tool-use against whitelisted read functions** — the model never sees raw SQL access.
3. **Permissions parity.** AI tools run as the requesting user; a receptionist's copilot cannot do what the receptionist can't. Property-level feature toggles + global kill switch (`ai_settings` per property).
4. **Attribution & audit.** Every AI-initiated mutation is recorded `actor = user, via = copilot|suggestion` in `domain_events`. `ai_suggestion` rows track accepted/dismissed for measurable ROI.
5. **Language.** Detect guest language; reply in it (Arabic/English at minimum). Staff-facing AI follows the user's locale.
6. **Injection defense.** Guest-authored text (messages, notes) is untrusted: wrap in delimiters, instruct the model to treat it as data, never allow it to trigger tools without human confirmation, strip/limit tool access in message-drafting contexts.
7. **Evals in-repo.** `e2e/ai-evals/` holds question→expected-answer sets run against seed data; CI-runnable with a budget flag. A feature ships when its eval passes ≥ target accuracy.

---

## F1. Front-desk copilot

**What:** a ⌘K chat drawer available on every dashboard screen. Rania types (or speaks, later) what she wants; the copilot answers from live data or proposes actions as confirmable preview cards.

**v1 — read-only Q&A.** Tools (all read-only): `search_reservations`, `get_reservation`, `get_availability`, `get_rates`, `get_folio`, `get_room_status`, `get_daily_stats`, `search_guests`. Examples: "do we have a twin room Thu–Sat?", "what does room 204 owe?", "which VIPs arrive this week?". Answers include a deep link to the relevant screen.

**v2 — actions with confirmation.** Additional tools returning *proposals*, not effects: `propose_booking`, `propose_move_room`, `propose_extend_stay`, `propose_post_charge`, `propose_hk_status`, `propose_send_message`. The UI renders each proposal as a card (what will change, price impact); on confirm, the normal server action executes. Multi-step requests yield multiple cards.

**v3 — "how do I…?" help.** The copilot doubles as the manual: it explains any screen and offers to do the task. This is the answer to eZee's learning curve.

**Prompting sketch:** system prompt = role + property snapshot (name, business date, currency, policies) + tool list + "never invent availability or prices; if a tool fails, say so". Conversation window kept short; long history summarized.

**Metrics:** questions/day, action-proposal acceptance rate, task time vs manual (target: booking via copilot ≤ manual flow).

## F2. AI guest messaging

**What:** in the unified inbox (M12), every inbound guest message gets a suggested reply.

- Context injected: reservation details, property facts sheet (amenities, policies, directions — editable in settings), thread history, live availability/rates *only* via safe read tools when the question needs them.
- Draft appears with: detected language/intent tag (question | complaint | upsell-opportunity | booking-request), confidence, and edit-then-send UI. **Auto-send** only for property-enabled low-risk intents (e.g., directions) and never for complaints.
- Booking-request messages convert to a `propose_booking` card inline.
- Translation: one click to see any thread in the staff language; replies composed in guest's language.
- Model: Haiku-class for detection/translation, Sonnet-class for drafting.

**Metrics:** first-response time, % drafts sent unedited, conversion of inquiry→booking.

## F3. Dynamic pricing suggestions

**What:** eZee sells this as a paid add-on (Mint); GulfHero builds suggestion-grade pricing into the core.

- **Nightly job** per property computes, for the next 90 days: occupancy on the books vs same-lead-time historical pace, day-of-week baselines, local events calendar (property-maintained + national holidays), min/max rate guardrails (settings).
- **Hybrid design:** deterministic feature computation in SQL/TS → Claude turns features into a bounded suggestion + plain-language explanation ("Sat Aug 15 is 82% booked at 30 days out vs 55% typical — suggest +18% to 460 SAR"). The model cannot exceed guardrails; final numbers are clamped in code.
- Surfaced in the rate calendar (badge per cell) + weekly digest. Accept single/bulk → writes `daily_rate`, audited.
- **Autopilot (later, opt-in):** auto-apply within tight bounds (e.g., ±10%), daily summary of what it did, one-click revert.

**Metrics:** suggestion acceptance %, RevPAR delta on accepted vs dismissed weeks (measurable from `ai_suggestion` + `daily_stats`).

## F4. Natural-language reports ("Ask your data")

**What:** replaces eZee's 100-report maze for ad-hoc questions.

- Tool-use over whitelisted aggregate readers: `query_daily_stats(range, group_by, metrics)`, `production_by(dimension, range)`, `pickup(range)`, `forecast(range)` — parameterized functions, not SQL generation, so answers are always tenant-scoped and correct-by-construction.
- Output contract: JSON {narrative ≤ 2 sentences, table, chart spec} rendered with Recharts; "save this question" pins it to the dashboard.
- Honest failure: if the question needs data we don't track, say exactly that and suggest the nearest canned report.

## F5. Daily digest & anomaly detection

- **Deterministic rules** detect anomalies (no-show rate > X, rate below cost floor, OTA sync stale, cashier variance, tomorrow >90% occupied with N rooms dirty at 6pm); Claude writes the morning digest narrative from KPIs + anomalies; delivered by WhatsApp/email per user preference.
- Anomalies also render as dismissible banners in the dashboard when urgent.

## F6. Smart housekeeping prioritization

- Deterministic scoring (departure-with-arrival-today > arrival-unassigned > VIP > stayover; adjusted by ETA when known), re-computed on relevant events (walk-in assigned a dirty room ⇒ that room jumps the queue, attendant notified). Claude is only used for the optional "explain today's plan" summary for Samir. *Mostly-deterministic is the point: don't use AI where sorting rules are better.*

## F7. AI-assisted onboarding (Phase 5)

- Setup wizard accepts messy inputs — a photo of the current rate sheet, an Excel room list, the old PMS export — and Claude structures them into room types, rooms, rate plans for human review. Cuts setup from days to an hour; a real sales weapon against eZee's onboarding.

## Cost model & controls

- Haiku for classification/translation (~pennies), Sonnet for copilot/drafting/reports. Expected: $5–30/property/month at small-hotel volume.
- Per-property budget cap with graceful degradation (AI features pause, core PMS unaffected). Usage panel in settings shows spend by feature.

## Build order recap (matches roadmap Phase 4)

gateway → copilot read-only → copilot actions → message drafting → pricing suggestions → NL reports → digest/anomalies → HK priority. Each lands with its eval set.
