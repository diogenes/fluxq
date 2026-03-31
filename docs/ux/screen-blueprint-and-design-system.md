# FluxQ Screen Blueprint and Design System

Source of truth: [Master Plan](../plan/master-plan.md)
Benchmark-led update: [Design Guide v2](./design-guide-v2-benchmark.md)

## Screen Blueprint

| Screen | Purpose | Core Components | Confidence Mechanism |
|---|---|---|---|
| Welcome/Setup | Fast activation and dependency checks | Setup wizard, health cards, seed/demo CTA | Readiness checklist with explicit diagnostics |
| Home/Overview | Operational snapshot | KPI cards, active run stream, alerts panel | At-a-glance outcome and queue health visibility |
| Workflow Catalog | Discover and manage workflows | Filters, workflow cards, detail drawer | Version and ownership visibility |
| Workflow Detail | Understand workflow readiness | DAG summary, policy chips, run history | Validation freshness indicators |
| Workflow Builder | Author/validate workflows | Node palette, graph canvas, inspector, YAML panel | Real-time lint and run-preview checks |
| Run Detail | Observe and debug execution | Live graph, timeline, logs, traces, metrics | Terminal attribution and causal linking |
| Run History/Search | Forensics and trend lookup | Faceted filters, run table, compare tray | Reproducible search presets |
| Provider Health | Provider operations and reliability | Health cards, latency/error charts, readiness logs | Explicit provider status and route impact |
| Portability Analytics | Compare and validate drift | Delta matrix, trend charts, comparability badges | Confidence scoring and thresholds |
| Alerts/Anomalies | Incident triage | Alert feed, incident timeline, linked runs | Rule transparency + evidence linking |
| Livebook Integration | Notebook bridge | Linked notebooks, launch history, provenance panel | Provenance and reproducibility guarantees |
| Config/Settings | Policy/runtime governance | Runtime profile editor, schema checker | Pre-apply impact preview |
| Team/Admin | Access and compliance | User table, role matrix, audit timeline | Permission preview and immutable audit trail |

## Workflow Builder Model

### Authoring Modes
- Visual DAG/state-machine mode.
- YAML/text mode.
- Hybrid split mode with synchronized AST.

### Required Node Categories
- Quantum execution steps.
- Classical compute steps.
- Explorer data steps.
- Control/branch steps.
- Livebook integration steps.
- Resiliency and fallback control steps.

### Required Policy Surfaces
- Retry and backoff.
- Timeout and cancellation.
- Provider strategy and fallback routing.
- Runtime profile and observability profile.
- Correlation and metadata settings.

## Observability and Resiliency UX Rules
- Traces/logs/metrics must be correlated by run and step context.
- Queue wait and execution duration must be separated visually.
- Retry and fallback decisions must appear in timeline and graph state.
- Circuit-breaker state must be visible wherever provider routing is shown.

## Design System Tokens

### Core Colors
- Deep Space `#0B0F1A`
- Flux Violet `#7C5CFF`
- Electric Indigo `#5A3BFF`
- Soft Violet Glow `#AFA2FF`
- Info Blue `#3BA7FF`
- Success Green `#22C55E`
- Warning Amber `#F59E0B`
- Error Red `#EF4444`

### Typography
- Primary: Poppins.
- Utility/data: Inter.
- Scale: H1 28-32, H2 22-24, H3 18, Body 14-16, Caption 12.

### Motion
- Subtle, purposeful transitions.
- Active edge motion and node pulse for running/retrying states.
- Reduced-motion mode supported.

### Dense Data + Severity Token Extensions
- Density row emphasis tiers:
  - `--fxq-density-row-subtle-bg` for passive context rows.
  - `--fxq-density-row-focus-bg` for operator-focused rows.
  - `--fxq-density-row-critical-bg` for urgent rows tied to incident pressure.
- Severity lane markers:
  - `--fxq-severity-s1`, `--fxq-severity-s2`, `--fxq-severity-s3`.
  - Applied via utility classes `fxq-severity-band-s1|s2|s3`.
- Diagnostic contrast ramps:
  - `--fxq-diagnostic-contrast-low|mid|high`.
  - Prevents unreadable telemetry text in high-density panels.

### Accessibility
- WCAG AA contrast baseline.
- Keyboard access for all critical actions.
- Status indicators never rely on color only.
