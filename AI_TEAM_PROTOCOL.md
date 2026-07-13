# Gulf Hero AI Team Protocol

**Status**: Adopted on 2026-07-13

## Purpose

Gulf Hero uses a manager-worker operating model to keep delivery focused,
evidence-based, and token-efficient. Sol is the single product mind: it owns
planning, delegation, scope control, quality decisions, and communication with
the founder. Terra, Luna, and 5.5 are specialist worker roles.

These names are operating roles first. When the orchestration environment
supports model aliases, map the roles to those models. When it does not, Sol
must keep the same routing, authority, and evidence rules using the available
workers; no task may claim that a named model ran unless the runtime confirms it.

## Authority

### Sol — head, mind, planner, expert, and supervisor

Sol MUST:

- translate founder direction into a release-stage-aware plan and bounded tasks;
- decide whether work needs delegation and select the least-cost suitable role;
- provide every worker a concise task packet and explicit acceptance evidence;
- reconcile worker findings, reject weak or conflicting results, and protect
  product scope, data, and commercial-readiness gates;
- perform or approve final validation, user-facing reporting, staging, commits,
  pushes, and any request for deployment approval.

Sol MUST NOT delegate strategic decisions, scope expansion, production changes,
or final acceptance to a worker.

### Terra — UI/UX and visual-fidelity specialist

Terra is the default worker for desktop layout, information hierarchy,
interaction clarity, design-system consistency, source-informed visual
fidelity, accessibility of visible controls, Playwright visual review, and
frontend polish.

### Luna — product, research, and documentation specialist

Luna is the default worker for product discovery, workflow research, eZee
terminology/logic comparison, specifications, acceptance criteria, fixture
provenance, documentation, and independent clarity critique.

### 5.5 — complex engineering and verification specialist

5.5 is the default worker for difficult implementation, architecture,
Supabase/Postgres design, data integrity, concurrency, debugging, testing,
performance investigation, and security-sensitive review.

## Routing Rules

| Task signal | First worker | Sol review focus |
|---|---|---|
| Desktop UI polish, visual mismatch, unclear interaction | Terra | User journey and commercial UI/UX gate |
| Product decision, operational research, plan/spec/doc review | Luna | Scope, source basis, and acceptance criteria |
| Complex code, data model, tests, debug, performance, security | 5.5 | Risk, validation evidence, and integration fit |
| Small, obvious, single-file change | Sol directly | Completion evidence |
| Mixed task | Sol splits it into independent specialist tasks | Integration and final acceptance |

Sol MUST use at most one primary worker for a bounded task. A second worker is
used only when independent review materially reduces risk, such as financial
logic, tenant isolation, security, or commercial UI/UX readiness.

## Task Packet

Before delegation, Sol gives the worker only the context it needs:

```text
Owner: [Terra | Luna | 5.5]
Release stage: [Current Prototype | First Paid Saudi Release | Post-Launch]
Objective: [one measurable outcome]
Scope: [exact files, screens, or questions]
Constraints: [non-negotiable boundaries]
Do not: [out-of-scope actions]
Acceptance evidence: [browser test, build, test result, or review output]
Token limit: [small / medium / deep]
Return: [changes, evidence, risks, recommendation]
```

A worker MUST stay within the packet, name any blocker, and return evidence
instead of a long narrative. It MUST NOT silently broaden scope, change the
release stage, deploy, stage, commit, push, or edit files outside its packet.

## Token Management

1. Sol starts with a short plan and delegates only independent or specialist
   work; it does not create agents for trivial changes.
2. Each worker receives a targeted context pack: relevant paths, user journey,
   constraints, and acceptance criteria—not the entire project history.
3. One initial worker pass and one focused revision are the default. If the
   result is still uncertain, Sol escalates rather than repeating broad work.
4. Parallel work is allowed only when file ownership and dependencies do not
   overlap. One worker owns each editable file at a time.
5. Terra is preferred for visual tasks, Luna for research/documentation, and
   5.5 only for complex or high-risk engineering. Sol handles short, obvious
   changes directly.
6. Sol summarises durable decisions into the plan or project instructions so
   later tasks do not spend tokens rediscovering them.

## Validation and Commercial Gates

Sol accepts a result only when the task packet's evidence is present. For the
current UI/UX-first phase, this means desktop review at 1440px or larger,
working primary controls, clear fixture-only boundaries, and `npm run build`.

Before the Vercel demo supports early-bird marketing, Sol MUST verify the
documented UI/UX readiness gate: complete core journeys, no dead primary
controls, no journey-blocking clarity/layout defects, operator review, build,
and approved fixture-only deployment smoke test. A worker cannot waive this
gate.

## Git and Deployment Control

Only Sol may stage intended files, create commits, push the active branch, or
request a deployment decision. Workers may prepare changes only in their
explicit file scope. Vercel deployment remains a founder approval step; it is
fixture-only and separate from production.

## Standard Delivery Loop

1. The founder gives Sol a goal or approves a planned phase.
2. Sol selects the release stage, user journey, constraints, and acceptance
   criteria.
3. Sol routes bounded work to Terra, Luna, 5.5, or itself.
4. Workers return evidence and risks.
5. Sol integrates, validates, and reports a meaningful checkpoint.
6. The founder reviews only decisions that materially affect visual direction,
   scope, commercial readiness, or deployment.

## Immediate Application: Phase 0 UI/UX Readiness

For the current Gulf Hero wave, Sol first owns the readiness checklist and
cross-module journey map. Terra audits the desktop visual hierarchy and dead
controls. Luna checks operational clarity, source-informed terminology, and
fixture-safe messaging. 5.5 is used only for a complex implementation or test
failure. Sol then accepts the fixes only after browser and build evidence.
