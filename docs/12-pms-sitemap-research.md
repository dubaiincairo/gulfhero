# PMS Sitemap Research

Date: 2026-07-09
Source: `https://live.ipms247.com/unity/stayview`
Workspace: Gulf Hero
Status: Deep read-only crawl after PMS unlock

## Purpose

This document records the PMS sitemap and product-structure research captured from the live PMS. It is intended to support the Gulf Hero PMS build direction by documenting:

- Confirmed navigation hierarchy.
- Confirmed routes.
- Page-level tabs, sections, filters, controls, table headers, and safe form anatomy.
- Observations about how the PMS behaves.
- Gaps that are not yet included.
- Recommended next steps to reach a truly complete sitemap.

No destructive or operational actions were performed. The crawl avoided save, post, delete, void, payment, checkout, check-in, night-audit, and other live-changing flows. Live guest, customer, invoice, payment, and reservation values were intentionally not recorded.

## Executive Summary

The PMS is organized around these major areas:

- Operations: Dashboard, Stay View, Room View, Reservations, Inbox, Tasks.
- Rates and Availability: rate inventory, bulk updates, templates, packages/promotions.
- Distribution: channel logs, channel mapping, channel status, guest/channel messages.
- Guest: guest database, messages, requests, front desk operations, lost and found.
- Cashiering: cashiering center, cash drawer, travel agents, business sources, sales persons, companies, expenses, POS, payment reports.
- Housekeeping: house status, maintenance block, work order/task.
- Night Audit: run night audit and related audit/action tools.
- Configuration: property setup, master records, settings, booking engine, user management, Pulse AI.
- Reports: reservation, front office, back office, audit, statistical, graph/chart, and consolidated report catalogue.

The strongest confirmed coverage is at:

- Main navigation level.
- Route inventory level.
- List/table page level.
- First-rendered tab level for many config sections.
- Selected safe Add forms in configuration.

The remaining incomplete areas are mostly internal tabs that blanked/reverted during safe crawling, operational modals that could mutate live data, report run/result internals, and live record detail drawers.

## Methodology And Safety Notes

- Browser used: logged-in Chrome session with the PMS unlocked by the user.
- Exploration method: read-only DOM/snapshot extraction and safe navigation.
- Captured: visible navigation, route paths, tab names, page headings, page descriptions, filters, field labels, table headers, visible action names, and safe Add-form anatomy.
- Skipped intentionally:
  - Guest/reservation/payment row values.
  - Any flow that could create, update, post, void, delete, send, charge, run night audit, or alter PMS state.
  - Password/credential fields and private values.
- Important behavior observed:
  - Some config pages render only when opened through the sidebar/flyout, not by direct URL.
  - Some internal tabs exist but blank or revert after click in a safe crawl.
  - Several pages use SPA state and lazy hydration; direct route navigation sometimes shows only the app shell.
  - Some action items are JavaScript actions rather than stable links.

## Main PMS Navigation

### Stay View

Route: `/unity/stayview`

Confirmed structure:

- Counters:
  - All
  - Vacant
  - Occupied
  - Reserved
  - Blocked
  - Due Out
  - Dirty
- Controls:
  - Date picker
  - Rate plan dropdown
  - Assign Room
  - Room type grouping
- Main content:
  - Timeline grid by room type and date
  - Left column: Room Type
  - Date columns
- Footer/status:
  - Available Inventory
  - Occupancy %

### Room View

Route: `/unity/roomview`

Confirmed structure:

- Counters:
  - All
  - Vacant
  - Occupied
  - Reserved
  - Blocked
  - Due Out
  - Dirty
- Main content:
  - Room cards/tiles
  - Room number
  - Room type
  - Occupancy/status state

Live guest names were not recorded.

### Dashboard

Route: `/unity/dashboard`

Confirmed structure:

- Metric cards:
  - Arrival
    - Pending
    - Arrived
  - Departure
    - Pending
    - Checked Out
  - Guest In House
    - Adult
    - Child
  - Room Status
    - Vacant
    - Sold
    - Day Use
    - Complimentary
    - Blocked
- Activity feed

Live feed names/values were not recorded.

### Quick Access

Route: `/unity/quickaccess`

Confirmed shortcuts:

- Dashboard
- Add Reservation
- Rates & Inventory
- Reservations
- Innalytics

### Reservations

Route: `/unity/reservations`

Confirmed tabs:

- Reservations
- Arrivals
- Departures
- In-house

Confirmed actions:

- Make Group
- Export
- Search

Confirmed content:

- Reservation list/cards with reservation details.

Live reservation/guest values were not recorded.

### Inbox

Route: `/unity/inbox`

Confirmed views:

- Chat
- Task
- Dashboard

Confirmed controls/content:

- Notification search
- Saved-hours/credits panel
- Empty state

### Task List

Route: `/unity/tasklist`

Confirmed filters:

- Due date range
- Task for
- Status

Confirmed actions:

- Add Task
- Search
- Clear

Confirmed table columns:

- Guest Name
- Res No.
- Room
- Due By
- Stay Dates
- Entered By
- Alert
- Task For
- Message
- Status

## Sidebar Navigation Hierarchy

### Main Links

- Stay View: `/unity/stayview`
- Room View: `/unity/roomview`
- Reservations: `/unity/reservations`

### Rates And Availability

- Rates: `/unity/ratewizard/ratesinventory`
- Packages & Promotions: `/unity/packages`
- Rate Threshold: action/no confirmed stable route

### Distribution

- Auto Stopsell: action/no confirmed stable route
- Channel Logs: `/unity/channellogs`
- Channel Mapping Wizard: `/unity/channelmappingwizard`
- Channel Passwords: action/no confirmed stable route
- Guest Message: `/unity/guestmessage`

### Guest

- Guest Database: `/unity/guestdatabase`
- Front Desk Operations: `/unity/unsettledfolios`
- Lost and Found: `/unity/lostfound`

### Cashiering

- Cashiering Center: `/unity/cashieringcenter`
- Cash Drawer: `/unity/cashdrawer`
- Travel Agent Database: `/unity/travelagent`
- Business Source: `/unity/businesssource`
- Sales Person Database: `/unity/salesperson`
- Company Database: `/unity/company`
- Expense Voucher: `/unity/expensevoucher`
- POS: `/unity/POS`
- Exchange Rate: action/no confirmed stable route

### Housekeeping

- House Status: `/unity/housestatus`
- Maintenance Block: `/unity/maintenanceblock`
- Work Order/Task: `/unity/workorder`

### Night Audit

- Run Night Audit: action/modal, not opened
- Night Audit Log: action/no confirmed stable route
- Insert Transaction: action/no confirmed stable route

### Other

- B2B Marketplace:
  - `/unity/b2bmarketplace`
  - `/unity/b2bmarketplace/dashboard`
  - `/unity/b2bmarketplace/partners`
- Net Locks: action/no confirmed stable route
- Reports: `https://live.ipms247.com/index.php/page/cenreport.report?unity=1`
- Exported Reports: action/no confirmed stable route

## Route Inventory From App Bundle

Confirmed or discovered route paths:

- `/unity/`
- `/unity/dashboard`
- `/unity/quickaccess`
- `/unity/inbox`
- `/unity/reservations`
- `/unity/stayview`
- `/unity/roomview`
- `/unity/guestmessages`
- `/unity/guestrequest`
- `/unity/tasklist`
- `/unity/company`
- `/unity/salesperson`
- `/unity/travelagent`
- `/unity/businesssource`
- `/unity/overbooking`
- `/unity/housestatus`
- `/unity/housekeeping-settings`
- `/unity/maintenanceblock`
- `/unity/workorder`
- `/unity/cashieringcenter`
- `/unity/cashdrawer`
- `/unity/logout`
- `/unity/myAccount`
- `/unity/securityAdvisory`
- `/unity/guestStatistics`
- `/unity/userActivity`
- `/unity/reputationManagement`
- `/unity/lostfound`
- `/unity/expensevoucher`
- `/unity/POS`
- `/unity/unsettledfolios`
- `/unity/guestdatabase`
- `/unity/creditcardprocessing`
- `/unity/signeddocument`
- `/unity/profolis`
- `/unity/marketplace`
- `/unity/distributors/connect`
- `/unity/paymentprocessingreport`
- `/unity/bulkauthorization`
- `/unity/undotransaction`
- `/unity/ratewizard`
- `/unity/ratewizard/bulkupdate`
- `/unity/ratewizard/crsratesinventory`
- `/unity/ratewizard/distributionrates`
- `/unity/ratewizard/ratesinventory`
- `/unity/ratewizard/ratetemplate`
- `/unity/packages`
- `/unity/reports`
- `/unity/analytics`
- `/unity/budget`
- `/unity/competitoranalysis`
- `/unity/flashreport`
- `/unity/report`
- `/unity/weeklyreport`
- `/unity/rateupdatereport`
- `/unity/rulesconfig`
- `/unity/rulestriggeraudittrail`
- `/unity/smartpricingsettings`
- `/unity/settings`
- `/unity/l/:token`
- `/unity/*`

Config route base:

- `/unity/config/...`

Additional config routes discovered:

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
- `/unity/config/hotelinfo`
- `/unity/config/housekeeping`
- `/unity/config/identitytype`
- `/unity/config/integration`
- `/unity/config/channel-manager`
- `/unity/config/bookingengine`

## Account/User Dropdown

Confirmed menu items:

- Go to Booking Engine
- Go to Configuration
- Point of Sale
- Marketplace
- Security Advisory
- Need Help
- eZee University
- Help Yourself
- Logout

Account names and private values were not recorded.

## Rates And Availability Details

### Rates Inventory

Route: `/unity/ratewizard/ratesinventory`

Confirmed tabs:

- Inventory
- Rates
- Minimum Nights
- Maximum Nights
- Stopsells
- COA
- COD

Confirmed controls:

- Source selector
- Date selector
- Room type
- Base rates
- Extra adult rates
- Extra child rates
- Hide derived rate plans
- Rates inclusive tax
- Import
- Export
- Rate wizard tools
- Save
- Copy
- Sync

### Bulk Update

Route: `/unity/ratewizard/bulkupdate`

Confirmed tabs:

- Inventory
- Rates
- Minimum Nights
- Maximum Nights
- Stopsells

Confirmed controls:

- Source selector
- Date range
- Add Dates
- Next

### Rate Template

Route: `/unity/ratewizard/ratetemplate`

Confirmed content:

- Create Rate Template tab
- Active count
- Inactive count
- Create New Template
- Amount Rate Template
- Percentage Rate Template

### Packages And Promotions

Route: `/unity/packages`

Confirmed tabs:

- Active
- Inactive

Confirmed controls:

- Search Packages & Promotions
- Sync
- Create
- Empty state

## Distribution Details

### Channel Logs

Route: `/unity/channellogs`

Confirmed actions:

- Search
- Export

Confirmed columns:

- Source
- For Date
- Request Date & Time
- Process Date & Time
- Updated Value
- User
- Status

### Channel Mapping Wizard

Route: `/unity/channelmappingwizard`

Confirmed controls:

- Search channel by name/hotel code
- Sync All
- Connect New Channel

Confirmed columns:

- Channel
- Status
- Created By
- Modified By
- Action

### Channel Status

Confirmed columns:

- Channel Name
- Status

### Guest Message

Route: `/unity/guestmessage`

Confirmed structure:

- Guest Messages workspace
- Channel selector
- Channel message placeholder/image area

### Connect Distributors

Route: `/unity/distributors/connect`

Observation:

- Route exists.
- Direct safe read mostly showed app shell/blank.
- Likely requires in-app navigation state or permissions.

## Guest Details

### Guest Database

Route: `/unity/guestdatabase`

Confirmed filter groups:

- Location
- Guest Information
- Stay Information
- Stay Date
- Booking Source
- Hotel Related

Confirmed search:

- Quick Search by Name, Email, Contact

Confirmed actions:

- Add Guest
- Export
- Audit Trail
- Search
- Clear

Confirmed columns:

- Guest Name
- Country
- Email
- Phone
- Mobile
- VIP Status

Live guest values were not recorded.

### Guest Messages

Route: `/unity/guestmessages`

Confirmed filters:

- Show Delivered
- Entered Date/date range

Confirmed action:

- Add Message

Confirmed columns:

- Guest Name
- Res No.
- Room
- Message Date
- Entered By
- Msg For
- Message
- Status

### Guest Request

Route: `/unity/guestrequest`

Confirmed filters:

- Request Date
- Request Status
- Booking Status
- Request Type
- Reservation Date
- Room
- Room Type
- Quick Search by Reservation Number

Confirmed actions:

- Search
- Clear

Confirmed columns:

- Res #
- Guest Name
- Date
- Room
- Request
- Booking Status
- Status

### Front Desk Operations

Route: `/unity/unsettledfolios`

Confirmed action:

- Search

Confirmed columns:

- Folio #
- Reservation #
- Guest Name
- Arrival
- Departure
- Status
- Balance

### Lost And Found

Route: `/unity/lostfound`

Confirmed actions:

- Add Lost
- Add Found
- Search

Confirmed columns:

- Status
- Date
- Who Found
- Item Name
- Item Color
- Location
- Room

## Cashiering Details

### Cashiering Center

Route: `/unity/cashieringcenter`

Confirmed filters/controls:

- City Ledger selector
- Posting Date vs Departure Date
- Date range
- Pending Ledger Commission
- Display Void

Confirmed actions:

- Add New Payment
- Export
- Send Email
- Print

Confirmed metrics:

- City Ledger Total
- Unpaid Invoice
- Unassigned Payments
- Assigned Payments
- Opening Balance
- Closing Balance

Confirmed columns:

- Date
- Description
- Payment Type
- User
- Credit
- Debit
- Assigned
- Unassigned
- Balance

### Cash Drawer

Route: `/unity/cashdrawer`

Confirmed tabs:

- Drawers
- Cashier Report

Confirmed search/filters:

- Drawer name
- Assigned user
- Status/user filters

Confirmed actions:

- Audit Trail
- Create Drawer
- Reset

Confirmed columns:

- Drawer Name
- Assigned User
- Balance
- Last Opened
- Last Closed
- Status
- Actions

### Travel Agent Database

Route: `/unity/travelagent`

Confirmed search:

- Name
- Email
- Contact

Confirmed filters:

- Balance
- Credit Limit

Confirmed actions:

- Add Travel Agent
- Export
- Audit Trail
- Search
- Clear

Confirmed columns:

- Agent Name
- Name
- Country
- Phone
- Email
- Status
- Balance

### Business Source

Route: `/unity/businesssource`

Confirmed search:

- Name
- Short Code

Confirmed actions:

- Add Business Source
- Export
- Audit Trail

Confirmed columns:

- Short Code
- Business Source
- Color
- Status

### Sales Person Database

Route: `/unity/salesperson`

Confirmed search:

- Name
- Email
- Contact

Confirmed filters:

- Country
- City
- Status

Confirmed actions:

- Add Sales Person
- Export
- Audit Trail
- Search
- Clear

Confirmed columns:

- Sales Person
- Country
- Email
- Phone
- Mobile
- Status

### Company Database

Route: `/unity/company`

Confirmed search:

- Name
- Email
- Contact

Confirmed filters:

- Balance
- Credit Limit

Confirmed actions:

- Add Company
- Export
- Audit Trail
- Search
- Clear

Confirmed columns:

- Company
- Contact Person
- Country
- Email
- Phone
- Status
- Balance

### Expense Voucher

Route: `/unity/expensevoucher`

Confirmed filters:

- Hide Void
- Date range
- Search by Voucher No./Name/Type

Confirmed action:

- Add New

Confirmed empty/detail state:

- Click on the voucher to view details or Add New.

### POS

Route: `/unity/POS`

Observation:

- Route exists.
- Safe direct read mostly showed shell/global header.
- Needs more in-app navigation or POS-specific permission exploration.

### Payment Processing Report

Route: `/unity/paymentprocessingreport`

Observation:

- Route exists.
- Safe direct read mostly blank/shell.

## Housekeeping Details

### House Status

Route: `/unity/housestatus`

Confirmed view:

- House Status View

Confirmed actions:

- Print
- Export
- Settings
- Audit Trail

Confirmed columns:

- Room Type
- Pax
- House Status
- Assigned To
- Room Status
- Arrival Time
- Arrival
- Departure
- Nights
- Remarks

### Maintenance Block

Route: `/unity/maintenanceblock`

Confirmed filters:

- Block Date
- Room Type
- Room List
- Unblock Room
- Quick search by room/room type

Confirmed actions:

- Block Room
- Export
- Search
- Clear

Confirmed columns:

- Room
- Block From
- Block To
- Blocked On
- Blocked By
- Reason

### Work Order / Task

Route: `/unity/workorder`

Confirmed filters:

- Unit/Room
- Category
- Priority
- Status
- Assign To
- List Completed Tasks
- Quick search by Order #/Unit/Room/Category/Description

Confirmed actions:

- Add Task
- Export
- Search
- Clear

Confirmed columns:

- Order #
- Unit/Room
- Reservation/Folio
- Category
- Description
- Priority
- Assign To
- Entered On
- Updated
- Deadline
- Status

## Configuration Sitemap

### Config Root Menu

Route base: `/unity/config`

Confirmed root config menu:

- Property Setup
- Master
- Settings
- Booking Engine
- New Booking Engine
- User Management
- Pulse AI

### Property Setup Menu

Confirmed children:

- Hotel Profile: `/unity/config/profile`
- Room Type: `/unity/config/roomtype`
- Rate Type: `/unity/config/ratetype`
- Rate Plan: `/unity/config/rateplan`
- Tax: `/unity/config/taxes`

#### Hotel Profile

Route: `/unity/config/profile`

Confirmed tabs:

- Profile
- Highlights
- Amenities
- Photo Gallery
- Policies

Confirmed Profile tab sections/fields:

- General Settings
- Hotel Logo
- Preview
- Property Name
- Property Type
- Star Rating or Grade
- Official Email Address
- Primary Contact Number
- Reservation Contact Number
- Property Website
- Fax Number
- Primary Registration Number
- Additional Registration Number 1
- Additional Registration Number 2
- Additional Registration Number 3
- Additional Registration Number 4
- Address Information
- Street Address Line 1
- Street Address Line 2
- Country
- State / Province / Region
- City / Town
- Postal / Zip Code
- Latitude Coordinates
- Longitude Coordinates
- Map

Confirmed Profile tab controls:

- Property Type selector
- Star Rating/Grade selector
- Country selector
- State/Province/Region selector
- City/Town selector
- Locate on Map by coordinates
- Map camera controls
- Keyboard shortcuts

Observation:

- Profile tab rendered successfully.
- Highlights, Amenities, Photo Gallery, and Policies tabs were visible but did not render stable content during safe crawl.

#### Room Type

Route: `/unity/config/roomtype`

Confirmed page description:

- Defines room look, behavior, amenities, and occupancy settings.

Confirmed search:

- Search Room Type

Confirmed table columns:

- Room Type
- Base (A/C)
- Max (A/C)
- Action

Confirmed row actions:

- Status switch
- Edit
- Delete
- Info

Confirmed Add Room Type form:

- Section: Basic Information
- Room Type
- Short Code
- Number of Rooms
- Base Adult
- Base Child
- Max Adult
- Max Child
- Description
- Bed type selector
- View Type selector
- Room Size
- Overbooking limit
- Published in IBE yes/no
- Color
- Cancel
- Save

#### Rate Type

Route: `/unity/config/ratetype`

Confirmed page description:

- Manage and configure pricing structures and included services.

Confirmed search:

- Search Rate Type

Confirmed table columns:

- Rate Type
- Included Meal Plans
- Add-ons
- Action

Confirmed Add Rate Type form:

- Rate Type Name
- Short Code
- Does this rate type include meals?
- Does this rate type include chargeable add-ons?
- On/Off switches
- Cancel
- Save

#### Rate Plan

Route: `/unity/config/rateplan`

Confirmed page description:

- Manage pricing hierarchies, derived plans, and standalone rate configurations.

Confirmed concepts:

- Master: main/base rate; changes update derived plans.
- Derived: linked to a master plan; adjusts based on master rate.
- Independent: works independently; changes do not affect other plans.

Confirmed search:

- Search Rate Plan

Confirmed table columns:

- Rate Plan
- Base Rate
- Type
- Status
- Action

Observation:

- Add Rate Plan did not expose a standard Cancel/Save panel during safe crawl; likely a non-standard flow or multi-step UI.

#### Tax

Route: `/unity/config/taxes`

Confirmed page description:

- Build adaptive tax structures with percentage, fixed rates, slab rates, and exemption rules.
- Apply taxes across rooms, extras, and payouts.

Confirmed search:

- Search Tax

Confirmed table columns:

- Tax Name
- Tax Code
- Rule Type
- Applies To
- Validity
- Exemption
- Action

Confirmed row actions:

- Status switch
- Edit
- Delete
- Info

Confirmed Add Tax form:

- Add Taxes
- Tax Code
- Tax Name
- Start Date
- Exempt After Stay Duration
- Day(s)
- Rule
- Fixed percentage per night
- Apply After Other Taxes
- Do you want to apply tax on base rate?
- How should the tax be applied?
- Before Discount
- After Discount
- Apply Tax To
- Revenue Accounts
- Selected Accommodations
- Extras
- Partner Settlements (Payouts)
- Cancel
- Save

### Master Menu

Confirmed children:

- Payment: `/unity/config/paymentmethod`
- Extra Charge: `/unity/config/extracharge`
- Discount: `/unity/config/discount`
- Currency: `/unity/config/currency`
- Transport Type: `/unity/config/transporttype`
- Payouts: `/unity/config/payout`
- Meal Plan: `/unity/config/mealplan`
- Remark: `/unity/config/remarks`
- Market Segment: `/unity/config/marketsegment`
- Booking Source: `/unity/config/bookingsource`
- Holidays: `/unity/config/holidays`
- Reservation Type: `/unity/config/reservation-type`
- Guest Attributes: `/unity/config/guestattributes`

#### Payment

Route: `/unity/config/paymentmethod`

Confirmed search:

- Search Payment Method

Confirmed table columns:

- Payment Option Name
- Payment Method Type
- Action

Observation:

- Add Payment appeared to open a non-standard panel or did not expose the expected Cancel/Save form in the safe extractor.

#### Extra Charge

Route: `/unity/config/extracharge`

Confirmed search:

- Search Extra Charge

Confirmed table columns:

- Extra Charge
- Type
- Rate
- Action

#### Discount

Route: `/unity/config/discount`

Confirmed search:

- Search Discount

Confirmed table columns:

- Discount
- Apply To
- Type
- Action

#### Currency

Route: `/unity/config/currency`

Confirmed search:

- Search Country

Confirmed table columns:

- Country
- Currency Name
- Currency Code
- Currency Symbol
- Base Currency Value
- Target Currency Value
- Action

#### Transport Type

Route: `/unity/config/transporttype`

Confirmed page title:

- Pickup & Drop Off Services

Confirmed search:

- Search Transportation Mode

Confirmed table columns:

- Transport Type
- Action

#### Payouts

Route: `/unity/config/payout`

Confirmed page title:

- Manage Partner Settlements (Payouts)

Confirmed search:

- Search Payouts

Confirmed table columns:

- Payout Name
- Payout Code
- Tax
- Action

#### Meal Plan

Route: `/unity/config/mealplan`

Confirmed page description:

- Manage Meal Plans.
- Set what meals are included for guests during their stay.

Confirmed search:

- Search Meal Plan

Confirmed table columns:

- Short Code
- Meal Plan
- When does it apply?
- Action

#### Remark

Route: `/unity/config/remarks`

Confirmed search:

- Search Remark

Confirmed table columns:

- Remark
- Category
- Action

#### Market Segment

Route: `/unity/config/marketsegment`

Confirmed page title:

- Manage Market Segments

Confirmed search:

- Search Market Segment

Confirmed table columns:

- Market Segment
- Action

#### Booking Source

Route: `/unity/config/bookingsource`

Confirmed page title:

- Manage Booking Sources

Confirmed search:

- Search Source of Booking

Confirmed table columns:

- Source of Booking
- Action

#### Holidays

Route: `/unity/config/holidays`

Confirmed page title:

- Manage Holidays

Confirmed search:

- Search Holiday

Confirmed table columns:

- Holiday Name
- Holiday Date
- Highlight Color
- Action

#### Reservation Type

Route: `/unity/config/reservation-type`

Confirmed page title:

- Manage Reservation Types

Confirmed search:

- Search Reservation Type

Confirmed table columns:

- Reservation Type
- Booking Status
- Color
- Action

#### Guest Attributes

Route: `/unity/config/guestattributes`

Confirmed sections:

- Identity Type
- Guest Status

Confirmed searches:

- Search Identity Type
- Search Guest VIP Status

Confirmed Identity Type columns:

- ID Code
- Guest Identity Type
- Action

Confirmed Guest Status columns:

- Guest VIP Status
- Action

### Settings Menu

Confirmed children:

- General Settings: `/unity/config/general-settings`
- Notifications: `/unity/config/notifications`
- Documents: `/unity/config/documents`

#### General Settings

Route: `/unity/config/general-settings`

Confirmed tabs:

- Formats
- Language
- Reservations/Walk-in
- Automation
- Miscellaneous
- Calculations

Confirmed rendered tab: Formats

Confirmed sections/fields:

- Format Preferences
- Financial Year Settings
  - From
  - To
- Date / Time Settings
  - Time Zone
  - Date Format
  - Time Format
- Application Settings
  - Salutation
  - Identity Type
  - Nationality
  - Country
  - State Caption
  - Zip Code Caption
  - Round-Off Type
  - Round-Off Limit
  - Add Up Round Off To Rates
- Configure Weekend Days
  - SUN
  - MON
  - TUE
  - WED
  - THU
  - FRI
  - SAT
- Currency Settings
  - Symbol Position
  - Decimal Places
  - Example Display

Confirmed actions:

- Audit Trail
- Save

Observation:

- Language, Reservations/Walk-in, Automation, Miscellaneous, and Calculations tabs were visible but did not render stable content during safe crawl.

#### Notifications

Route: `/unity/config/notifications`

Confirmed tabs:

- Email
- Whatsapp
- Reports
- Guest
- Staff

Confirmed rendered tab: Email

Confirmed search:

- Search Guest Email

Confirmed Email table columns:

- Email Purpose
- Days / Trigger Timing
- Action

Observation:

- Whatsapp, Reports, Guest, and Staff tabs were visible but blanked during safe crawl.

#### Documents

Route: `/unity/config/documents`

Confirmed tabs:

- Registration Card Details
- Receipt & Credit Notes
- Folio/Invoice
- Miscellaneous

Confirmed rendered tab: Registration Card Details

Confirmed sections/fields:

- Choose Your Template
- Registration Card Template
- Settings
- Customize registration card number format
- Prefix
- Starting Index Number
- Select when to print guest registration card
- At Check-in
- Registration Card Notice
- Layout Settings
- Notice Box
- Suppress Rate on GR Card Template
- Show Sharers in Master Guest Registration Card Template
- Show Remark in Guest Registration Card Template
- Show Package Name Template
- Preview

Confirmed actions:

- Preview
- Audit Trail
- Save

Observation:

- Receipt & Credit Notes, Folio/Invoice, and Miscellaneous tabs were visible but blanked during safe crawl.

### Booking Engine

Route: `/unity/config/booking-engine`

Confirmed tabs:

- Booking Engine Summary
- Settings
- Analytics & Tracking
- Customization
- Preferences

Confirmed rendered tab: Booking Engine Summary

Confirmed content:

- Overview of Your Booking Engine
- Quick access to booking engine link, statistics, and preview
- What is My Booking Engine?
- Where Can I Find My Booking Engine?
- Booking engine link integration guidance

Confirmed action:

- Take Me to My Booking Engine

Observation:

- Settings, Analytics & Tracking, Customization, and Preferences tabs were visible but blanked during safe crawl.

### New Booking Engine

Route: `/unity/config/new-booking-engine`

Confirmed tabs:

- Settings
- Analytics & Tracking
- Configuration Completeness

Confirmed rendered tab: Settings

Confirmed sections/fields:

- Guarantee Setting
- Default Reservation Guarantee
- Payment Reservation Guarantee for incomplete booking
- Theme Setting
- Theme Color
- Competitive Advantage
- Pay at Hotel
- Direct Booking Discount
- Customise by Date
- Keep packages locked by default
- Guest Consent & Legal Compliance
- Require Hotel Policy & Terms acceptance

Confirmed actions:

- On/Off toggle
- Audit Trail
- Save

Observation:

- Further tab crawling did not hydrate reliably after tab switching.

### User Management

Route: `/unity/config/user-management`

Confirmed tabs:

- Users
- User Role
- Blocked Users
- Device Activity
- User Activity
- Security Preferences

Confirmed rendered tab: Users

Confirmed sections:

- User Management
- External Users

Confirmed search:

- Search User

Confirmed Users table columns:

- User Name
- User Role Name
- Email
- Action

Observation:

- User Role, Blocked Users, Device Activity, User Activity, and Security Preferences tabs were visible but blanked during safe crawl.

### Pulse AI

Route: `/unity/config/ai-settings`

Confirmed tabs/agents:

- Hotel QnA Agent
- Booking Agent
- Online Payment Agent
- Up-selling Agent
- Check-in Agent
- Housekeeping Agent
- Check-Out Agent

Confirmed content:

- Pulse AI
- Hotel QnA Agent
- Booking Agent
- Online Payment Agent
- Up-selling Agent
- Check-in Agent
- Housekeeping Agent
- Check-Out Agent
- Quick guide
- Example

Confirmed actions:

- On/Off toggle
- Open guest self check-in QR
- Open WhatsApp check-in QR

Observation:

- Detailed agent tab content did not hydrate reliably during safe crawl after switching.

## Reports Catalogue

Reports URL: `https://live.ipms247.com/index.php/page/cenreport.report?unity=1`

Only the report catalogue was captured. Individual report filter panels, generated result columns, and export settings were not fully crawled.

### Reservation Reports

- Arrival List
- Cancelled Reservation
- Country Wise Reservation Statistics
- Departure List
- No Show Reservation
- Release Reservation List
- Reservation Activity
- Void Reservation

### Front Office Reports

- Guest Checked In
- Guest Checked Out
- Guest List
- Guest Message
- Inclusion Report
- Inventory By Room Type
- Invoice Breakdown
- Night Audit
- Pickup Dropoff
- Room Availability
- Room Status Report
- Task List Report

### Back Office Reports

- Advance Deposit Ledger
- Ageing Debtors - Detail
- Ageing Debtors - Summary
- Cashier Sales Report
- City Ledger - Detail
- City Ledger - Summary
- Complimentary Room Report
- Credit Card Process - Detail
- Daily Extra Charge - Detail
- Daily Receipt - Detail
- Daily Receipt - Summary
- Daily Refund Report
- Daily Revenue
- Detail Discount Report
- Detail Revenue Report
- Expense Voucher
- Folio List
- Guest Ledger
- House Status
- Housekeeping Summary
- Maintenance Block
- Manager Report
- Meal Plan
- Meal Planner
- Owner Statement
- Rate Card
- Revenue By Rate Type
- Revenue By Room Type
- Room Type Wise Daily Room Revenue
- Transaction Detail Report
- Travel Agent Commission - Detail
- Travel Agent Commission - Summary
- Weekly Manager Report
- Weekly Meal Plan Report
- Work Order List

### Audit Reports

- Audit Trails
- Fiscal Transaction Audit Report
- IP Report
- Void Charge
- Void Payment
- Void Transaction

### Statistical Reports

- Business Analysis
- Contribution Analysis Report
- Monthly Country wise Pax Analysis
- Monthly Revenue By Income Stream
- Monthly Room Tax
- Monthly Statistics
- Monthly Summary
- Room Sale Statistics
- Room Statistics
- Rooms On Books
- Yearly Statistics
- Booking Source Wise Reservation Statistics
- Channelwise Bookings Report
- Mobile/Desktop Wise Reservation Statistics
- OTA Wise Monthly Breakdown
- Performance Analysis Report
- Revenue Analysis Report
- Source-wise Revenue Summary

### Graphs And Charts

- Monthly Occupancy
- Monthly Revenue
- Payment Summary
- Revenue By Rate Type Summary
- Statistics - By Room Type

### Consolidated Reports

- Daily Receipt - Detail
- Transaction Detail Report
- Business Analysis
- Contribution Analysis Report
- CRS Manager Report
- Guest Folio List
- High Balance Guest
- Monthly Statistics
- Reservation List
- Hotel Room Availability

## Parts Not Included Yet

These are the known missing or incomplete parts.

### Internal Tabs That Were Visible But Not Fully Rendered

- Hotel Profile:
  - Highlights
  - Amenities
  - Photo Gallery
  - Policies
- General Settings:
  - Language
  - Reservations/Walk-in
  - Automation
  - Miscellaneous
  - Calculations
- Notifications:
  - Whatsapp
  - Reports
  - Guest
  - Staff
- Documents:
  - Receipt & Credit Notes
  - Folio/Invoice
  - Miscellaneous
- Booking Engine:
  - Settings
  - Analytics & Tracking
  - Customization
  - Preferences
- New Booking Engine:
  - Analytics & Tracking
  - Configuration Completeness
- User Management:
  - User Role
  - Blocked Users
  - Device Activity
  - User Activity
  - Security Preferences
- Pulse AI:
  - Detailed agent settings for each AI agent tab

### Operational Modals And Action Flows Not Opened

These were not opened because they may change live operational state or expose sensitive data:

- Add Reservation
- Assign Room
- Check-in
- Checkout
- Payment
- Folio edits
- Void
- Refund
- Delete
- Send email/message
- Run Night Audit
- Insert Transaction
- Net Locks
- Auto Stopsell
- Rate Threshold
- Channel Passwords
- Exchange Rate
- Exported Reports

### Report Internals Not Fully Included

The report catalogue was captured, but not:

- Every report filter panel.
- Every report result table column.
- Export/download formats per report.
- Saved report settings.
- Report drilldowns.
- Generated report result layouts.

### Master Add/Edit Forms Not Fully Included

Only selected safe Add forms were captured. These still need deeper form mapping:

- Payment
- Extra Charge
- Discount
- Currency
- Transport Type
- Payouts
- Meal Plan
- Remark
- Market Segment
- Booking Source
- Holidays
- Reservation Type
- Guest Attributes

### Routes Partially Confirmed But Not Fully Mapped

- `/unity/POS`
- `/unity/marketplace`
- `/unity/b2bmarketplace`
- `/unity/distributors/connect`
- `/unity/paymentprocessingreport`
- `/unity/creditcardprocessing`
- `/unity/bulkauthorization`
- `/unity/undotransaction`
- `/unity/signeddocument`
- `/unity/profolis`
- `/unity/analytics`
- `/unity/budget`
- `/unity/competitoranalysis`
- `/unity/flashreport`
- `/unity/weeklyreport`
- `/unity/rateupdatereport`
- `/unity/rulesconfig`
- `/unity/rulestriggeraudittrail`
- `/unity/smartpricingsettings`

### Live Record Detail Pages Not Included

These were intentionally skipped to avoid collecting sensitive operational data:

- Guest profiles
- Reservation detail drawers
- Folio/invoice details
- Payment records
- Travel agent/company balances
- Housekeeping assignments with live names
- Task detail records
- Audit logs with user/IP/private details

### Dropdown Options And Conditional Fields Not Fully Included

The crawl captured field labels and selectors, but not every:

- Dropdown option.
- Select list value.
- Permission-tree checkbox.
- Conditional field revealed after choosing a value.
- Toggle-dependent sub-section.
- Hidden field shown only after selecting a workflow option.

## Product Observations For Gulf Hero

### Information Architecture

The PMS is dense and operations-first. The structure is closer to an enterprise back-office tool than a marketing SaaS app:

- Left navigation controls main operational domains.
- Configuration is a separate app-like area with its own sidebar and flyout menus.
- Many pages are table-first with search, export, audit trail, add/edit/delete/info actions.
- Operational screens rely heavily on counters, status chips, date controls, and tabbed worklists.

### Common Page Patterns

Reusable patterns worth designing in Gulf Hero:

- Toolbar:
  - Search input
  - Filter controls
  - Add button
  - Export button
  - Audit Trail button
  - Clear/Search actions
- Table shell:
  - Status toggle column
  - Name/code columns
  - Type/status/color columns
  - Action column with edit/delete/info
- Tabbed module:
  - Top tab row
  - One rendered detail view
  - Save/Audit Trail at bottom or header
- Config list page:
  - Title
  - Short description
  - Search
  - Add
  - Table
- Add/Edit drawer or modal:
  - Field labels
  - Required markers
  - Selectors
  - Toggle/radio controls
  - Cancel/Save

### UX Risks In The Source PMS

Observed issues that Gulf Hero can improve:

- Some pages are too stateful and do not direct-load cleanly.
- Internal tabs can blank or fail hydration.
- Configuration structure is powerful but nested and easy to lose context in.
- Action-only menu items without stable destinations can be harder for users to understand.
- Many tables expose sensitive values directly; Gulf Hero should design stronger privacy states and role-based visibility.
- Dense forms should be grouped into clearer sections with progressive disclosure.

## Recommended Next Steps

### 1. Create A Final Spreadsheet-Style Sitemap

Convert this document into a structured matrix with columns:

- Area
- Module
- Route
- Page
- Tab
- Section
- Controls
- Table columns
- Actions
- Add/Edit form fields
- Data sensitivity
- Completion status
- Notes

### 2. Run A Permissioned Deep Crawl For Missing Tabs

Use the unlocked PMS and manually verify the tabs that blanked:

- Open tab.
- Wait for hydration.
- Screenshot or DOM snapshot.
- Record fields.
- Return to parent page.

This may need manual interaction rather than route automation because the PMS appears to depend on SPA state.

### 3. Map Report Internals

For every report:

- Open report.
- Record filters.
- Record required/optional fields.
- Record result table columns using a safe date range or empty result.
- Record export/print actions.
- Avoid running reports that expose sensitive data unless explicitly approved.

### 4. Map Operational Modals In A Safe Test Property

Do this only in a sandbox/test PMS property, not live operations:

- Add Reservation
- Assign Room
- Check-in
- Checkout
- Payment
- Folio
- Refund
- Void
- Night Audit
- POS

### 5. Build Gulf Hero IA From Confirmed Patterns

Recommended Gulf Hero PMS top-level IA:

- Dashboard
- Reservations
- Stay/Room Operations
- Guests
- Cashiering
- Housekeeping
- Rates & Inventory
- Distribution
- Reports
- Configuration
- AI/Automation
- Marketplace/Integrations

### 6. Turn Sitemap Into Product Requirements

For each module, define:

- User roles.
- Primary job-to-be-done.
- Required list/table columns.
- Required filters.
- Required empty/loading/error states.
- Add/edit fields.
- Audit needs.
- Permission boundaries.
- Sensitive data handling.

## Completion Status

Current coverage estimate:

- Main navigation: high coverage.
- Route inventory: high coverage.
- Core operations page structure: medium-high coverage.
- Config list/table pages: high coverage.
- Config first-tab details: medium-high coverage.
- Internal hidden/blank tabs: incomplete.
- Add/edit forms: partial.
- Operational action flows: intentionally incomplete.
- Report catalogue: high coverage.
- Report internals: incomplete.
- Live record details: intentionally incomplete.

This file reflects 100% of the details captured so far, not 100% of every possible PMS screen.
