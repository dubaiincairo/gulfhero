# Desktop Operational Contract

This contract defines the visible and permissioned behaviour of the First Paid
Saudi Release. It is a browser workflow contract, not an external API.

## Selected-property contract

- The selected property and the role applicable to it are always visible in the
  desktop shell.
- Switching property replaces data and capabilities immediately; data from the
  previous property is not retained as an actionable screen.
- No assignment produces a clear access state without records or configuration
  from that property.
- A denied action creates no mutation and, for protected operations, is
  recorded as an audit-relevant access attempt.

## Fixed role capability baseline

| Capability | Group Owner | Group Admin | Property Manager | Front Office Manager | Receptionist | Housekeeping Manager | Accountant |
|---|---:|---:|---:|---:|---:|---:|---:|
| Manage selected-property member assignments | Yes | Yes | No | No | No | No | No |
| Manage property configuration | Yes | Yes | Yes | Limited | No | Limited room status only | No |
| Manage rates and availability | Yes | Yes | Yes | Yes | View only | No | View only |
| Create/manage reservations and room assignment | Yes | Yes | Yes | Yes | Yes | View only | View only |
| Check in and check out | Yes | Yes | Yes | Yes | Yes | No | View only |
| Manage room readiness, tasks, and blocks | Yes | Yes | Yes | View | View | Yes | View |
| Post ordinary folio charges/payments | Yes | Yes | Yes | Yes | Yes | No | Yes |
| Void/reverse or adjust financial postings | Yes | Yes | Limited | Limited | No | No | Yes |
| Open/close cashier sessions and financial reports | Yes | Yes | View | View | No | No | Yes |
| View operational reports | Yes | Yes | Yes | Yes | Limited | Limited | Yes |

Every allowed action is additionally checked against the current selected
property and may be restricted by the property's configured policy. This table
does not grant implicit access to another property in the same hotel group.

## Sensitive-change contract

The following actions require a confirmation surface and a mandatory reason:
void/reverse a posting, change a posted rate, cancel a confirmed stay, edit a
closed cashiering record, or create/remove an out-of-order block. On success,
the system records actor, role, property, time, before/after details, reason,
and confirmation outcome. A correction creates a linked new record; it never
silently overwrites history.

## Common-action accessibility contract

From the main selected-property workspace, these actions are available within
two clicks: new reservation, check-in, check-out, room assignment, charge
posting, and payment posting. If a role is not permitted, the second step
explains the missing permission rather than presenting an inactive completion
state.

## Workflow and data contract

- Confirmed availability is finalised by the authoritative database operation,
  not by the browser alone.
- A conflicting stay is rejected with a next action; version one has no
  overbooking override.
- Confirmed rates/taxes and posted financial facts remain historically stable.
- AI and channel-manager interfaces may explain or preview only. They do not
  make operational changes without an approved later release and an authorised
  human confirmation.
