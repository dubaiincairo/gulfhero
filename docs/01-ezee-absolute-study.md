# 01 — Study: eZee Absolute

> Research summary of eZee Absolute (by eZee Technosys / Yanolja Cloud Solution): what it is, what it does, how it works day-to-day, what it costs, and — most importantly — where it is weak. This is the competitive baseline GulfHero must match on function and beat on experience.

## 1. What eZee Absolute is

eZee Absolute is a **cloud-based hotel Property Management System** aimed at independent hotels, small chains, B&Bs, hostels, and serviced apartments. It is one of the most widely used budget-friendly PMSs in South Asia, the Middle East, and Africa. It is sold as an all-in-one suite of separately usable modules:

| eZee product | Role |
|---|---|
| **eZee Absolute** | Core cloud PMS (front desk, reservations, housekeeping, billing, reports) |
| **eZee Centrix** | Channel manager (~130+ OTAs/GDS: Booking.com, Expedia, Agoda, …) |
| **eZee Reservation** | Website booking engine (direct bookings, Facebook bookings) |
| **eZee Optimus** | Restaurant POS (charges can post to the guest folio) |
| **eZee Panorama** | Hotel website builder |
| **eZee Mint** | Dynamic pricing / revenue management add-on |
| Guest portal & mobile apps | Guest self-service (profile, GR card, signature) + staff mobile app |

All modules share a back end and login; a property can start with just the PMS and add distribution later. This modular-but-integrated shape is worth copying.

## 2. Feature inventory (what we must cover)

### 2.1 Reservations & front office
- Reservation lifecycle: inquiry → tentative/hold → confirmed → checked-in → checked-out; plus no-show and cancellation handling.
- **Tape chart / stay view**: calendar grid of rooms × dates showing bookings; drag-and-drop room moves; color-coded statuses.
- Quick booking ("Add Reservation" fast path), walk-ins, group bookings, split stays, room upgrades.
- Check-in/check-out with guest registration card, ID capture, signatures.
- Guest profiles with stay history; company/travel-agent accounts with credit and commission tracking.
- Room blocking (out-of-order / out-of-service) and maintenance blocks.

### 2.2 Rates & inventory
- Room types → rooms; rate plans (EP/CP/MAP/AI meal plans are big in its markets), seasonal rates, day-of-week rates.
- Extra adult/child pricing, taxes (inclusive/exclusive), promo codes, corporate negotiated rates.
- Inventory and rates pushed to OTAs via the channel manager; bookings pulled in automatically.

### 2.3 Housekeeping & maintenance
- Room status board: clean / dirty / inspect / out-of-order.
- Task assignment to attendants; status updates from a mobile app; maintenance work orders.

### 2.4 Billing & cashiering
- Guest folios with room charges, extras, POS postings, taxes, discounts, payments (cash/card/bank/city ledger).
- Split folios, route charges to company accounts, advance deposits, refunds, credit notes.
- Invoice printing/email; tax compliance formats per country.
- **Night audit**: end-of-day process that rolls the business date, posts room charges, flags no-shows, and freezes the day's figures.

### 2.5 Reports & dashboards
- Manager dashboard: arrivals, departures, in-house, occupancy %, ADR, RevPAR, revenue.
- ~100+ canned reports: police/government reports, tax reports, shift/cashier reports, production by channel/company, forecast reports.

### 2.6 Guest engagement
- Pre-arrival and post-departure emails, review collection (TripAdvisor etc. via "eZee Reputation"), basic feedback forms. **No native WhatsApp/SMS chat** — needs third-party tools.

### 2.7 Admin & platform
- Multi-property support with centralized dashboard; user roles and permissions; audit trail; works offline-ish during connectivity blips; 24/7 support (chat) — support quality is a frequently praised *and* frequently criticized point.

## 3. How it works day-to-day (staff workflow)

- Receptionists live in the **stay view (tape chart)** and an arrivals/departures list. Check-in is a multi-step dialog off the reservation.
- Housekeeping supervisors flip room statuses from a board or the mobile app; front desk sees status colors on the tape chart.
- The manager checks a dashboard of occupancy/ADR and pulls reports from a large, flat report menu.
- The night auditor runs end-of-day, which validates pending check-outs/no-shows before rolling the date.
- Pricing: mostly manual rate updates pushed through the channel manager; eZee Mint (extra cost) adds rule-based dynamic pricing.

## 4. Pricing (baseline for positioning)

- Roughly **$45–60 USD/month** for a small property base plan (PMS + booking engine + channel manager bundles vary); extra modules (POS, more users, Mint) cost more. 14-day free trial. This is the "affordable all-in-one" price band GulfHero should target.

## 5. Where eZee Absolute is weak (our openings)

Compiled from Capterra/G2/SoftwareAdvice reviews and independent reviews (HotelSystemsGuide, TheHotelGM):

| # | Weakness | Evidence from reviews | GulfHero's answer |
|---|---|---|---|
| 1 | **Dated, crowded UI** | "Interface feels dated", "icons and menus crowded", "a bit bland"; less intuitive than Cloudbeds/Mews | Modern design system, generous whitespace, task-oriented screens, dark mode, ≤2-click common actions |
| 2 | **Learning curve on advanced features** | Basic tasks fine, advanced features confusing; long onboarding | Progressive disclosure + an in-app AI copilot that *does the task for you* from plain language |
| 3 | **Confusing reporting** | "Reporting interface can be confusing", limited customization | Few beautiful dashboards + **natural-language reports** ("show me weekend occupancy vs last month") instead of 100 flat menu items |
| 4 | **Weak mobile app** | "Mobile app not fully optimized, limited functionality" | Responsive PWA where *every* staff workflow works on a phone; housekeeping is mobile-first |
| 5 | **No native guest messaging** | No SMS/WhatsApp; third-party required | Built-in guest inbox (email + WhatsApp) with AI-drafted replies |
| 6 | **No real AI / automation** | "No built-in competitor rate tracking or dynamic pricing automation"; Mint is a paid add-on | AI-native: pricing suggestions, copilot, auto-drafted messages, predictive housekeeping — in the core product |
| 7 | **Occasional sync glitches/overbookings** | Reported sync lags and rare overbookings | Single source of truth for inventory, event-sourced availability ledger, conflict detection alerts |
| 8 | **Support dependence** | Users need support often (partly because UX is unclear) | Self-explanatory UX + AI help reduces tickets; docs built in |

## 6. What eZee gets right (we must not regress on these)

1. **Completeness** — one login covers front desk → distribution → POS → reports. Hotels hate stitching tools together.
2. **Modularity** — start with PMS only; add booking engine/channel manager later.
3. **Price** — genuinely affordable for small properties.
4. **Regional fit** — meal-plan rate types (CP/MAP/AP), government/police reports, local tax formats, multi-currency, multi-language.
5. **Resilience** — tolerates flaky connectivity; 24/7 support.

## 7. Modern competitive bar (context beyond eZee)

Mews and Cloudbeds define the 2026 high end: Mews runs an AI-native platform with embedded RMS executing automatic rate changes and natural-language reporting; Cloudbeds ships native revenue-management AI for independents. AI concierge deployments report meaningful upsell revenue per room night. GulfHero's opportunity: **Mews-class intelligence and design at eZee-class simplicity and price**, with first-class Arabic/RTL and Gulf-region fit that neither serves well.

### Sources
- https://www.ezeeabsolute.com/ and https://www.ezeeabsolute.com/hotel-pms-software.php (official feature pages)
- https://hotelsystemsguide.com/ezee-absolute-review/ (in-depth independent review)
- https://thehotelgm.com/tools/ezee-absolute-review/
- https://www.capterra.com/p/135751/eZee-Absolute/reviews/ and https://www.g2.com/products/ezee-absolute/reviews
- https://release.ezeetechnosys.com/ (product suite & release notes)
- https://www.hospitalitynet.org/news/4132634/mews-unveils-the-operating-system-for-hospitality
- https://www.vertize.io/blog/how-ai-integrates-with-every-major-hotel-pms-the-complete-2026-guide
