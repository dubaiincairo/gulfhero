# PMS Design System

Date: 2026-07-10

## Decision

GulfHero should use **Ant Design for React** as the official UI kit baseline for the PMS.

This is not only a visual guess from screenshots. It is confirmed by three evidence streams:

- The Google Drive screenshots show Ant Design-style enterprise components: compact tabs, tables, selects, input search, dropdowns, badges, side drawers, modal overlays, and admin permission panels.
- The live PMS crawl shows the same component families across Reservations, Stay View, Room View, Rates, Distribution, Cashiering, Configuration, Guest/CRM, Operations, and Reports.
- The live `ipms247` bundle contains Ant Design and rc-component fingerprints: `ant-table`, `ant-drawer`, `ant-tabs`, `ant-select`, `ant-input`, `ant-form`, `ant-modal`, `ant-dropdown`, `rc-table`, `rc-drawer`, `rc-tabs`, `rc-select`, `rc-picker`, and related packages.

Official sources:

- Ant Design React docs: https://ant.design/docs/react/introduce/
- Ant Design components: https://ant.design/components/overview/
- Ant Design GitHub repository: https://github.com/ant-design/ant-design
- npm package: https://www.npmjs.com/package/antd

## Installed Prototype Kit

The local PMS prototype in `/Users/abdallahelfouly/Documents/Gulf Hero` now uses:

- `antd@6.5.0`
- `@ant-design/icons@6.3.2`

The implementation wraps the app in `ConfigProvider` and defines PMS tokens in `src/pmsTheme.js`.

## PMS Theme Tokens

Use compact AntD, not default roomy AntD.

Core colors from the live PMS bundle and screenshots:

| Token | Value | Use |
|---|---:|---|
| Primary / ink | `#1E1928` | Primary buttons, selected states, text emphasis |
| Brand warning / yellow | `#F8B505` | Active tab underline, assignment/action emphasis |
| Success | `#00A651` | Success status, clean/connected/posted state |
| Error | `#FF5353` | Error, blocked, cancelled, destructive warnings |
| Highlight | `#2563EB` | Informational focus/highlight |
| Page chrome | `#F3F3F3` | Background bands, table headers, grouped rows |
| Border | `#D1D4D9` | Inputs, table grid, panel outlines |
| Soft border | `#E5E7EB` | Row dividers and secondary separators |
| Base background | `#FFFFFF` | Workspace panels, forms, drawers |

Typography:

- Font: `Roboto`
- UI density: 12px base for tables/toolbars, 13-16px for headings in operational panels
- Avoid oversized hero/dashboard typography inside the PMS workspace.

Shape and spacing:

- Border radius: 4px for inputs/buttons/tags, 6px maximum for operational panels.
- Dense toolbar height: 32px controls, 42-44px tab/header rows.
- No nested card-heavy layout for operational screens.

## Component Mapping

Use AntD components as the first choice:

| PMS need | AntD component |
|---|---|
| Main module/page tabs | `Tabs` |
| Search bar and table filters | `Input` with prefix/suffix |
| Selectors | `Select`, `DatePicker`, `TimePicker` |
| Rate mode / view toggles | `Radio.Group`, `Segmented` |
| Boolean settings | `Checkbox`, `Switch` |
| Reservation/config/cashiering lists | `Table` |
| Add/edit/search/detail side panels | `Drawer` |
| Confirmations and destructive checks | `Modal`, `Popconfirm` |
| Export/import/action menus | `Dropdown`, `Button` |
| Status labels | `Tag`, `Badge` |
| Empty/loading states | `Empty`, `Skeleton`, `Spin` |
| Permission trees / grouped settings | `Tree`, `Collapse`, `Transfer` where needed |
| Steps for multi-stage setup | `Steps` |

Custom CSS should only tune PMS density, tokens, and domain-specific grids such as Stay View, Room View, and Rates/Inventory.

## Interaction Rules

The screenshots and crawl confirm these rules:

- A screenshot showing a drawer or modal means the drawer is **temporary** and opens after a button/action click.
- Do not keep search, add/edit, payment, channel, or permission drawers permanently visible.
- Global search is an overlay/dropdown from the top search bar.
- Reservation Detail is a real workspace state after selection, with tabs for Folio Operations, Booking Details, Guest Details, Room Charges, Credit Card, Tasks, and Audit Trail.
- Dense desktop grids remain dense; do not convert operations pages into marketing cards.
- Tables must include search, empty state, loading state, export/action affordances, and audit-safe action handling.
- Desktop/laptop is the only current layout target. Mobile should be planned later, not forced into this pass.

## Official Kit Boundary

Use Ant Design as the source of truth for component behavior and accessibility. Do not rebuild drawers, menus, tables, tabs, form controls, or modals by hand unless the PMS domain requires a custom grid.

Use custom components for:

- Stay View timeline grid.
- Rates/Inventory spreadsheet grid.
- Room View room-status board.
- Reservation card/list hybrid if AntD Table alone cannot match the PMS behavior.

Even for custom domain surfaces, reuse AntD tokens and adjacent controls so the app remains one system.
