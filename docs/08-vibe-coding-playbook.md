# 08 — Vibe-Coding Playbook

> How to actually build GulfHero with AI (Claude Code / Claude) as your pair. You are the product owner and reviewer; Claude is the builder. This playbook keeps quality high without you writing code by hand.

## The session loop

Every build session follows the same shape:

1. **Point at the step.** Open a fresh session and say:
   > "Read CLAUDE.md, then docs/06-build-roadmap.md step X.Y and the related spec section. Tell me your implementation plan in 5 bullets before writing code."
2. **Sanity-check the plan** (30 seconds). Does it touch the right tables? Does it mention tests? If it plans to scaffold five things, say "just the slice."
3. **Let it build.** Claude writes migrations, code, tests, and runs them itself. Interrupt only when it drifts from the spec.
4. **Verify like a hotel worker, not a programmer.** Open the app and *do the job*: make a booking, check someone in, look at the folio math. The acceptance criteria in the roadmap are written as user actions on purpose.
5. **Close the loop.** Tests green → seed updated → checkbox ticked in the roadmap → commit with a clear message → push. One step per commit (or a few small commits per step).

## Ten rules that keep vibe-coded software from rotting

1. **Small steps, always.** If a step feels too big for one session, ask Claude to split it and update the roadmap first. Never say "build the whole billing module."
2. **The docs are the contract.** When you change your mind about behavior, update the doc *first*, then tell Claude to implement the doc. Otherwise the docs rot and future sessions rebuild the wrong thing.
3. **Fresh session per step.** Long chats accumulate confusion. CLAUDE.md + the docs carry the context; the chat doesn't have to.
4. **Demand the plan before the code.** The 5-bullet plan catches 80% of misunderstandings for 1% of the cost.
5. **Tests are your employees.** You can't review every line, so insist on the tests named in each step's AC — especially money math and the double-booking race test (step 1.2). Ask: "show me the failing test first, then make it pass" for tricky logic.
6. **Never let AI touch the database casually.** Schema changes only via migrations; ask "which migration files did you add?" every session that touches data.
7. **Ask for the diff summary.** End of session: "summarize what changed and anything you're unsure about." Unsure-abouts become the next session's first check.
8. **Keep the demo hotel alive.** If the seed breaks, every future session starts blind. Seed data is part of done.
9. **One stack, no substitutions.** When Claude suggests a new library, the default answer is no — CLAUDE.md pins the stack. Additions require updating CLAUDE.md deliberately.
10. **Commit early, push always.** Remote sessions are ephemeral; unpushed work can vanish. Push at every green checkpoint.

## Prompt patterns that work

- **Build:** "Read CLAUDE.md and docs/06 step 2.3. Plan in 5 bullets, wait for my OK, then implement including the AC tests."
- **Fix:** "X happens when I do Y (screenshot/error attached). Reproduce it with a test, then fix it."
- **Review:** "/code-review" or "Review the last commit against docs/03 M6 — list any spec deviations, don't fix yet."
- **Refactor:** "simplify lib/reservations/state.ts without changing behavior — tests must stay green."
- **Learn:** "Explain how the availability engine prevents double-booking, as if to a new developer."
- **Design taste:** "This screen works but looks cluttered at 390px — redesign it; keep the same actions, prioritize arrivals."

## Verifying without reading code

- Keep a **smoke script** you personally run after big steps (10 actions: book, check-in, charge, pay, checkout, invoice, HK flip, night audit, dashboard, booking-engine booking). If all 10 work, the core is healthy.
- Watch the **money**: after any billing-adjacent change, make a booking with tax + discount + payment and check the folio adds up by hand once.
- Watch the **race**: after any availability change, ask Claude to re-run the concurrency test and paste the output.
- Use preview deployments (Vercel) to test on your actual phone.

## When things go wrong

- **Claude is confused / going in circles:** stop, start a fresh session, restate from the docs. Don't argue in a stale context.
- **A feature was built off-spec:** decide which is right. If the code is right, fix the doc; if the doc is right, revert the code. Never leave them disagreeing.
- **Mysterious bug:** "Add logging around X, reproduce, show me the log" beats guess-fixes.
- **Regression:** `git log` is your friend — ask Claude to bisect: "find which commit broke checkout using the E2E test."

## Cadence & milestones

Working a few sessions per week, expect: Phase 0 ≈ 1 week · Phase 1 ≈ 3–4 weeks · Phase 2 ≈ 2 weeks · Phase 3 ≈ 2–3 weeks · Phase 4 ≈ 3 weeks · Phase 5 ≈ 2–3 weeks — **a launchable v1 in roughly 3–4 months of part-time vibe coding.** Milestone demos to aim for:

- **M1 (end Phase 1):** "I ran a hotel day on my laptop" — book → check in → charge → pay → check out with real invoice.
- **M2 (end Phase 2):** "The night audit balanced" — a full simulated day including housekeeping and end-of-day.
- **M3 (end Phase 3):** "A stranger booked online" — someone books from their phone and it appears on the tape chart, paid.
- **M4 (end Phase 4):** "The hotel got smarter" — copilot books a room from one sentence; pricing suggestions look sane; the GM digest arrives on WhatsApp.
- **M5 (end Phase 5):** pilot with one real property. Their complaints become the v1.1 roadmap.

## Beta strategy

Find 1–2 friendly small hotels (10–50 rooms) early — ideally before Phase 3 finishes. Give it free for feedback. Real bookings will find every edge case the seed data can't. Keep their data safe: prod Supabase project, backups on, no experiments on prod.
