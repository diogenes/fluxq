# Design System: FluxQ Operations Control Plane
**Project Type:** Quantum workflow orchestration + observability

## 1. Visual Theme & Atmosphere
FluxQ uses a mission-control visual language optimized for daily operator usage in high-density environments. The UI should feel precise, calm under incident pressure, and immediately actionable.

Atmosphere profile:
- Tone: technical, reliable, non-marketing
- Density: medium-high information density with strict hierarchy
- Motion: subtle, state-signaling, never decorative
- Primary use case: fast diagnosis and intervention during run/provider incidents

## 2. Color Palette & Roles
Base palette (dark-first, accessibility-first):
- **Deep Space** `#0B0F1A`: app background and outer canvas
- **Surface Low** `#171B27`: nav rails and inspector panel
- **Surface Mid** `#1B1F2B`: main modules and cards
- **Surface High** `#262A36`: elevated modules
- **Text Primary** `#DFE2F2`: high-priority text
- **Text Secondary** `#C9C4D8`: metadata and supporting labels
- **Outline Variant** `#484555` at low opacity: subtle separators only when needed

Semantic states:
- **Info** `#3BA7FF`
- **Success** `#22C55E`
- **Warning** `#F59E0B`
- **Error** `#EF4444`
- **Primary Action Gradient** `#CABEFF -> #947DFF` (135deg)

Rules:
- Prefer tonal separation over hard borders.
- Keep contrast at WCAG AA minimum for text and controls.
- Never rely only on color for status; pair with icon/text.

## 3. Typography Rules
Font roles:
- **Display:** Sora (screen titles, section headers)
- **Interface:** Inter (labels, controls, body)
- **Technical Data:** IBM Plex Mono (run IDs, timestamps, durations, terminal attribution, lane tags)

Scale guidance:
- H1: 32px / 600
- H2: 22-24px / 600
- H3: 18px / 600
- Body: 14-16px / 400-500
- Metadata labels: 11-12px / 600 uppercase where appropriate

## 4. Mandatory Interaction Shell
Every core operational screen must include:
1. **Top bar:** global search, scoped filters, primary action CTA
2. **Left nav:** Overview, Workflows, Runs, Provider Health, Portability, Alerts, Livebook, Settings
3. **Right rail (Inspector):** contextual evidence + immediate actions

## 5. Mandatory Operational Blocks
For Overview and incident-heavy screens:
- Operational Status Strip
- KPI row
- Comparability Gate Strip
- Chart shelf (2 charts)
- Decision table
- Trace/Span evidence panel
- Lifecycle timeline
- Alerts panel

Decision table columns (required):
`severity`, `status`, `workflow/run`, `lane`, `provider`, `step`, `queue wait`, `execution duration`, `retry budget`, `terminal attribution`, `comparability`, `circuit`, `updated`, `action`

## 6. Domain and Usability Guardrails (QML Gate)
- Lanes must be explicit and first-class: `fixture`, `live_smoke`, `live`.
- Queue wait and execution duration must always be visually separated.
- Drift metrics must use normalized terms:
  - `latency_delta_ms`
  - `expectation_delta_abs`
  - `sample_kl_divergence`
- Comparisons must show comparability and sample quality before conclusions.
- Incident surfaces must expose direct action within one click.
- Core symptom-to-root-cause path must be <= 3 navigational steps.

## 7. State Pack Requirements
Each critical screen must provide fully designed states:
- Empty
- Loading
- Degraded
- Error

For run/provider screens, also include explicit variants for:
- Retrying
- Timeout
- Cancelled
- Fallback engaged

## 8. Shadcn Mapping (Implementation Readiness)
Component mapping for later React implementation:
- Navigation/rails: `sidebar`, `navigation-menu`, `command`
- Filters/actions: `select`, `combobox`, `button`, `dropdown-menu`
- KPIs/blocks: `card`, `badge`, `progress`, `tooltip`
- Decision table: `table` + sticky header + status badges
- Alerts/incidents: `alert`, `toast`, `sheet`
- Inspector/actions: `sheet`, `tabs`, `accordion`, `button`
- Timeline/trace scaffolding: custom primitives on top of `card`, `separator`, `badge`

Implementation constraints:
- Keep token names stable for eventual Phoenix + React integration.
- Keep interaction semantics independent from provider SDK vocabulary.

## 9. Stitch Prompt Notes
When generating screens with Stitch:
- Include this design system in every prompt.
- Specify the exact required shell and mandatory blocks.
- Request explicit state variants and lane labels.
- Ask for action-first incident handling in right rail.
