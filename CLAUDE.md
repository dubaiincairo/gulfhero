# CLAUDE.md — GulfHero PMS

Guidance for AI coding sessions (Claude Code) working in this repository.

## What this project is

GulfHero is an AI-native hotel Property Management System (PMS) inspired by eZee Absolute but with better UI/UX, built-in AI features, and a staff-first design. All product decisions are documented in `docs/`. The build order lives in `docs/06-build-roadmap.md` — follow it unless the user says otherwise.

## Tech stack (fixed — do not substitute without asking)

- **Framework:** Next.js (App Router) + TypeScript, single app in `app/`
- **Styling/UI:** Tailwind CSS + shadcn/ui components; icons from lucide-react
- **Database:** PostgreSQL on Supabase; schema managed with SQL migrations in `supabase/migrations/`
- **Auth:** Supabase Auth (email/password + invite flow); roles enforced with RLS + server-side checks
- **Data access:** Server Components / Server Actions using the Supabase server client; generated DB types in `lib/database.types.ts`
- **AI:** Anthropic Claude API via `@anthropic-ai/sdk`; all AI calls go through `lib/ai/` (never call the API directly from components)
- **Realtime:** Supabase Realtime for live tape chart / housekeeping updates
- **Testing:** Vitest for unit tests (`*.test.ts` beside source), Playwright for E2E in `e2e/`
- **Hosting:** Vercel

## Conventions

- **Multi-tenancy is sacred.** Every business table has `property_id`. Every query MUST be scoped by property. RLS policies enforce this at the DB level — never bypass with the service-role key in request handlers unless the operation is explicitly cross-property (e.g., group dashboards) and permission-checked.
- **Money:** store as integer minor units (`amount_cents`) with a `currency` column. Never use floats for money.
- **Dates:** hotel business dates (check-in, check-out, rate dates) are `DATE` columns in the property's timezone — not timestamps. Timestamps (`timestamptz`) only for audit/event times.
- **Reservation state machine** lives in `lib/reservations/state.ts`. Never change a reservation status by writing the column directly from UI code — go through the transition functions so folio/housekeeping/audit side-effects fire.
- **Server Actions** for all mutations; keep them in `app/**/actions.ts` files, validated with zod.
- **Components:** presentational components in `components/`, feature logic co-located under `app/(dashboard)/<feature>/`.
- **Naming:** snake_case in the database, camelCase in TypeScript, kebab-case file names.
- **Every schema change** = a new migration file + regenerate `lib/database.types.ts` + update `docs/05-data-model.md` if the shape of a core entity changed.

## UX rules (these are product requirements, not suggestions)

- The front-desk tape chart is the home screen. Common actions (check-in, check-out, new booking, assign room) must be reachable in ≤ 2 clicks from it.
- Every list screen needs: search, empty state, loading skeleton, and keyboard navigation.
- Destructive actions (cancel reservation, void charge) always confirm and always write to `audit_log`.
- All screens must work at 1280px (front-desk PC) and 390px (phone) widths.
- Support English and Arabic (RTL). Use the i18n dictionary in `lib/i18n/`; never hard-code user-facing strings once Phase 0 step 0.6 is done.

## Working style

- Before building a feature, read: its roadmap step in `docs/06-build-roadmap.md`, the same step number in `docs/10-technical-execution-plan.md` (exact migrations/files/tests — follow the reserved migration numbering), the screen spec in `docs/09-screen-specs.md`, the module spec in `docs/03-feature-specs.md`, and the live PMS evidence in `docs/12-pms-sitemap-research.md` plus `docs/13-pms-screenshot-sitemap-crosswalk.md` (`docs/07-ai-features.md` for AI features).
- **eZee Absolute parity is a baseline requirement.** `docs/11-ezee-absolute-page-map.md` maps every eZee screen/operation to its GulfHero home; `docs/12-pms-sitemap-research.md` confirms the live route/tab/control/table/form inventory; `docs/13-pms-screenshot-sitemap-crosswalk.md` ties that sitemap to the Google Drive screenshot layouts. When building a module, check all three sources so no capability or desktop layout pattern is missed. Parity = same pages, workflows, and capabilities — never a visual clone of eZee's design or copy.
- After completing a roadmap step, tick its checkbox in `docs/06-build-roadmap.md` in the same commit.
- Run `npm run lint && npm run typecheck && npm test` before committing; fix what you broke.
- Prefer small, complete vertical slices (DB → server action → UI → test) over broad scaffolding.
- Seed data lives in `supabase/seed.sql` — keep the demo hotel ("GulfHero Demo Hotel", 24 rooms, 4 room types) working as features are added, so every session can see the app in a realistic state.
