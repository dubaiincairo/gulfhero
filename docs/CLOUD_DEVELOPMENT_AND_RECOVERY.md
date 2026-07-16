# Cloud Development and Recovery Runbook

## Current migration checkpoint

- Source remote: `https://github.com/dubaiincairo/gulfhero.git`
- Working branch: `agent/gulf-hero-pms-prototype`
- Verified checkpoint: `37f871fc2a6cbe348f0ba68c3401a1dd4ecb52df`
- Verification date: 2026-07-16
- Recovery proof: a fresh GitHub mirror passed `git fsck --full`; a clean clone
  installed with `npm ci` (zero reported vulnerabilities) and passed
  `npm run build`.

The Mac working folder remains intact. Nothing was migrated by deleting or
moving local files.

## Codex Cloud environment

Create one environment connected to the GitHub repository above and use the
active prototype branch as the starting branch.

- Setup script: `npm ci`
- Maintenance script: `npm ci`
- Secrets: none for the fixture prototype
- Development command: `npm run dev`
- Build command: `npm run build`
- Network access: keep disabled unless a task has a specific dependency need
- Production credentials: never add them to this environment

Each task starts from a Git commit. A task container is temporary and is not a
backup. Commit and push every accepted checkpoint before treating work as safe.

## What GitHub currently protects

GitHub protects committed source code, product documentation, schema/migration
scaffolding, specifications, and generated privacy-safe fixtures. Branches and
commits preserve their development history.

The following local research assets are intentionally excluded from Git because
they may contain third-party UI or guest information:

- `analysis-contact-sheets/`
- `drive-screens/`
- `organized-screenshots/`
- `reference-screens/`
- Drive manifests and root-level PMS reference screenshots

They remain on the Mac until a private encrypted object-storage destination is
selected. They are not yet an off-device backup and must not be represented as
one.

## Required production SaaS protection

Before onboarding a live property, use separate controls for each data class:

| Data class | Durable system | Minimum recovery control |
|---|---|---|
| Source and infrastructure code | GitHub plus an independent private mirror | Daily mirror, protected default branch, release tags, quarterly restore test |
| PostgreSQL tenant and financial data | Managed regional database | Point-in-time recovery, daily snapshots, encrypted cross-account copy, monthly restore test |
| Property/guest documents and images | Private object storage | Versioning, encryption, lifecycle retention, separate-region or separate-account replication |
| Secrets and encryption keys | Managed secret/key service | No Git storage, rotation, least privilege, recovery ownership documented |
| Audit/security logs | Append-oriented log store | Restricted deletion, retention policy, alerting, export independent of the application database |

Database snapshots do not automatically protect object-storage files. Both must
be backed up and restored together for a complete tenant recovery.

## Release and restore gates

Do not call the product production-ready until all of these are evidenced:

1. Tenant isolation and role authorization tests pass.
2. The hosting region, retention periods, recovery point objective, and recovery
   time objective are approved.
3. Database point-in-time recovery and object-version recovery are enabled.
4. A clean source restore, database restore, and object restore have each been
   rehearsed in a non-production account.
5. Backup monitoring alerts reach a named owner and a second recovery owner.
6. The latest restore drill date and evidence are recorded here.

## Standard cloud task handoff

1. Start from the latest pushed branch.
2. Make one bounded change.
3. Browser-test the changed workflow and run `npm run build`.
4. Review `git status`; stage only intentional files.
5. Commit and push the checkpoint.
6. Record anything still local-only or not recoverable in the task handoff.
