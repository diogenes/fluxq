# Stitch-to-Code Mapping Packet (UI-M2 / UI-M3)

Owner: `senior-design-specialist`
Scope: `DF-06`
Source of truth: `.stitch/metadata.json` (approved screens only)
Design system asset: `assets/c80ad6919d624325bb2d50ff1ab74113`

## Approved Stitch Assets Used
- `mvp-p1-run-detail-v2` (`df57d3d0ccc64e9ca545669795038735`) -> `.stitch/designs/mvp-p1-run-detail-v2.html`
- `mvp-p2-provider-health-v2` (`cb465f7649dc4de1bc05efd1b7ce1ca8`) -> `.stitch/designs/mvp-p2-provider-health-v2.html`
- `mvp-p2-portability-v2` (`09361087386c409981ae359b3c6c6f40`) -> `.stitch/designs/mvp-p2-portability-v2.html`
- `mvp-p2-livebook-linkage-v2` (`4b56f9d8d8414ff09765fee3e8d268d7`) -> `.stitch/designs/mvp-p2-livebook-linkage-v2.html`
- `mvp-p1-workflow-builder-v2` (`9b900f1a3dec478b9107cf27dc333725`) -> `.stitch/designs/mvp-p1-workflow-builder-v2.html`
- `mvp-p2-motion-state-v2` (`920e3d3e03a04c4a9a84f7e0d1d1c2f3`) -> `.stitch/designs/mvp-p2-motion-state-v2.html`

## UI-M2 Runtime Surface Mapping
| Runtime block | Stitch source | React implementation target | Storybook target | Phoenix event anchors |
|---|---|---|---|---|
| Run timeline / trace / logs / incident rail | `mvp-p1-run-detail-v2` | `RunDetailBlock`, `TimelineTraceCorrelation`, `IncidentActionRail` | `Runtime/Timeline Trace Correlation`, `Runtime/Incident Action Rail v2` | `run.detail.loaded`, `run.trace.expanded`, `run.retry.requested` |
| Provider health strip + diagnostics + action rail | `mvp-p2-provider-health-v2` | `ProviderHealthBlock`, `OperationalStatusStripV2` | `Runtime/Operational Status Strip v2` | `provider.health.updated`, `provider.circuit.state_changed`, `runtime.route.rebalanced` |
| Portability comparability + confidence + quality | `mvp-p2-portability-v2` | `PortabilityAnalyticsBlock`, `PortabilityDecisionFrame` | `Runtime/Portability Decision Framing` | `portability.comparison.ready`, `portability.drift.threshold_crossed` |
| Livebook provenance + reproducibility + bundle actions | `mvp-p2-livebook-linkage-v2` | `LivebookLinkageBlock` | `Runtime/Blocks` (Livebook cluster) | `livebook.launch.requested`, `run.provenance.attached`, `provenance.bundle.exported` |

## UI-M3 Advanced Module Mapping
| Advanced module | Stitch source | React implementation target | Storybook target | Notes |
|---|---|---|---|---|
| Workflow builder canvas scaffold + node palette + inspector shell | `mvp-p1-workflow-builder-v2` | `WorkflowBuilderScaffold` (+ future `WorkflowBuilderCanvas`, `NodeInspectorPanel`) | `Workflow/Workflow Builder Scaffold` | Keep deterministic lane hints visible in inspector state. |
| Motion/state policy contract + reduced-motion parity | `mvp-p2-motion-state-v2` | `MotionStateContract` | `Motion/Motion State Contract` | Transition policy labels must remain domain-safe. |
| Telemetry/chart shell stubs | `mvp-p2-provider-health-v2`, `mvp-p2-portability-v2` | `TelemetryChartStub` (+ future chart adapters) | `Charts/Telemetry Chart Stub` | Reserve slots for comparability and incident overlays. |

## Stitch Export to Local Implementation Workflow
1. Use `.stitch/metadata.json` to pick `status=approved` screens only.
2. Use `.stitch/designs/*.html` as structural source and `.png` as visual baseline reference.
3. Translate to React components under `apps/fluxq_web/assets/src/components/*`.
4. Preserve token usage from `.stitch/tokens.json` + generated CSS variables.
5. Add Storybook stories per mapped module before page integration.

## Gate Checks Before Implementation Starts
- Design fidelity: mapped component hierarchy matches approved Stitch board semantics.
- Domain language: no provider SDK terms in labels, alerts, or interaction copy.
- Lane semantics: `fixture`, `live_smoke`, `live` visible in runtime decision surfaces.
- Resilience-first: each block defines `empty`, `degraded`, `error` behavior path.
