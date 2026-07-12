# PMS Screenshot Groups

Source: Google Drive folder `1iDBSQLXFPSoji7SwI9TvT4ChPVV7Vpab`

Local raw mirror: `drive-screens/`  
Local organized library: `organized-screenshots/`  
Group contact sheets: `organized-screenshots/_group-sheets/`

## Inventory

Total screenshots studied: 177.

Original Drive batches:
- Folder `1`: 20 screenshots
- Folder `2`: 44 screenshots
- Folder `3`: 50 screenshots
- Folder `4`: 30 screenshots
- Folder `5`: 22 screenshots
- Folder `6`: empty
- Folder `Search inside eZee`: 11 screenshots

The organized library uses symlinks so the raw screenshots remain untouched.
All 177 screenshots are assigned exactly once across groups `00` through `10`.
Group `11` contains 6 duplicate reference links for reusable drawer patterns.

## Groups

### 00. Home / Login / Subscription

Path family:
- `/login`

Contains:
- Login/entry screens
- Subscription warning modal

Design role:
- Not part of the operating PMS workspace, but useful for account/session entry state.

### 01. Reservation View

Path family:
- `/unity/reservations`

Contains:
- Reservation board cards
- Reservation list/table view
- Arrivals, Departures, In-house tabs
- Manage columns menu
- Export menu
- Reservation search side drawer
- Left module switcher from reservation context
- Insert transaction/add reservation style form

Design role:
- This should become the main reservation command center.
- Tabs and view toggles are first-class controls.
- Search/filter should be a temporary side drawer, not permanent.

### 02. Stay View

Path family:
- `/unity/stayview`

Contains:
- Stay timeline grid by room type/date
- Hotel/property selector
- Business source selector
- Booking status legend/dropdown
- Assign room/add reservation actions

Design role:
- Operational stay planning view.
- It is related to reservations but should stay separate from the reservation list.

### 03. Room View

Path family:
- `/unity/roomview`

Contains:
- Room card grid
- Date picker
- Occupancy/status filters such as Due Out and Dirty

Design role:
- Live physical room-state surface.
- Should feel more like a control board than a reservation table.

### 04. Distribution / Rates / Channels

Path families:
- `/unity/ratewizard/ratesinventory`
- `/unity/channelmappingwizard`
- `/unity/b2bmarketplace`
- `/unity/b2bmarketplace/partners`
- `/unity/channellogs`

Contains:
- Inventory, Rates, Minimum Nights, Maximum Nights, Stopsells, COA, COD tabs
- Connected channels
- Channel mapping wizard
- Channel password drawer
- System alerts drawer
- Overbooking drawer
- Channel list drawer
- B2B marketplace and partners
- Channel logs with search/export

Design role:
- This is the revenue/distribution working area.
- Rate grid remains the dense spreadsheet-like page.
- Channel and alert panels are contextual drawers.

### 05. Packages / Promotions

Path family:
- `/unity/packages`

Contains:
- Packages and promotions list
- Create package/promotion side drawer
- OTA promotion setup
- Basic promotion forms
- Last-minute/advanced purchase packages
- Minimum/maximum stay packages
- Rate threshold and auto-stop-sell drawers

Design role:
- Belongs under distribution/revenue, but deserves its own grouped design reference.

### 06. Cashiering / POS

Path families:
- `/unity/cashieringcenter`
- `/unity/cashdrawer`
- `/unity/expensevoucher`
- `/unity/POS`

Contains:
- Cashiering center
- City ledger/payment flow
- New payment drawer
- Cash drawer list and create drawer
- Cashier report
- Expense voucher
- Incidental invoice/POS
- Exchange rate drawer

Design role:
- Financial operations area.
- Drawers here are transaction-entry panels and must be action-triggered.

### 07. Configuration

Path families:
- `/unity/config/user-management`
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

Contains:
- User management and user role permissions
- Blocked users, device activity, user activity, security preferences
- Hotel profile policies
- Room/rate/tax/payment setup
- Extras, discounts, currency, transport, payout, meals, remarks
- Market segments, booking sources, holidays, reservation types, guest attributes
- General settings, notifications, document templates

Design role:
- Admin/setup area.
- Many pages use the same pattern: tabbed section, table/list body, right-side add/edit drawer.

### 08. Guest / CRM / Partners

Path families:
- `/unity/guestmessage`
- `/unity/guestdatabase`
- `/unity/travelagent`
- `/unity/businesssource`
- `/unity/salesperson`
- `/unity/company`

Contains:
- Guest messages
- Guest database and add guest form
- Travel agent database and add travel agent drawer
- Business source list and drawer
- Sales person form
- Company database and add company drawer

Design role:
- People, accounts, partner, and guest data.
- Can sit near reservations in the IA but should not be mixed into the reservation board itself.

### 09. Operations / Housekeeping

Path families:
- `/unity/frontdesktodoes`
- `/unity/lostfound`
- `/unity/housestatus`
- `/unity/housekeeping-settings`
- `/unity/maintenanceblock`
- `/unity/workorder`

Contains:
- Front desk operations search
- Lost and found
- House status view
- Housekeeping settings
- Maintenance block list
- Work order/task list
- Add task drawer
- Audit trail drawer

Design role:
- Daily operational execution area.
- This is closer to service/housekeeping workflow than configuration.

### 10. Global Search / Reservation Detail

Path family:
- `/unity/dashboard`

Contains:
- Global search bar with active query
- Search result tabs for Bookings, Guest, Business Source, Travel Agent, and Company
- Booking result preview
- Guest result preview
- Company result preview
- Reservation detail panel after selecting a result
- Reservation detail tabs: Folio Operations, Booking Details, Guest Details, Room Charges, Credit Card, Tasks, and Audit Trail

Design role:
- This is the main global search experience.
- Search results should appear as a temporary overlay/dropdown from the global search bar.
- Selecting a booking result opens the reservation detail workspace.
- The reservation detail view should be treated as a real page/state, not just a small popup.

### 11. Side Drawers / Cross-Cutting

Path families:
- Cross-cutting across the PMS

Contains:
- Reservation search side drawer
- Front-desk search side drawer
- User-role edit drawer
- Package creation drawer
- Channel-log search drawer

Design role:
- This is not a separate PMS module.
- It is a reusable interaction pattern group.
- Any screenshot showing a popup/drawer should be implemented as a contextual overlay triggered by user action, not as a permanent page column.

## Product Map Summary

The PMS should follow this high-level desktop IA:

1. Home / Session
2. Global Search
   - Search across bookings, guests, companies, travel agents, and business sources
   - Reservation Detail / Folio workspace
3. Front Desk
   - Reservation View
   - Stay View
   - Room View
4. Distribution / Revenue
   - Rates and Inventory
   - Channel Mapping
   - Channel Logs
   - B2B Marketplace
   - Packages and Promotions
5. Cashiering
   - Cashiering Center
   - Cash Drawer
   - Expense Voucher
   - POS / Incidental Invoice
6. Guest / CRM
   - Guest Database
   - Guest Messages
   - Travel Agents
   - Business Sources
   - Companies
   - Sales People
7. Operations
   - Front Desk Operations
   - Lost and Found
   - House Status
   - Housekeeping
   - Maintenance Block
   - Work Orders
8. Configuration
   - Hotel Profile
   - User Management
   - Room, Rate, Tax, Payment, Document, Notification, and General Settings

## Implementation Notes

- Desktop only for now.
- The global top bar and quick search are persistent.
- Module navigation is persistent.
- Page tabs are local to the current module.
- Side drawers are temporary overlays opened by explicit buttons.
- Search/filter drawers are temporary overlays.
- Do not make drawer/popup screenshots into permanent page panels.
