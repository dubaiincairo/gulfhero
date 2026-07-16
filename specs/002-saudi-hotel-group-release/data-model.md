# Data Model: Saudi Hotel Group First Release

This is the target domain model for the First Paid Saudi Release. It extends,
but does not activate, the prototype's current Supabase scaffolding. Every
operational/configuration entity is scoped to a single property unless noted.

## Ownership and access

### Hotel Group

| Field | Notes |
|---|---|
| `id` | Immutable identifier |
| `name` | Customer organisation name |
| `status` | Active or suspended customer account |

One Hotel Group owns one or more Properties. It is an organisational boundary,
not a permission shortcut.

### Property

| Field | Notes |
|---|---|
| `id`, `hotel_group_id` | Identity and owner |
| `name`, `code`, `timezone` | Operational display context |
| `currency_code` | Defaults to SAR; property-configurable |
| `business_date` | Controlled operational date; no Night Audit execution in this release |

### Profile and User-Property Assignment

| Field | Notes |
|---|---|
| `profile_id` | Authenticated paid-release user |
| `property_id` | Explicit property assignment |
| `role` | One of the seven fixed roles |
| `active_at`, `inactive_at` | Assignment lifecycle |

The unique key is `(profile_id, property_id)`. A user may have many rows, but
only one selected property context is active in each operational session.

## Property configuration

### Property Settings and Tax Rule

Property Settings contains policies that are not global defaults: cashier-close
policy, operational timezone, default currency, and feature flags. Tax Rule has
`name`, `kind`, `rate`, `effective_from`, `effective_to`, and active state.
Rates and taxes are never retroactively re-applied to already confirmed or
posted facts.

### Room Type, Room, and Room Block

Room Type holds capacity and sale configuration. Room holds a verified room
number, type, operational status, and readiness state. Room Block has a room,
start/end date, block type, reason, actor, and status. Out-of-order blocks
remove inventory; other readiness states influence room assignment, not the
historical reservation record.

### Rate Plan and Daily Rate

Rate Plan belongs to a property and may have a derived-plan relationship. Daily
Rate holds property, rate plan, room type, date, price in minor SAR units,
restrictions, and effective audit context. The unique key includes property,
rate plan, room type, and date.

### Company and Travel Agent

Both are property-owned masters. They have operating name, active state,
contact fields limited to necessary business data, and optional applicable rate
plan/policy references. They do not become group-shared records in version one.

## Stay and inventory

### Guest

Guest belongs to a property and stores only the identity/contact data required
by an approved paid-release workflow. It includes a synthetic-fixture marker
for demo data. Potential duplicate links and a manual merge audit trail are
separate records; never silently merge a guest.

### Reservation

| Field | Notes |
|---|---|
| `id`, `property_id`, `confirmation_code` | Identity and property scope |
| `guest_id`, `company_id`, `travel_agent_id` | Applicable parties |
| `arrival_date`, `departure_date` | Departure must be later than arrival |
| `status` | Draft/option, confirmed, checked-in, checked-out, cancelled, or no-show |
| `source`, `created_by` | Operational provenance |
| `pricing_snapshot` | Confirmed rate/tax facts |

### Reservation Night and Room Assignment

Reservation Night represents each sellable date in a stay, including rate and
tax snapshots. A room allocation uses a unique `(room_id, stay_date)` key to
prevent two confirmed stays from consuming the same room-night. A reservation
may be confirmed before a physical room is selected, but its confirmation still
uses an authoritative room-type availability transaction.

**State transitions**: Draft/Option → Confirmed → Checked-in → Checked-out;
Confirmed or Checked-in → Cancelled only under the controlled policy; Confirmed
→ No-show. Every sensitive transition creates audit evidence and required
reversals or releases of inventory.

## Front desk and financial control

### Folio

One or more property-scoped folios attach to a reservation or permitted
company account. It has `open`, `closed`, and controlled adjustment states;
its displayed balance is derived from postings, not treated as an editable
source of truth.

### Folio Posting

| Field | Notes |
|---|---|
| `id`, `folio_id`, `property_id` | Ownership |
| `kind` | Charge, payment, adjustment, reversal, or void marker |
| `amount_minor`, `currency_code`, `tax_snapshot` | Financial facts |
| `posted_at`, `posted_by`, `cashier_session_id` | Provenance |
| `reverses_posting_id`, `reason` | Correction trace |

Posted rows are append-only. A void or correction writes a linked reversal or
adjustment; it does not update/delete the original posting.

### Cashier Session

Cashier Session belongs to a property and a user, has open/close timestamps,
opening float, counted close, variance, reason where necessary, and controlled
status. It supports internal payment recording only; no bank or payment-gateway
connection is modelled.

## Operations and evidence

### Housekeeping Task

Housekeeping Task belongs to a property and optional room/reservation. It has
status, assignee, priority, timestamps, and room readiness outcome. Room status
transitions are controlled and appear in the audit log.

### Audit Entry

Audit Entry is immutable and property-scoped. It contains actor, role at time
of action, operation, entity identity, before/after structured payloads,
reason, confirmation result, canonical timestamp, and correlation identifier
for a transaction. Its updates and deletes are forbidden.

### Report Snapshot (when needed)

Reports query property-scoped transactional facts and may save a read-only
snapshot with selected period, data cut-off, generated timestamp, and report
parameters. A report never combines another property unless a later approved
feature adds a group dashboard.

## Relationship and integrity rules

```text
Hotel Group 1 ── * Property 1 ── * User-Property Assignment * ── 1 Profile
                         │
                         ├── * Configuration / Guest / Company / Travel Agent
                         ├── * Room Type ── * Room ── * Room Block
                         ├── * Rate Plan ── * Daily Rate
                         ├── * Reservation ── * Reservation Night
                         │                         └── 0..1 Room per stay date
                         ├── * Folio ── * Folio Posting ── 0..1 Cashier Session
                         ├── * Housekeeping Task
                         └── * Audit Entry
```

1. Every protected read and write validates the selected user-property
   assignment through row-level security and the fixed capability matrix.
2. Every table containing property data includes `property_id`, an ownership
   index, and a property-membership policy.
3. Confirmed availability is allocated transactionally. UI availability is
   advisory until the confirmation transaction succeeds.
4. Posted financial facts and audit facts are immutable. Corrections are new,
   linked facts.
5. Rate/tax snapshots and report data cut-offs preserve historical truth.
6. Demo fixtures never reuse real guest, payment, or third-party records.
