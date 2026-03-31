# FluxQ Screen Prompts (Stitch v1)

Use these prompts with Stitch MCP, always alongside `.stitch/DESIGN.md`.

## 1) Overview Command Deck
Design an operations-first Overview screen for FluxQ.

Requirements:
- Mandatory shell: top bar, left nav, right inspector rail.
- Include blocks: Operational Status Strip, KPI row, Comparability Gate Strip, two-chart shelf, Decision Table, Alerts panel.
- Decision table columns must include: severity, status, workflow/run, lane, provider, step, queue wait, execution duration, retry budget, terminal attribution, comparability, circuit, updated, action.
- Explicit lane labels: fixture, live_smoke, live.
- Separate queue wait from execution duration in all cards and rows.
- Include one-click actions in inspector rail: retry run, reroute lane, cancel process, export troubleshooting bundle.
- Include explicit visual variants for Empty, Loading, Degraded, Error.

## 2) Run Investigation (Root Cause)
Design a Run Investigation screen optimized for root-cause analysis under incident pressure.

Requirements:
- Mandatory shell: top bar, left nav, right inspector rail.
- Core modules: lifecycle timeline, trace/span hierarchy, incident insight cards, right rail action stack.
- Show retry budget, timeout policy, fallback status, and terminal attribution above fold.
- Keep root-cause path <= 3 transitions from alert signal to remediation action.
- Include drift/comparability context when rendering performance anomaly narratives.
- Include explicit visual variants for Empty, Loading, Degraded, Error.

## 3) System Deck / Design Ops Board
Design a System Deck screen that documents FluxQ visual tokens and operational patterns.

Requirements:
- Mandatory shell: top bar, left nav, right inspector rail.
- Include token panel (colors, typography, spacing), provider health module, workflow propagation module, and the no-line separation philosophy module.
- Show examples of status chips and severity variants.
- Include shadcn mapping annotations for component handoff (card, table, badge, alert, button, sheet, tabs, accordion).
- Include explicit visual variants for Empty, Loading, Degraded, Error.
