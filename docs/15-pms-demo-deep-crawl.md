# PMS Demo Deep Crawl

Date: 2026-07-11
Source: `https://live.ipms247.com/`
Account type: user-provided demo property
Status: read-only reservation and operational-workspace pass completed; broader pass paused by temporary firewall block

## Purpose

This document supplements:

- `docs/12-pms-sitemap-research.md`
- `docs/13-pms-screenshot-sitemap-crosswalk.md`
- `docs/14-pms-design-system.md`

The earlier crawl established the route catalogue and most list/configuration page anatomy. This pass used the user-provided demo property to open previously skipped reservation records and reversible operational drawers without saving or posting data.

No credentials, guest identities, contact details, payment values, IP addresses, or private record values are stored here.

## Safety Boundary

Allowed during this pass:

- Open routes, tabs, cards, search results, drawers, and menus.
- Open Add/Edit forms to inventory fields.
- Close or cancel every form without saving.
- Inspect visible controls and table headers.

Not performed:

- Save, reserve, check in, check out, post, charge, refund, void, delete, send, export, or run night audit.
- Change room assignment, rate, folio, guest, or configuration data.
- Run reports that could expose private records.

## Live Navigation Reconfirmation

The demo account reconfirmed this main navigation:

- Stay View: `/unity/stayview`
- Reservations: action leading to `/unity/reservations`
- Rates & Availability:
  - Rates: `/unity/ratewizard/ratesinventory`
  - Packages & Promotions: `/unity/packages`
  - Rate Threshold: action state
- Distribution:
  - Auto Stopsell: action state
  - Channel Logs: `/unity/channellogs`
- Guest:
  - Guest Database: `/unity/guestdatabase`
  - Front Desk Operations: `/unity/unsettledfolios`
  - Lost and Found: `/unity/lostfound`
- Cashiering:
  - Cashiering Center: `/unity/cashieringcenter`
  - Cash Drawer: `/unity/cashdrawer`
  - Travel Agent Database: `/unity/travelagent`
  - Business Source: `/unity/businesssource`
  - Sales Person Database: `/unity/salesperson`
  - Company Database: `/unity/company`
  - Expense Voucher: `/unity/expensevoucher`
  - POS: `/unity/POS`
  - Exchange Rate: action state
- Housekeeping:
  - House Status: `/unity/housestatus`
  - Maintenance Block: `/unity/maintenanceblock`
  - Work Order/Task: `/unity/workorder`
- Night Audit:
  - Run Night Audit: action state
  - Night Audit Log: action state
  - Insert Transaction: action state
- Reports: legacy report application link
- Exported Reports: action state

## Global Search

The top search input opens a temporary wide overlay. It is not a permanent page section.

Confirmed result categories:

- Bookings
- Guest
- Business Source
- Travel Agent
- Company

Confirmed booking-result structure:

- Guest / reservation identifier
- Stay period
- Pax
- Room / room type
- Rate type
- Status
- Matched-field reason
- View all action

Selecting a booking can lead into the reservation summary and full reservation workspace described below.

## Reservation View

Route: `/unity/reservations`

Confirmed tabs:

- Reservations
- Arrivals
- Departures
- In-house

The tab counters are live operational counts. The page can expose card and list/table representations depending on the selected view mode.

Confirmed reservation-card anatomy:

- Guest/reservation heading
- Reservation source or walk-in marker
- Arrival and departure date/time
- Nights
- Booking date
- Adult/child counts
- Room and rate plan
- Total, paid, and balance summary
- Contextual more action

## Reservation Summary Drawer

Selecting a reservation first opens a temporary side drawer over the source page.

Confirmed summary content:

- Guest identity summary
- Reservation number and status
- Arrival, departure, and booking dates
- Room type and room number
- Rate plan
- Pax
- Average daily rate
- Total, paid, and balance

Confirmed header actions:

- Edit Reservation
- More Options
- Print / Send

This drawer must not be implemented as permanent content on Stay View or Reservation View.

## Reservation Workspace

The Edit Reservation action promotes the selected record into a full-width temporary workspace while preserving Reservation View beneath it.

Confirmed workspace header:

- Guest summary
- Adult/child counts
- Arrival and departure
- Nights
- Room / room type
- Reservation number
- Reservation status
- Print/Send action

Confirmed tabs:

- Folio Operations
- Booking Details
- Guest Details
- Room Charges
- Credit Card
- Tasks
- Audit Trail

### Folio Operations

Confirmed structure:

- Room / folio hierarchy
- Room type and room number selectors
- Folio identity
- Total and balance
- Unposted / posted states
- Itemize, void-visibility, and posting-visibility controls

Confirmed actions:

- Add Payment
- Add Charges
- Apply Discount
- Folio Operations
- More

Confirmed transaction columns:

- Day
- Ref No.
- Particulars
- Description
- User
- Amount

### Add Payment Drawer

This is a nested, action-triggered drawer. It is closed with Cancel or Close and was not saved.

Confirmed fields:

- Date
- Folio
- Amount
- Currency
- Mode of Payment
- Other Payment Method
- Remark (optional)

Actions:

- Cancel
- Save

### Add Charge Drawer

Confirmed fields:

- Date
- Folio
- Charge
- Add as Inclusion
- Quantity
- Amount
- Discount
- Comment

Action:

- Add

### Apply Discount Drawer

Confirmed fields:

- Date
- Discount Type
- Folio
- Amount
- Currency
- Comment

Action:

- Add

### Folio Operations Form

Confirmed fields and controls:

- Bill To
- Registration No.
- Guest Name on Folio
- POS Posting Type
- Show tax on printed folio
- Generate invoice number on checkout
- Tax Operation

Actions:

- Cancel
- Save

Save remains disabled until the form has valid changes.

### Booking Details

Confirmed sections and fields:

- Remark, Task, and Message counters
- Billing Information
- Bill To
- Type: Cash/Bank or City Ledger
- Payment Mode
- Registration No.
- Reservation Type
- Market Segment
- Business Source
- Travel Agent
- Voucher No.
- Commission Plan
- Plan Value and currency
- Company
- Sales Person
- Send Mail
- Check Out Mail
- Suppress Rate on GR Card
- Access Guest Portal
- Save

### Guest Details

Confirmed sections and fields:

- Name
- Phone
- Mobile
- Email
- Gender
- Guest Type
- VIP Status
- Address
- Zip
- Country
- State
- City
- Nationality
- Company
- Fax
- Registration No.
- Identity Information
- ID Number
- ID Type
- ID Version No.
- Issuing Country
- Issuing City
- Expiry Date
- Other Information
- Birth Date
- Birth City
- Birth Country
- Spouse Birth Date
- Wedding Anniversary
- Purpose of Visit

### Room Charges

Confirmed first-rendered content:

- Balance summary

No charge was edited or posted.

### Credit Card

Confirmed first-rendered content:

- Payment Operations section

No card data was read or stored.

### Tasks

Confirmed content:

- Task List
- Status/category filter
- Empty state
- Add action

The Add action opens another temporary form with:

- Unit/Room
- Category
- Priority
- Description
- Due Date
- Due Time
- Assign To
- Reservation / Folio
- Block
- End Date
- Cancel
- Save

### Audit Trail

Confirmed columns:

- Date/Time
- Logs
- User
- IP

The selected demo record returned an empty state. No user/IP values were stored.

## Add Reservation Workspace

The global Add Reservation button opens a full-width temporary workspace over the current page. It is not a permanent page.

Confirmed stay fields:

- Check-in date/time
- Nights
- Check-out date/time
- Room count stepper
- Reservation Type
- Booking Source
- Business Source
- Market Segment
- Sales Person

Confirmed rate and booking controls:

- Contract
- Book All Available Rooms
- Quick Group Booking
- Complimentary Room
- Room Type
- Rate Type
- Room
- Adult
- Child
- Tax-inclusive Rate
- Add Room
- Add Discount

Confirmed guest fields:

- Existing Guest selector
- Full Name
- Add Guest
- Mobile
- Email
- Address
- Zip
- Country
- State
- City
- C Form

Confirmed communication and privacy controls:

- Email Booking Vouchers
- Send email at Check-out
- Access To Guest Portal
- Suppress Rate on Registration Card

Confirmed financial controls:

- Room Charges
- Guest
- Tax Exempt
- Payment Mode
- Cash/Bank
- City Ledger

Terminal actions shown but not used:

- Cancel
- Check-In
- Reserve

## Assign Rooms Drawer

Stay View's Assign Room action opens a temporary drawer.

Confirmed structure:

- Multi-day date strip
- Reservation/room assignment content area
- Empty state when there are no eligible unassigned reservations
- Close action

No room was assigned.

## Interaction Contract For GulfHero

The live demo and screenshot evidence now agree on this hierarchy:

1. Main pages own navigation, filters, counters, and lists/grids.
2. A record selection opens a temporary summary drawer.
3. Edit or operational actions can open a larger temporary workspace.
4. Nested actions such as payment, charge, discount, and task open another focused drawer/form.
5. Cancel or Close returns the user to the preserved parent state.
6. Save/post/check-in/check-out buttons are explicit terminal actions and must never be implied by opening a form.

GulfHero should preserve this state stack in routing and component architecture instead of rendering all layers permanently.

## Firewall Stop Condition

After the confirmed reservation pass, a rapid batch of direct route navigations triggered the site's temporary Sucuri IDS block (`TMP021`). The crawl stopped immediately. No bypass was attempted.

Resume rules:

- Reuse one authenticated browser session.
- Navigate through visible menus when a route depends on SPA state.
- Avoid rapid direct-route loops.
- Add a deliberate pause between page transitions.
- Complete one product area per pass.
- Stop immediately if the firewall warning returns.

## Remaining Deep-Crawl Queue

Still incomplete after this pass:

- Configuration tabs that previously blanked or reverted.
- Every report filter/result/export state.
- POS and partially confirmed marketplace/payment routes.
- Action-only states: Auto Stopsell, Rate Threshold, Channel Passwords, Exchange Rate, Exported Reports.
- Check-in, checkout, refund, void, delete, posting, night audit, and other terminal flows beyond their visible entry controls.
- Dropdown option catalogues and toggle-dependent conditional fields.

The reservation/search portion is now high coverage. The remaining work should be resumed as slower, module-specific passes after the temporary firewall block expires.
