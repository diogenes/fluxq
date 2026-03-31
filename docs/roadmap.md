# FluxQ Roadmap

## Versioning and Release Policy
- FluxQ will ship iteratively in `0.x` while contracts and operations harden.
- Promotion to `v1.0` requires evidence of production-grade stability, not feature count alone.
- Each unfinished phase must include explicit deliverables and milestone review gates.

## Phase Tracker

| Phase | Label | Status | Primary Outcome |
|---|---|---|---|
| Phase 0 | Foundation | In Progress | Project governance, docs split, roadmap baseline |
| Phase 1 | MVP-P0 | Planned | Local-first onboarding, IA, initial UX assets |
| Phase 2 | MVP-P1 | Planned | Core runtime orchestration and run-detail UX |
| Phase 3 | MVP-P2 | Planned | Provider ops, portability analytics, Livebook bridge |
| Phase 4 | v0.2 | Planned | Hardening, policy simulation, API evolution |
| Phase 5 | v0.3 | Planned | Team/self-host maturity, OIDC, scaling |
| Phase 6 | v1.0 | Planned | Production-grade stability and ecosystem readiness |

---

## Companion Track — UI Component Implementation (`0.x`)

This track runs in parallel with product phases to convert approved Stitch assets into reusable React + shadcn/ui components (Phoenix + Inertia integration target).

| Milestone | Label | Status | Primary Outcome |
|---|---|---|---|
| UI-M0 | v0.1 Foundation | In Progress | Layout shell, navigation, typography/tokens, Storybook baseline |
| UI-M1 | v0.2 Core Primitives | In Progress | Forms, dialogs, tables, alerts, state-pack primitives |
| UI-M2 | v0.3 Runtime Surfaces | In Progress | Run detail, provider health, portability analytics composition |
| UI-M3 | v0.4 Advanced Modules | In Progress | Workflow builder canvas, provenance graph, motion/state contracts |
| UI-M4 | v0.5 Hardening | Planned | Responsiveness, accessibility, i18n-by-default (`en` initial), visual regression |

### UI-M0 — v0.1 Foundation
- [x] Storybook setup with layout and component catalog.
- [x] Inertia.js + inertia-phoenix + React baseline wiring.
- [x] App shell components: top nav, side nav (expanded/collapsed), right rail.
- [x] Token bridge from `.stitch` exports to CSS variables/theme.

### UI-M1 — v0.2 Core Primitives
- [x] Foundational shadcn wrappers: button, input, select, textarea, checkbox, switch.
- [x] Operational primitives: badges, status chips, alerts, skeleton, empty/degraded/error states.
- [x] Dialog/sheet/dropdown/tooltip interaction primitives.
- [x] Data tables with density and mono-metric formatting contracts.

### UI-M2 — v0.3 Runtime Surfaces
- [x] Run detail composition blocks (timeline, trace, logs, incident rail).
- [x] Provider health surface blocks (status strip, diagnostics rail, actions).
- [x] Portability analytics blocks (comparability matrix, confidence/sample-quality strips).
- [x] Livebook linkage blocks (provenance chain, reproducibility checklist, bundle actions).

### UI-M3 — v0.4 Advanced Modules
- [x] Workflow builder foundational canvas + node palette + inspector.
- [x] Motion/state contract component set with reduced-motion fallback behavior.
- [x] Chart modules and telemetry visual primitives.
- [x] Domain-safe copy primitives for retries/timeouts/fallback/cancellation semantics.

### UI-M4 — v0.5 Hardening
- [x] Responsive behavior validation (desktop/tablet/mobile breakpoints) for all catalog components.
- [x] i18n architecture enabled by default (English initial locale).
- [x] Storybook documentation coverage for component props/states/usage patterns.
- [x] Visual regression and interaction test baseline for critical surfaces.

### UI-Next — Feature-Driven Design-System Milestones

| Milestone | Label | Status | Primary Outcome |
|---|---|---|---|
| UI-X01 | Incident Alert Primitive | Completed | Reusable alert + skeleton primitives with operational semantics |
| UI-X02 | Unified Filter/Query Bar | Completed | Cross-surface filtering contract for run/provider/portability views |
| UI-X03 | Operational Status Strip v2 | Completed | Explicit retry/timeout/fallback/attribution first-order strip |
| UI-X04 | Incident Action Rail v2 | Completed | Severity-aware grouped actions (`retry`, `reroute`, `cancel`, `export`) |
| UI-X05 | Dense Data Table System | Completed | Sortable high-density incident/run table contracts |
| UI-X06 | Timeline-Trace Correlation UX | Completed | Linked timeline/span/log drilldown components |
| UI-X07 | Portability Decision Framing | Completed | Confidence/sample-quality/threshold action framing blocks |
| UI-X08 | Workflow Builder Interaction States | Completed | Node validation/preflight/error state language |
| UI-X09 | Motion Policy + Reduced Motion | Completed | Transition policy components with reduced-motion parity |
| UI-X10 | Visual Regression Baseline | Completed | Storybook-based visual baseline artifacts + checks |

### UI-CX — Cross-Journey Component Extraction (Stitch HTML Corpus)

| Milestone | Label | Status | Primary Outcome |
|---|---|---|---|
| UI-CX01 | Corpus Index + Pattern Registry | Completed | Family inventory and extraction order from all `.stitch/designs/*.html` |
| UI-CX02 | Token + Typography + Icon Contract | In Progress | Unified semantic token/icon wrapper contract for extracted families |
| UI-CX03 | Shell Frame System | In Progress | Canonical top nav, left rail, right rail frame variants |
| UI-CX04 | Lane + State Semantics Pack | In Progress | Canonical lane selectors and state-pack surface language |
| UI-CX05 | KPI + Metric Card Family | In Progress | Reusable KPI/status strip and metric card variants |
| UI-CX06 | Filters + Tabbed Table System | In Progress | Filter toolbars, tab controls, dense/sortable table primitives |
| UI-CX07 | Timeline + Trace + Logs Blocks | In Progress | Correlated timeline/trace/log composition suite |
| UI-CX08 | Action Rail + Inspector Panels | In Progress | Right-rail action groups and diagnostics inspector variants |
| UI-CX09 | Workflow Builder Kit | Completed | Node palette, canvas, connector, inspector component kit |
| UI-CX10 | Charting Primitive Set | Completed | Trend/heatmap/distribution chart primitives for runtime surfaces |
| UI-CX11 | Onboarding Flow Kit | Completed | Stepper/progress/readiness form components |
| UI-CX12 | Journey Composition Blueprints | In Progress | Journey-to-family mapping and composition contracts |
| UI-CX13 | Storybook Variant Matrix | Completed | Desktop/tablet/mobile + state-variant story coverage |
| UI-CX14 | Hardening + Gate Closure | Completed | A11y/responsiveness/i18n/visual gate closure for extracted families |

### Design Front Follow-through (Operator UX)
- [x] DF-03 Expand semantic density token layer (row emphasis, severity bands, diagnostic contrast ramps).
- [x] DF-04 Finalize runtime action interaction specs (retry/reroute/cancel confirmation and transition states).
- [x] DF-06 Publish Stitch-to-code mapping packet for UI-M2/UI-M3 module buildout.
- [x] DF-07 Add panel-level state recipes (`empty`, `degraded`, `error`) for resilience-first surfaces.
- [x] DF-08 Add language governance guide with provider-neutral do/don't examples.

---

## Phase 0 — Foundation (Current)

### Goal
Establish a high-quality planning and execution baseline aligned with NxQuantum engineering discipline.

### Deliverables Checklist
- [ ] Create umbrella project skeleton (`core`, `infra`, `web`, `cli`).
- [x] Produce full planning package document.
- [x] Split documentation into functional areas with index.
- [x] Publish roadmap with milestones and checklists.
- [x] Add AGENTS and SKILLS governance files.
- [x] Add UX multi-agent role contracts (`quantum-ml-specialist`, `ux-architect`, `senior-design-specialist`).
- [x] Add process packet templates for domain -> UX -> design handoff.
- [x] Run TRIAD-01 review and publish prioritized UI remediation backlog.
- [ ] Add architecture dependency-direction tests scaffold.

### Milestone F0 Gate
- [ ] Docs index and roadmap are stable and team-readable.
- [ ] Architecture boundaries are documented clearly.
- [ ] Next two phases have actionable checklists.

---

## Phase 1 — MVP-P0 (Onboarding and UX Foundations)

### Goal
Deliver a polished local-first experience and foundational UX artifacts for fast onboarding.

### Deliverables Checklist
- [ ] Docker-first local stack with seeded deterministic demo workflows.
- [ ] Welcome/setup experience and dependency health checks.
- [ ] Sitemap and navigation architecture implementation.
- [x] Stitch assets for moodboard, tokens, typography, onboarding wizard.
- [ ] UX copy for deterministic lane messaging (`fixture`, `live_smoke`, `live`).
- [ ] Execute TRIAD-01 remediation item `UXR-005` (domain-safe copy enforcement).

### Milestone F1 Gate
- [ ] New user can reach first successful run detail within 10 minutes.
- [ ] Demo mode includes at least one failure + fallback scenario.
- [ ] Core onboarding screens match approved UX wireframes.

---

## Phase 2 — MVP-P1 (Core Runtime and Run Observability)

### Goal
Implement reliable orchestration and an excellent run-detail debugging experience.

### Deliverables Checklist
- [ ] Workflow catalog and versioning basics.
- [ ] Workflow builder core subset with validation.
- [ ] YAML import/export with JSON Schema validation.
- [ ] Runtime state machine with retries, backoff, timeout, cancellation.
- [ ] Oban queueing/scheduling baseline.
- [ ] Run detail screen with correlated timeline/logs/traces/metrics.
- [ ] Troubleshooting bundle export for single run.
- [x] Stitch assets for workflow builder, run detail, component library.
- [ ] Execute TRIAD-01 remediation items `UXR-001`, `UXR-002`, `UXR-003`, `UXR-004`, `UXR-007`.

### Milestone F2 Gate
- [ ] End-to-end workflow execution from authoring/import to run detail works reliably.
- [ ] Failure diagnosis path is complete within run detail.
- [ ] Deterministic fixture lane remains stable across repeated runs.

---

## Phase 3 — MVP-P2 (Provider Ops, Portability, Livebook)

### Goal
Add provider operations visibility and portability analytics while connecting Livebook workflows.

### Deliverables Checklist
- [ ] Provider health and operations dashboard.
- [ ] Portability analytics persistence and comparison UX.
- [ ] Drift threshold rules and anomaly surfacing.
- [ ] Livebook run launch linkage and provenance tracking.
- [ ] Alert rule baseline and incident feed.
- [x] Stitch assets for provider health, portability analytics, Livebook linkage, motion/state board.
- [ ] Execute TRIAD-01 remediation items `UXR-006`, `UXR-008`, `UXR-009`, `UXR-012`.

### Milestone F3 Gate
- [ ] Users can compare two compatible runs across providers.
- [ ] Provider degradation is visible and actionable in UI.
- [ ] Livebook launched runs preserve correlation and provenance metadata.

---

## Phase 4 — v0.2 (Hardening and Policy Depth)

### Goal
Strengthen operational controls, reliability simulation, and API maturity.

### Deliverables Checklist
- [ ] Policy simulator for retry/backoff/fallback outcomes.
- [ ] Expanded alert/anomaly configuration controls.
- [ ] REST API hardening and external automation docs.
- [ ] Optional GraphQL read API beta for complex dashboard queries.
- [ ] Expanded troubleshooting and observability profile controls.

### Milestone F4 Gate
- [ ] Policy edits are validated and previewable before apply.
- [ ] APIs are documented and stable for external automation use.
- [ ] Operational regressions are detectable via alerting and dashboards.

---

## Phase 5 — v0.3 (Team and Self-Hosted Maturity)

### Goal
Enable stronger governance and deployment maturity for real team usage.

### Deliverables Checklist
- [ ] OIDC/SAML integration path.
- [ ] RBAC expansion and org/team admin UX maturity.
- [ ] Credential rotation and audit reporting enhancements.
- [ ] Kubernetes manifest baseline and production deployment guide.
- [ ] Scalability tuning for queue workers and run throughput.

### Milestone F5 Gate
- [ ] Team-level governance and auditability are production-usable.
- [ ] Self-host deployment path is documented and reproducible.
- [ ] Performance and reliability meet target thresholds.

---

## Phase 6 — v1.0 (Production Readiness and Ecosystem Growth)

### Goal
Ship a production-grade control plane with strong OSS adoption signals.

### Deliverables Checklist
- [ ] Stable public contracts and version migration tooling.
- [ ] Long-term observability and retention strategy.
- [ ] Extensibility model for integrations/plugins.
- [ ] Operational SLOs and reliability benchmarks.
- [ ] Contributor workflow and release automation maturity.

### Milestone F6 Gate
- [ ] Evidence of real production usage with incident learnings.
- [ ] Backward compatibility policy proven through upgrade cycles.
- [ ] OSS contributor throughput and release cadence are stable.

---

## Progress Update Rules
- Update checklist status when work lands, not when work starts.
- Each phase closure requires milestone gate evidence.
- Scope changes must be recorded here with date and rationale.
