# 11 — eZee Absolute Page Map (parity reference)

> A screen-by-screen map of eZee Absolute, reconstructed **from eZee's own published documentation** — primarily the official "Guideline for eZee Absolute Front Office" and "eZee Absolute Configuration Help" manuals (yanoljacloudsolution.com/resources), cross-checked against the current knowledge base (yanoljacloudsolution.freshdesk.com / help.ezeetechnosys.com) and release notes (release.ezeetechnosys.com). Written in our own words; structure and terminology are factual product behavior.
>
> **Purpose:** GulfHero must reach *functional parity* with every screen and operation listed here. Each item maps to the GulfHero screen (S-numbers from `docs/09`) and is tagged:
> **[=]** mirror as-is · **[≈]** same capability, deliberately better UX · **[+]** GulfHero adds beyond eZee · **[⏭]** deferred (niche), tracked
>
> **Fidelity policy (important):** we mirror *pages, workflows, capabilities, and terminology* — not eZee's visual design, artwork, or copy. Cloning their look pixel-for-pixel would create copyright/trade-dress risk and would defeat our #1 goal (better UI/UX). "Identical" = a receptionist who knows eZee finds every function they expect, in a place that makes sense, usually faster.
>
> **Version note:** the manuals document the classic console; the current "eZee Absolute 2.0" refreshes the skin but keeps this information architecture (verified against current KB articles, e.g. assign-rooms, room-move, room-type/rate mapping). When we build each module, pull the matching KB article for current behavior.

---

## Console A — Front Office (daily operations)

eZee splits the product into two logins: **Front Office** (operations) and **Configuration** (setup). Login takes username + password + hotel code. → GulfHero: one app, role-gated; property selected by membership **[≈]**.

### A1. The three main views

| eZee view | What it shows | GulfHero |
|---|---|---|
| **Stay View** (default) | The tape chart: rooms×dates grid | S2 tape chart **[≈]** |
| **Quick View** | Daily stats blocks | S2 Today panel + S15 dashboard **[≈]** |
| **Dashboard View** | Per-guest workbench + availability/rate chart | S4 reservation detail + S5 booking dialog **[≈]** |

### A2. Stay View — anatomy (the model for our S2)

- **Left panel:** every room as-of the working date with guest name + live status (Stay Over / Due Out / Arrival / Day Use / Confirmed Reservation). Click a row for quick operations. → GulfHero: Today panel lists are the equivalent, filterable **[≈]**.
- **Grid:** room types as group rows; rooms beneath; one cell per room-night colored by status. **Status legend (7):** Arrival, Checked Out, Due Out, Confirmed Reservation, Maintenance Block, Stay Over, Day Use — colors configurable. → GulfHero status tokens cover all of these; add **Day Use** as a status **[=]**.
- **Room-row icons:** smoking/non-smoking, housekeeping status (hover = status tooltip), door icon → opens Edit Transaction. → GulfHero: HK dot + features icons **[≈]**.
- **Bottom rows:** per-date **# rooms available** and **% occupancy**. → add to S2 tape chart footer **[=]**.
- **Top-right date picker** to jump the visible range **[=]**.
- **Bottom-left search** with filter-by: Guest Name, Room Type, Room, Reservation No., Folio No., Mobile No. → GulfHero: ⌘K global search covers all six keys **[≈]**.
- **Drag on empty cells** across dates → opens the Walk-in/Reservation form prefilled **[=]** (S2/S5 already spec this).

### A3. Right-click operations on a room/reservation (context menu)

Edit Transaction · Room Move · Set Message · Set Tasks · Set Preference · Amend Stay · Check In (confirmed only) · Cancel (confirmed only) · Mark No Show (confirmed only).
→ GulfHero S2 context menu: same nine operations. "Set Message/Tasks/Preference" = quick notes/tasks/preferences on the reservation (surface in S4 Stay tab) **[=]**. "Amend Stay" = change dates/room type with re-price = our extend/shorten/change flows **[=]**.

### A4. Edit Transaction (eZee's reservation workbench — the model for our S4)

Opens as a tab next to Stay View; only one may be open at a time (see Net Locks, A8). Layout:
- **Header blocks:** Guest Information (name, contact) · Room + Folio number · Stay Information (arrival/departure datetime, res #, rate type, nights, adult/child) · Other Information (reservation type, business source, market, travel agent, company) · room status badge · Audit Trail button.
- **Tab 1 — General Information:** Billing Instruction (bill to guest/company, cash/credit, payment method, release date/term, voucher no, GR card no, vehicle plate) · **Sharer Information** (co-occupants; per-sharer edit, pickup/drop-off times, print GR card, blacklist) · **Inclusion block** (recurring extra charges with posting rules) · Remarks log · Summary (total charges / credits / balance) · counters for messages/tasks/preferences.
- **Tab 2 — Room Charges:** per-night rows (date, room, rate type, pax, room charge, discount, tax, net, user) with per-row **Rate / Rate Type / Pax operations**, apply-to-selected-dates or whole-stay, discount button.
- **Tab 3 — Folio Detail:** posting bar (date, type: payment / extra charge / adjustment / room charge / transfer / city ledger, amount, ref no, comment, target folio) · itemized ledger with **Itemize list / Hide voids / Hide unposted** toggles · action buttons: **Void, Move (to another folio/room), Print, Exempt Tax (with exempt ID), Split Folio (source→destination picker, scope: selected/guest/group), New Folio, Bill To (transfer balance)**.

→ GulfHero S4 + S12 already cover ~90%. **Parity additions required:** sharers, inclusions (recurring charges), exempt-tax with ID, move-charge-between-folios, per-night rate-type/pax edit operations, vehicle plate + GR card number fields. Logged in `docs/03` §Parity. **[=]**

### A5. Walk-in / Reservation form (the model for our S5)

One form, two submit buttons (**Reserve** / **Check In**). Blocks: Stay Information (rooms count, arrival/departure with times, nights, reservation type) · Billing Information (bill to, payment method, release date/term, tax exempt ID) · Room Charges (rate mode: **Normal / Contract / Manual**, contact email+phone) · collapsible: Other (company, market, business source) · Travel Agent (agent, commission plan, value, voucher) · Discount · Payment (type, amount, receipt no) · **per-room rows:** room type, room, rate type, adult/child, guest name (search or create), identity type + number; multi-room mode adds rows + "group leader room" marker.
→ GulfHero S5: same capabilities; rate modes map to rate-plan / negotiated-company-rate / manual-override-with-permission **[≈]**. Booking + check-in in one flow for walk-ins **[=]**.

### A6. Top menu — Front Office

| eZee item | Behavior (facts) | GulfHero |
|---|---|---|
| Walk-in | Opens A5 form in check-in mode | S5 "Book & check in" **[=]** |
| New Reservation | Opens A5 form | S5 **[=]** |
| Reservation List | Filters: res #, voucher #, cancellation #, guest, room/type, source, arrival range, res date, type, active/all. Row actions: edit, **void**, amend stay, cancel, confirm/update status, check-in, **un-assign room**, **email reservation voucher** | S3 + add void (distinct from cancel: voids a mistaken entry), unassign room, resend voucher **[=]** |
| Arrival List | Today's confirmed arrivals + Mark No Show action | S2 Today panel arrivals **[≈]** |
| Departure List | Due-outs + Check Out; hard-blocks checkout while any folio balance ≠ 0 | S2 departures + same guard **[=]** |
| Guest Database | Search (VIP status, name, country, city, phone); actions: edit, delete, **blacklist/whitelist**, **Consolidate** (merge duplicates); Add Guest form (salutation, adult/child, gender, address, country, DOB, spouse DOB, anniversary, nationality, ID type+no, VIP status, direct billing A/C, payment method) | S9; consolidate = our dedupe merge **[=]** |
| Night Audit | **5-step wizard:** 1) Pending Reservations (act on today's unactioned: void/cancel/no-show/check-in) 2) Release Reservations (cancel no-shows w/ fee option) 3) Room Status (amend/checkout due-outs; zero-balance only) 4) Nightly Charge Posting (select rooms → post) 5) Create New Day (freeze day, roll working date) | S16 checklist covers same 5 concerns **[≈]** |
| Net Locks | Room-level edit locks ("this room is already in use — locked by X"); unlock screen | GulfHero: optimistic concurrency + presence indicator instead of hard locks; manager can force-release **[≈]** |
| Change Password | Self-service password change | Account settings **[=]** |

### A7. Top menu — Group / Cashiering / Housekeeping / POS

- **Group:** Group Reservation list · In-house Group · Departed Group (same filter pattern). → S3 filter presets + group detail view **[≈]**.
- **Cashiering:**
  - **Travel Agent Database** (agents with commission plans; feeds business-source dropdowns) → S10 companies kind=travel_agent **[=]**.
  - **Company Database** (city-ledger accounts) → S10 **[=]**.
  - **Expense Voucher** — petty-cash/accounts-payable: pay a Guest/Owner/Agent/Vendor from the drawer; voucher header + charges block + payments block; must balance to zero; list/edit/void. → **new in GulfHero:** S11 gets an Expenses tab (doc 03 §Parity) **[=]**.
  - **Cashiering Center** — post payments against credit business: travel agent balances, city ledger, folio transfers; search by account + date range. → S11 city-ledger receive-payment covers; extend to agent accounts **[=]**.
- **Housekeeping:** **House Status** (all rooms: type, HK status, availability, remarks, housekeeper; icons: create work order, block room; bulk select → set status / assign housekeeper) · **Maintenance Block List** (blocked rooms + reason + duration; add/unblock) · **Work Order List**. → S7/S8 cover all three; add bulk assign + remarks **[≈]**.
- **POS (Incidental Voucher)** — accounts-receivable invoice for walk-up sales to Guest/Owner/Agent/Vendor (not tied to a room folio); same voucher structure; print/edit/void. → S13 POS-lite cash-sale mode **[=]**.

### A8. Reports menu (canonical catalog to match)

Grouped exactly as: **Reservation** (Arrival list, Cancelled, No Show, Void) · **Front Office** (Checked in, Checked out, Guest list, Guest message, Night Audit, Room Status) · **Back Office** (Advance Deposit Ledger, City Ledger detail/summary, Daily Extra Charge, Daily Receipt detail/summary, Daily Refund, Daily Revenue, Expense Voucher, Folio List, Guest Ledger, House Status, **Manager Report**, Revenue by Rate Type, Revenue by Room Type, Travel Agent Commission detail/summary) · **Audit** (Void Charge, Void Payment, Void Transaction) · **Statistical** (Business Analysis, Contribution Analysis, Monthly Country-wise Pax, Monthly Statistics, Monthly Summary, Room Statistics, Yearly Statistics) · **Graphs & Charts** (Monthly Occupancy, Monthly Revenue, Payment Summary).
→ GulfHero S15: every report above must be answerable — as a canned report, a dashboard card, or a saved NL-question. Map maintained in `docs/03` M9; the Manager Report = our GM dashboard/daily digest **[≈]**.

### A9. Quick View (daily stats page)

Blocks: **Today's Statistics** (occupied, complimentary, due out, stay over, staying over, confirmed arrivals, unconfirmed arrivals, rooms to sell, projected occupied/occupancy%/ADR/RevPAR) · **Total Guest** (adult/child/total: in-house, due checkout, staying, due arrive, expected in-house) · **Today's Activity Count** (arrived, walk-in, due to arrive, checked out, due out, day use) · **Hotel Inventory** (rooms in property, out of order, available to sell) · **Future Inventory** (pick a date → 3-day availability per room type) · **Housekeeping Status** (vacant/occupied × dirty, in maintenance, occupied-clean, occupied-dirty, vacant-clean).
→ GulfHero: Today panel + S15 KPI tiles; add **complimentary** and **day use** counters **[≈]**.

### A10. Dashboard View (guest workbench + rate chart)

Two purposes: (1) **Availability & Rate Chart** — month calendar for a room type × rate type × pax showing per-day availability (top corner) and rate (bottom corner); the phone-inquiry killer feature. (2) **Manage in-house guest**: select guest from left panel → header info + folio transaction quick-post + **Quick Operations buttons:** Check Out (due-out only), Edit Transaction, Room Move, Amend Stay, HK Status, Split Folio, Walk In/New Reservation, Void Transaction.
→ GulfHero: (1) = S5 availability step + S6 availability row; **add a dedicated "Availability chart" quick view** opened from ⌘K for phone inquiries (doc 03 §Parity). (2) = S4 header actions **[≈]**.

---

## Console B — Configuration (setup)

Six menus: **Rooms · Rates · Housekeeping · Master · Settings · Web** (+ User menu under the account). Status bar shows property, user, working date, system date, version. → GulfHero: S17 settings; working-date chip already in top bar.

### B1. Rooms menu

| eZee screen | Fields/facts | GulfHero |
|---|---|---|
| Amenities | name, type (room/hotel/both), sort key | S17 room-types amenities **[=]** |
| Room Type | short code, name, base adult/child, max adult/child, publish-to-website, amenities checklist, color, default web inventory | S17 **[=]** (+ bilingual names **[+]**) |
| Sort Room Types / Sort Room | manual ordering | sort_order fields **[=]** |
| Bed Type | short code, name; per-room attribute | add `bed_type` to room **[=]** |
| Room | short code, name/number, room type, bed type, phone extension, key-card alias, sort key, non-smoking flag, 4 images, **connecting rooms** picker | S17 rooms; add phone ext, keycard alias, smoking, connecting rooms (already "features") **[=]** |
| Status Color | recolor the 7 stay-view statuses | design tokens; per-property override deferred **[⏭]** |
| Room Owner | condo/apartment owner module: owner contacts, commission plan (% of nights / fixed per night / fixed per stay), regular vs allocated rate & inventory, opening balance, owner login, room assignment | **[⏭]** niche condo module — Phase 5+ backlog |

### B2. Rates menu

| eZee screen | Facts | GulfHero |
|---|---|---|
| Rate Type | short code, name, nights qualifier, max adult, min nights, room types it applies to | rate_plan **[=]** |
| Season | code, name, day/month range + active window; rates defined per season | seasonal presets in rate calendar; `daily_rate` is the source of truth (calendar-first beats season-first UX) **[≈]** |
| Room Rates | grid: room type × rate type × season × business source → rate, extra-adult, extra-child; rates-inclusive-tax toggle | S6 rate calendar + derived plans; per-source rates via company negotiated rates **[≈]** |
| Tax | short name, name, applies-from date, **exempt after N days**, posting type: flat / % / **slab**, apply before/after discount, apply-on-rack-rate | M1 taxes; add slab + exempt-after-N-days + before/after-discount ordering (doc 03 §Parity) **[=]** |
| Sort Rates | ordering | **[=]** |

### B3. Housekeeping menu
Housekeepers (name, mobile) · Units (common areas: lobby, reception…) · Status (custom HK statuses + colors).
→ GulfHero: housekeepers are users (role) **[≈]**; add **common-area units** as cleanable non-room targets and allow custom HK status labels per property (doc 03 §Parity) **[=]**.

### B4. Master menu (the dropdown catalogs)

Currency (multi-currency with manual exchange rates, applied after night audit) · Pay Method (cash/bank type, card-processing flag, surcharge %/amount → mapped extra charge, receipt-number mode) · Extra Charge (rate, tax link, rate-inclusive-tax display, fixed-price flag, front-desk sort, publish-on-web, voucher numbering) · Identity Type · Reason (per action category) · Discounts (%/flat, **open discount** = editable at desk, apply on room/extra) · Transportation Mode (pickup/drop-off) · Payouts (expense categories) · Template Category + **Template** (email templates: auto-send trigger action, attachment type — cancellation voucher/invoice/report/reservation voucher, from-account, schedule date, subject, body) · Black List Reason · Market Code · Reservation Type (system: Confirmed Booking, Booking Inquiry + custom) · Preference Type + Preference · VIP Status · Business Source.
→ GulfHero: all exist or map to enums/settings; make **reasons, market codes, business sources, VIP statuses, preferences, transportation modes, payout categories** property-editable catalogs instead of hardcoded lists (doc 03 §Parity). Multi-currency display **[=]**; template auto-send triggers = our message journeys **[≈]**.

### B5. Settings menu

| eZee screen | Facts | GulfHero |
|---|---|---|
| Email Accounts | multiple from-accounts with display name + signature | Resend domain + per-template from **[≈]** |
| Hotel Information | name, address, contacts, property type, website, logo, star grade, 3 registration numbers | S17 property **[=]** |
| **Formula** | edit KPI definitions: which revenues count in Total Room Revenue (night/day-use/late-checkout/cancellation/no-show), include OOO in total rooms, ADR/Occ%/RevPAR formulas | KPI settings on daily_stats computation **[=]** (doc 03 §Parity) |
| Notices | per-document footer text: bill-to-company, folio, registration card, T&C, cancellation, group reservation, receipt, reservation, voucher | invoice/GR-card template settings **[=]** |
| Document Numbering | per doc type (GR card, folio, reservation, cancellation, extra-charge voucher, receipt, invoice, work order, incidental invoice): prefix + reset daily/monthly/yearly | extend invoice_counter to all doc types **[=]** |
| Print & Email Settings | default templates per doc; auto-print folio/GR at check-in/out; auto-emails: thanks at checkout, review request, reservation released/cancelled | journey toggles + print defaults **[=]** |
| **Check-in & Reservation Settings** | 24h-checkout mode or fixed times; **Day Use** auto-post (grace hours, % of rate); **Late Checkout** auto-post (grace hours, % of rate); **Cancellation fee** rules (% of total/room charges, fixed, first-N-nights; beyond X days of reservation / within Y days of arrival); **No-show fee** rules (same shapes); financial year; **mandatory-field matrix** (guest name/identity/market/hold type/agent/company/source/nationality/address × reservation vs walk-in); email reservation voucher to guest/company/agent; review-email audience; **overbooking enable**; base-occupancy default; front rate mode regular/allocated | policies (M1) + day-use/late-checkout auto-charges + configurable mandatory fields + overbooking toggle → doc 03 §Parity **[=]** |
| Display Settings | time/date formats, timezone, captions, default identity/reservation type/salutation/bill-to/payment mode, round-off rule, web rate & inventory mode, default gateway | property settings **[=]** (round-off rule noted for money lib) |
| Pagination | list page sizes per screen | table defaults **[≈]** |
| Tax/Account Config | map revenue accounts (room, cancellation, no-show, day use, late checkout, agent commission) + which taxes apply to each | folio item kinds + tax applicability matrix **[=]** |
| Payment Gateway | gateway credentials | S17 integrations **[=]** |

### B6. User menu & Web
**User Role** (short code, name, parent role inheritance, privileges checklist, reports checklist) · **User** (credentials, role, mobile, language, calendar language, show-last-N-card-digits, per-user privilege/report/discount overrides) · **IP Config** (restrict login IPs) · **Web** (link out to booking engine admin).
→ GulfHero: S17 users + permission matrix; add per-user overrides + report-level permissions; IP allowlist deferred **[⏭]**; card-digit masking is default-on **[+]**.

---

## Parity gap list (features the manuals surfaced that our specs must add)

Tracked as spec changes in `docs/03-feature-specs.md` §Parity additions:

1. **Day Use reservations** — same-day in/out status, own stay-view color, auto-post % of room rate after grace period, own revenue account. (M3/M6)
2. **Sharers** — multiple guests on one room stay with per-sharer GR cards and optional separate folios. (M3/M6)
3. **Inclusions** — recurring scheduled extra charges attached to a stay (posting rule + charge rule). (M6)
4. **Expense Vouchers (petty cash / AP)** + payouts catalog + **Cashiering Center** (receive payments on agent/city-ledger balances). (M6)
5. **Travel-agent commission plans** (% of nights / fixed per night / per stay) + commission reports + payout flow. (M5/M9)
6. **Void reservation** (mistake-erasure, distinct from cancel), **un-assign room**, **email reservation voucher** actions. (M3)
7. **Late-checkout auto-charge** (grace + % of rate) alongside day-use. (M6)
8. **Slab taxes**, exempt-after-N-days, before/after-discount application, per-charge tax exemption with exempt ID. (M1/M6)
9. **Configurable mandatory-field matrix** (reservation vs walk-in). (M1/M3)
10. **Property-editable catalogs:** reasons, market codes, business sources, VIP statuses, preference types, blacklist reasons, transportation modes, identity types, bed types. (M1)
11. **Document numbering** per document type with prefix + periodic reset; **notices** (per-document footer texts). (M1/M6)
12. **KPI formula settings** (what counts as room revenue; OOO in denominator). (M8/M9)
13. **Multi-currency display** with manual exchange rates applied at night audit. (M6)
14. **Overbooking house toggle** (default off; our allocator still records flagged overbookings only). (M2)
15. **Common-area housekeeping units** + custom HK status labels. (M7)
16. **Availability & Rate Chart** quick view (month grid per room type × rate plan × pax) for phone inquiries. (M4)
17. **Record-lock presence** ("X is editing this reservation") as the friendly answer to Net Locks. (M3)
18. Room fields: bed type, phone extension, key-card alias, smoking flag, connecting rooms. (M1)
19. **Report catalog mapping** — every report in A8 has a named GulfHero home. (M9)
20. **[⏭] Deferred:** Room Owner/condo module, per-property status recoloring, IP allowlist.

## What could NOT be obtained without user help

- **A live account walkthrough** of the current build (exact modern skin, pixel spacing, any screens added after the manuals). The published KB + release notes close most of this gap per-feature. If you have a trial/live login, screenshots of any screen let us tighten specific flows — but it is not required to build to this map.
- Anything behind their partner portal (channel-manager internals, POS deep config).

### Sources
- Official Front Office guide: https://www.yanoljacloudsolution.com/resources/eZeeAbsolute_FrontOffice_Help.pdf
- Official Configuration guide: https://www.yanoljacloudsolution.com/resources/eZeeAbsolute_Configuration_Help.pdf
- Current KB (per-task articles): https://yanoljacloudsolution.freshdesk.com/en/support/solutions (eZee Absolute section) and https://help.ezeetechnosys.com/
- Release notes / suite overview: https://release.ezeetechnosys.com/
