# PMS Screenshot And Sitemap Crosswalk

Date: 2026-07-09

## Purpose

This document connects two evidence sources for the GulfHero PMS build:

- `docs/12-pms-sitemap-research.md`: route, navigation, tab, table, control, and field inventory from the live PMS crawl.
- The Google Drive screenshot set: visual page layout, spacing, density, drawer behavior, page tabs, and real screen composition.

The sitemap tells us what must exist. The screenshots tell us how the PMS behaves and how dense each page should feel on desktop.

## Source Materials

- Sitemap research PR file: `docs/12-pms-sitemap-research.md`
- Screenshot Drive source: `1iDBSQLXFPSoji7SwI9TvT4ChPVV7Vpab`
- Local screenshot grouping workspace: `/Users/abdallahelfouly/Documents/Gulf Hero/organized-screenshots`

The screenshots are not committed to this repo. They remain external visual references.

## Crosswalk By Product Area

### Home / Session

Sitemap routes:

- `/login`
- `/unity/dashboard`
- `/unity/quickaccess`

Screenshot groups:

- `00-home-login-subscription`
- `10-global-search-reservation-detail`

Build interpretation:

- Dashboard is an operational summary, not a marketing home screen.
- Global search starts from the dashboard/top bar and can become a booking/guest/company/travel-agent lookup surface.
- Subscription/session states exist outside the main PMS workspace.

### Global Search / Reservation Detail

Sitemap routes:

- `/unity/dashboard`
- Reservation detail state reached from search results

Screenshot groups:

- `10-global-search-reservation-detail`

Confirmed layout and behavior:

- Global search opens a wide overlay/dropdown from the top search bar.
- Search result tabs include Bookings, Guest, Business Source, Travel Agent, and Company.
- Selecting a booking opens a reservation detail workspace with tabs:
  - Folio Operations
  - Booking Details
  - Guest Details
  - Room Charges
  - Credit Card
  - Tasks
  - Audit Trail

Build interpretation:

- Search results are a temporary overlay.
- Reservation detail is a real workspace state after selection, not just a small popup.
- This flow should strongly inform the GulfHero top search behavior.

### Reservation View

Sitemap route:

- `/unity/reservations`

Screenshot group:

- `01-reservation-view`

Confirmed sitemap tabs and actions:

- Reservations
- Arrivals
- Departures
- In-house
- Make Group
- Export
- Search

Confirmed visual layout:

- Card view and table/list view both exist.
- Manage columns and export menus are compact toolbar actions.
- Search/filter appears as a right-side temporary panel.

Build interpretation:

- Reservation View is the command center for booking lists.
- It needs card/list density, tab counts, view toggle buttons, export, column control, and contextual search.

### Stay View

Sitemap route:

- `/unity/stayview`

Screenshot group:

- `02-stay-view`

Confirmed sitemap controls:

- Date picker
- Rate plan selector
- Assign Room
- Room type grouping
- Counters for All, Vacant, Occupied, Reserved, Blocked, Due Out, Dirty

Confirmed visual layout:

- Timeline grid by room type and date.
- Business source and booking status selectors appear in the toolbar.
- Booking status legend is contextual.

Build interpretation:

- Stay View is a planning grid.
- It should remain separate from the reservation list even though both deal with bookings.

### Room View

Sitemap route:

- `/unity/roomview`

Screenshot group:

- `03-room-view`

Confirmed sitemap structure:

- Room cards/tiles
- Room number
- Room type
- Occupancy/status state
- Status counters

Confirmed visual layout:

- Horizontal room card board with color-coded status.
- Date and room-status filters affect the board.

Build interpretation:

- Room View is the live physical room-state surface.
- It should feel closer to an operations board than a table.

### Distribution / Rates / Channels

Sitemap routes:

- `/unity/ratewizard/ratesinventory`
- `/unity/ratewizard/bulkupdate`
- `/unity/ratewizard/ratetemplate`
- `/unity/channelmappingwizard`
- `/unity/channellogs`
- `/unity/distributors/connect`
- `/unity/b2bmarketplace`
- `/unity/b2bmarketplace/partners`

Screenshot group:

- `04-distribution-rates-channels`

Confirmed sitemap tabs:

- Inventory
- Rates
- Minimum Nights
- Maximum Nights
- Stopsells
- COA
- COD

Confirmed visual layout:

- Rates and inventory are spreadsheet-like.
- Channel alerts, overbooking notices, channel status, and channel logs appear as contextual panels.
- Channel mapping and channel passwords use detail panels/drawers.

Build interpretation:

- This is a dense revenue/distribution workspace.
- Grid ergonomics matter more than decorative layout.
- Alerts and channel details should be click-triggered side panels.

### Packages / Promotions

Sitemap route:

- `/unity/packages`

Screenshot group:

- `05-packages-promotions`

Confirmed sitemap controls:

- Active / Inactive tabs
- Search Packages & Promotions
- Sync
- Create

Confirmed visual layout:

- Creation flow can branch into package vs promotion.
- OTA promotion setup, basic promotion, last-minute packages, minimum/maximum stay packages, rate thresholds, and auto-stop-sell panels are visible.

Build interpretation:

- Packages belong under Distribution / Revenue, but they need their own workflow surface.
- Creation flows should use guided side panels or full-page steps depending on complexity.

### Cashiering / POS

Sitemap routes:

- `/unity/cashieringcenter`
- `/unity/cashdrawer`
- `/unity/expensevoucher`
- `/unity/POS`
- `/unity/paymentprocessingreport`

Screenshot group:

- `06-cashiering-pos`

Confirmed sitemap content:

- City ledger selector
- New payment
- Cash drawer tabs
- Expense voucher
- Incidental invoice / POS
- Exchange rate panel

Confirmed visual layout:

- Cashiering Center is table and ledger heavy.
- Transaction creation uses side panels.
- POS and incidental invoice are sparse in the crawl but visually present in screenshots.

Build interpretation:

- Cashiering is a financial control area.
- Mutation flows must be explicit, audited, and action-triggered.

### Configuration

Sitemap routes:

- `/unity/config/profile`
- `/unity/config/roomtype`
- `/unity/config/ratetype`
- `/unity/config/rateplan`
- `/unity/config/taxes`
- `/unity/config/paymentmethod`
- `/unity/config/extracharge`
- `/unity/config/discount`
- `/unity/config/currency`
- `/unity/config/transporttype`
- `/unity/config/payout`
- `/unity/config/mealplan`
- `/unity/config/remarks`
- `/unity/config/marketsegment`
- `/unity/config/bookingsource`
- `/unity/config/holidays`
- `/unity/config/reservation-type`
- `/unity/config/guestattributes`
- `/unity/config/general-settings`
- `/unity/config/notifications`
- `/unity/config/documents`
- `/unity/config/booking-engine`
- `/unity/config/new-booking-engine`
- `/unity/config/user-management`
- `/unity/config/ai-settings`

Screenshot group:

- `07-configuration`

Confirmed visual layout:

- Configuration is a separate app-like area.
- Many pages follow: title, description, search, add button, table, action column.
- Add/edit forms often open as right-side drawers.
- User role edit drawer has large permission/report trees.

Build interpretation:

- GulfHero should keep configuration powerful but easier to navigate.
- Drawers must open only after explicit Add/Edit actions.
- The configuration sidebar/flyout needs clear grouping: Property Setup, Master, Settings, Booking Engine, User Management, AI/Automation.

### Guest / CRM / Partners

Sitemap routes:

- `/unity/guestmessage`
- `/unity/guestdatabase`
- `/unity/guestmessages`
- `/unity/guestrequest`
- `/unity/travelagent`
- `/unity/businesssource`
- `/unity/salesperson`
- `/unity/company`

Screenshot group:

- `08-guest-crm-partners`

Confirmed visual layout:

- Guest database, guest messages, travel agents, business sources, companies, and sales people are mostly table/list surfaces.
- Add forms and edit flows use side drawers.

Build interpretation:

- This area supports reservations and cashiering but should be its own data domain.
- Partner/account balances are sensitive and need role-aware visibility.

### Operations / Housekeeping

Sitemap routes:

- `/unity/unsettledfolios`
- `/unity/lostfound`
- `/unity/housestatus`
- `/unity/housekeeping-settings`
- `/unity/maintenanceblock`
- `/unity/workorder`
- `/unity/tasklist`
- `/unity/inbox`

Screenshot group:

- `09-operations-housekeeping`

Confirmed visual layout:

- House Status is table-first.
- Lost and Found and Maintenance Block are operational lists.
- Work Order has Add Task and Audit Trail drawers.
- Front Desk Operations has a search drawer.

Build interpretation:

- This area is service execution, not configuration.
- It should prioritize task clarity, assignment status, due dates, and room context.

## Interaction Rules From Combined Evidence

- Global top bar and quick search are persistent.
- Page tabs belong to the current module only.
- Search/filter panels are temporary overlays.
- Add/edit/details panels are temporary drawers.
- A screenshot containing a drawer does not mean the drawer is permanent.
- Dense grids should stay dense on desktop; do not turn operational pages into marketing-style card layouts.
- Tables need search, empty, loading, export, action, and audit states.
- Sensitive guest, payment, folio, and balance data needs role-aware display rules.

## Build Priority From The Full Picture

1. Shell and navigation using the sitemap as the route source of truth.
2. Global search and reservation-detail workspace.
3. Reservation View, Stay View, and Room View as the main front-desk triangle.
4. Rates/Inventory and Distribution grid flows.
5. Cashiering/POS mutation-safe financial surfaces.
6. Guest/CRM and Operations lists.
7. Configuration with grouped sidebar/flyout and action-triggered drawers.
8. Reports and AI/Automation after the operational core is stable.
