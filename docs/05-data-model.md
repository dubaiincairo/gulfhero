# 05 — Data Model

> The core schema. Written as annotated SQL-ish definitions; the real source of truth is `supabase/migrations/`. Conventions: snake_case, `id uuid primary key default gen_random_uuid()`, `created_at/updated_at timestamptz`, money as `*_cents integer` + `currency text`, business dates as `date`. Every tenant table has `property_id` with an RLS policy.

## Entity relationship overview

```
organization ─< property ─< room_type ─< room
                   │            │
                   │            ├─< rate_plan ─< daily_rate
                   │            │
                   ├─< guest    ├─< reservation ─< reservation_night
                   ├─< company ─┘       │
                   │                    ├─< folio ─< folio_item
                   │                    └─< reservation_event (via domain_events)
                   ├─< housekeeping_task
                   ├─< work_order
                   ├─< message_thread ─< message
                   ├─< cashier_session
                   ├─< daily_stats
                   ├─< ai_suggestion
                   └─< audit_log / domain_events
```

## Tables

### Tenancy & people

```sql
organization (id, name)                          -- Phase 5; created implicitly per signup
property (id, organization_id, name, slug, timezone, currency,
          business_date date,                    -- advanced by night audit only
          checkin_time, checkout_time, address jsonb, tax_ids jsonb,
          languages text[] default '{en,ar}', settings jsonb)

app_user (id ← auth.users, full_name, phone, locale, avatar_url)
property_member (property_id, user_id, role,     -- owner|manager|front_desk|housekeeping|accountant|night_audit
                 permissions_override jsonb, primary key (property_id, user_id))

guest (id, property_id, full_name, email, phone, nationality,
       id_type, id_number_enc bytea,             -- encrypted; masked in UI
       dob date, language, tags text[],          -- vip, blacklist…
       marketing_consent bool, notes, merged_into_guest_id)

company (id, property_id, name, kind,            -- corporate|travel_agent
         credit_limit_cents, commission_pct, contact jsonb, city_ledger bool)
```

### Rooms, rates, availability

```sql
room_type (id, property_id, code, name jsonb,    -- {"en": "...", "ar": "..."}
           description jsonb, base_occupancy, max_adults, max_children,
           amenities text[], photos text[], sort_order)

room (id, property_id, room_type_id, number, floor, features text[],
      hk_status,                                  -- clean|dirty|inspected
      condition,                                  -- in_service|out_of_service|out_of_order
      notes)

room_block (id, property_id, room_id, kind,       -- ooo|oos
            date_from, date_to, reason, work_order_id)

rate_plan (id, property_id, room_type_id, code, name jsonb,
           meal_plan,                             -- ro|bb|hb|fb
           refundable bool, cancellation_policy jsonb,
           derived_from_rate_plan_id, derivation jsonb,   -- e.g. {"offset_cents": 2500, "per": "person"}
           active bool)

daily_rate (property_id, rate_plan_id, date,
            price_cents, extra_adult_cents, extra_child_cents,
            min_stay, closed_to_arrival bool, closed_to_departure bool, stop_sell bool,
            primary key (rate_plan_id, date))

tax (id, property_id, name jsonb, kind,           -- percent|fixed_per_night|fixed_per_person
     rate_pct, amount_cents, applies_to,          -- room|extras|all
     inclusive bool, active bool)
```

Availability is **derived, not stored**: `available(room_type, date) = count(rooms in service) − count(blocks) − count(reservation_nights)`. Implemented as a SQL function + materialized per-day counts for the calendar UI. Allocation happens in `allocate_room()` (SECURITY DEFINER function, row-locks candidate rooms, inserts `reservation_night` rows atomically).

### Reservations & stays

```sql
reservation (id, property_id, code,               -- human-friendly e.g. GH-2026-00421
             status,                              -- inquiry|hold|confirmed|checked_in|checked_out|cancelled|no_show
             hold_expires_at,
             guest_id, company_id, group_id,      -- group master
             source,                              -- walk_in|phone|website|ota:<name>|corporate
             channel_ref,                         -- OTA confirmation no.
             adults, children, notes,
             checkin_date date, checkout_date date,
             room_type_id, rate_plan_id,
             room_id,                             -- null until assigned
             total_cents, currency,               -- quoted total, snapshot
             cancellation jsonb)                  -- reason, fee, actor, at

reservation_night (id, property_id, reservation_id, room_id, date,
                   price_cents, rate_plan_id,     -- price snapshot per night
                   unique (room_id, date))        -- ← the overbooking guard
```

`reservation_night` is the heart of inventory: one row per occupied room-night, unique on `(room_id, date)`. Moves/date-changes rewrite these rows inside the allocator transaction.

### Money

```sql
folio (id, property_id, reservation_id, guest_id, company_id,
       kind,                                      -- guest|company|split
       status,                                    -- open|settled|city_ledger
       invoice_number, invoice_issued_at)

folio_item (id, property_id, folio_id, kind,      -- room|extra|pos|tax|discount|payment|refund|adjustment
            description jsonb, quantity, unit_cents, total_cents,
            tax_snapshot jsonb,                   -- taxes as computed at posting time
            business_date date, posted_by, voided_by_item_id,
            payment_method,                       -- cash|card|bank|city_ledger (payment rows)
            payment_ref)

cashier_session (id, property_id, user_id, opened_at, closed_at,
                 opening_float_cents, counted_cents, expected_cents, variance_cents)

daily_stats (property_id, date, rooms_available, rooms_occupied,
             occupancy_pct, adr_cents, revpar_cents,
             revenue jsonb,                       -- {room, extras, pos, tax}
             arrivals, departures, no_shows, cancellations,
             primary key (property_id, date))     -- written by night audit; reports read this
```

### Operations

```sql
housekeeping_task (id, property_id, room_id, business_date, kind, -- departure_clean|stayover|inspection
                   assigned_to, status,           -- pending|in_progress|done|skipped
                   priority int,                  -- AI-computed, lower = sooner
                   notes, photos text[], completed_at)

work_order (id, property_id, room_id, title, description, photos text[],
            priority, status,                     -- open|in_progress|resolved
            reported_by, assigned_to, resolved_at)
```

### Communication & AI

```sql
message_thread (id, property_id, guest_id, reservation_id, channel) -- email|whatsapp
message (id, thread_id, direction,                -- inbound|outbound
         body, language, status,                  -- draft|sent|delivered|failed
         ai_drafted bool, approved_by, external_ref, created_at)

message_template (id, property_id, trigger,       -- confirmation|pre_arrival|welcome|checkout|review_request
                  channel, subject jsonb, body jsonb, enabled bool, send_offset interval)

ai_suggestion (id, property_id, kind,             -- rate|upsell|housekeeping_priority|digest
               subject jsonb,                     -- e.g. {rate_plan_id, date}
               payload jsonb,                     -- suggested value + explanation
               status,                            -- pending|accepted|dismissed|expired
               acted_by, acted_at, created_at)
```

### Platform

```sql
domain_events (id bigint identity, property_id, event_type, entity_type, entity_id,
               payload jsonb, actor_user_id, created_at)   -- append-only
audit_log     -- view over domain_events filtered to mutations, powering history timelines
booking_engine_settings (property_id pk, theme jsonb, photos, policies_copy jsonb, deposit_rule jsonb)
integration (id, property_id, kind,               -- stripe|twilio|resend|ical|channel_partner
             config_enc bytea, status)
ical_feed (id, property_id, room_type_id, direction, url, last_sync_at, sync_errors int)
```

## Invariants (enforce with constraints/tests)

1. `unique (room_id, date)` on `reservation_night` — no double allocation, ever.
2. `reservation.checkout_date > reservation.checkin_date`.
3. A `checked_in` reservation has `room_id` set and nights allocated for its full range.
4. Folio balance = Σ(charge items) − Σ(payment items); a `settled` folio balances to 0 (or routes remainder to a city-ledger folio).
5. `folio_item` rows are immutable once `business_date < property.business_date` (post-audit) — corrections are new adjustment rows.
6. `daily_stats` rows are written once by night audit and never updated by reports.
7. Every write to a tenant table passes RLS: `property_id IN (SELECT property_id FROM property_member WHERE user_id = auth.uid())`.
