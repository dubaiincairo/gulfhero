# 04 — Architecture & Stack

> Chosen specifically for **AI vibe coding**: mainstream, extremely well-documented technologies that Claude knows deeply, minimal moving parts, managed infrastructure, and strong type safety so AI mistakes surface at compile time instead of production.

## Stack summary

| Layer | Choice | Why (vibe-coding lens) |
|---|---|---|
| Web framework | **Next.js (App Router) + TypeScript** | One codebase for UI + server logic; Server Actions remove API boilerplate; the framework Claude has seen the most |
| UI | **Tailwind CSS + shadcn/ui + lucide-react** | AI generates consistent, good-looking UI reliably; components are copied into the repo so they're editable; first-class RTL support |
| Database | **PostgreSQL on Supabase** | Managed Postgres + auth + realtime + storage in one; SQL migrations are AI-legible; RLS gives defense-in-depth multi-tenancy; generous free tier for development |
| Auth | **Supabase Auth** | Email/password + invites out of the box; session handling solved, not hand-rolled |
| Data access | **Supabase JS (server) + generated types**; heavy logic in **Postgres functions** where transactional (e.g., allocation) | Generated `database.types.ts` keeps AI honest about the schema |
| Validation | **zod** on every Server Action boundary | Catches AI-generated call-site drift immediately |
| AI | **Anthropic Claude API** (`@anthropic-ai/sdk`); tool-use for the copilot | See doc 07; one `lib/ai/` gateway, model IDs in env |
| Realtime | **Supabase Realtime** (tape chart, housekeeping board) | No websocket infra to build |
| Email | **Resend** (transactional + inbound parsing) | Simple API, React email templates |
| WhatsApp/SMS | **Twilio** (WhatsApp Business API) | Standard, well-documented |
| Payments | **Stripe** first; provider interface so regional gateways (Paymob, Tap, HyperPay) plug in later | Stripe's docs/types are AI-friendly; MENA needs come later via the interface |
| Charts | **Recharts** | Simple, AI-reliable |
| i18n | Lightweight dictionary in `lib/i18n/` (en/ar) + `dir="rtl"` handling | Avoid heavy i18n frameworks; a dictionary is easy for AI to maintain |
| Tests | **Vitest** (unit: money, availability, state machine) + **Playwright** (E2E: booking→checkout happy path) | Fast feedback loops for AI self-verification |
| Hosting | **Vercel** (app) + **Supabase** (data) | Zero DevOps; preview deployments per branch |
| Jobs/cron | **Vercel Cron** → route handlers (night-audit reminders, message journeys, rate suggestions); Supabase `pg_cron` for DB-side jobs | No queue infrastructure in v1 |

Monorepo not needed: **one Next.js app** serves the staff dashboard (`app/(dashboard)`), the public booking engine (`app/book/[slug]`), and the guest portal (`app/stay/[token]`). Split later only if scale demands.

## System diagram

```mermaid
flowchart TB
  subgraph Clients
    FD[Front-desk PC / phone<br/>staff PWA]
    GD[Guest device]
  end
  subgraph Vercel["Vercel — one Next.js app"]
    DASH["app/(dashboard)<br/>staff screens + Server Actions"]
    BOOK["app/book/[slug]<br/>public booking engine"]
    PORTAL["app/stay/[token]<br/>guest portal"]
    API["app/api<br/>webhooks + cron routes"]
    LIB["lib/: state machine · availability ·<br/>money · policies · ai gateway"]
  end
  subgraph Supabase
    PG[(PostgreSQL<br/>RLS + allocate_room() + domain_events)]
    AUTH[Auth]
    RT[Realtime]
    ST[Storage: room photos,<br/>guest docs private]
  end
  subgraph External
    CLAUDE[Anthropic Claude API]
    STRIPE[Stripe]
    RESEND[Resend email]
    TWILIO[Twilio WhatsApp]
    OTA[iCal feeds / channel partner]
  end
  FD --> DASH
  GD --> BOOK & PORTAL
  DASH & BOOK & PORTAL --> LIB --> PG
  DASH <-.live updates.-> RT --- PG
  DASH & PORTAL --> ST
  DASH --> AUTH
  LIB --> CLAUDE
  API <--> STRIPE & RESEND & TWILIO & OTA
  API --> LIB
```

## Architecture principles

1. **The database is the source of truth and the last line of defense.**
   - All tenant tables carry `property_id`; RLS policies enforce isolation even if app code has a bug.
   - Inventory allocation is a **Postgres function** running in a transaction with row locks: `allocate_room(reservation_id, room_type, dates)` fails atomically on conflict → overbooking is impossible from any code path (front desk, booking engine, future channel sync all call it).
   - Money invariants enforced with constraints + computed balances.

2. **State machines over status columns.** Reservation and room-status transitions live in one module with explicit side effects (folio creation, housekeeping tasks, emails, audit rows). AI sessions extend the machine, never bypass it.

3. **Event log from day one.** `domain_events` table (event_type, entity, payload, actor, ts). Audit UI, message journeys, daily digests, and future integrations (door locks, channel managers) all consume events. Cheap to write now, expensive to retrofit.

4. **Business date ≠ calendar date.** `property.business_date` advances only at night audit. All operational queries ("today's arrivals") use business date in property timezone.

5. **AI at the edges, deterministic at the core.** AI suggests (prices, messages, priorities); deterministic code decides and records. Every AI action is previewable, attributable, and reversible. No AI call sits on the critical path of check-in or payment.

6. **Vertical slices.** Each roadmap step ships DB migration → server action → UI → test for one capability. Never scaffold 10 empty modules.

## Repo layout

```
gulfhero/
├── app/
│   ├── (dashboard)/            # staff app (auth required)
│   │   ├── page.tsx            # tape chart + Today panel
│   │   ├── reservations/
│   │   ├── calendar/           # rate calendar (ARI)
│   │   ├── housekeeping/
│   │   ├── guests/
│   │   ├── billing/
│   │   ├── reports/
│   │   ├── settings/
│   │   └── copilot/            # AI copilot surface (also a global drawer)
│   ├── book/[slug]/            # public booking engine
│   ├── stay/[token]/           # guest self-service portal
│   └── api/                    # webhooks (stripe, twilio, resend) + cron routes
├── components/                 # shared UI (ui/ = shadcn, charts/, tape-chart/)
├── lib/
│   ├── supabase/               # server/client helpers
│   ├── reservations/state.ts   # THE state machine
│   ├── availability/           # availability + allocation wrappers
│   ├── money/                  # cents math, tax calc, currency format
│   ├── ai/                     # Claude gateway, tools, prompts
│   ├── i18n/                   # en.ts, ar.ts dictionaries
│   └── database.types.ts       # generated from Supabase
├── supabase/
│   ├── migrations/             # numbered SQL migrations
│   └── seed.sql                # demo hotel (24 rooms, bookings, guests)
├── e2e/                        # Playwright
└── docs/                       # this documentation
```

## Environments & config

- `.env.local` (dev) / Vercel env vars (prod): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only), `ANTHROPIC_API_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `TWILIO_*`.
- Two Supabase projects: `gulfhero-dev`, `gulfhero-prod`. Migrations applied via Supabase CLI (`supabase db push` in dev, CI-gated for prod).
- Seed data keeps a believable demo hotel alive so every vibe-coding session can *see* the product.

## Security & compliance checklist (applies from Phase 0)

- RLS on every table; service-role key never in client bundles; permission checks in Server Actions *and* RLS.
- Guest PII (passport/ID numbers) encrypted at rest (pgcrypto) and masked in UI by default; ID images in a private storage bucket with signed URLs.
- Rate limiting on public endpoints (booking engine, portal) via middleware.
- Webhooks verified (Stripe signatures, Twilio auth).
- Audit log is append-only (no UPDATE/DELETE grants).
- Backups: Supabase PITR on prod; export job for property data portability.

## Cost profile (single property, early days)

Vercel Hobby/Pro + Supabase Pro (~$25) + Claude API usage (copilot/messaging, expect $5–30/property/month at small scale) + Resend/Twilio per-use ⇒ comfortably under the $100/month target in `docs/02`.
