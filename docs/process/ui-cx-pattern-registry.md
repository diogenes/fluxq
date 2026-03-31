# UI-CX Pattern Registry

Version: `v0.1`
Owner: `react-components`
Source corpus: all `.stitch/designs/*.html` (24 files)

## Extraction Method
- Parsed all Stitch HTML files for recurring layout structures, semantic labels, and repeated class/token patterns.
- Grouped patterns into component families and marked each as `canonical`, `variant`, or `legacy`.
- Canonical defaults come from latest/approved boards where behavior overlaps.

## Component Family Inventory

| Family ID | Component Family | Scope | Canonical Source(s) | Variant Sources |
|---|---|---|---|---|
| CX-F01 | Top Navigation Shell | brand, global search, utility actions | `fxq-overview-operator-v2`, `mvp-p2-provider-health-v2` | all p0/p1/p2 boards with top bars |
| CX-F02 | Left Navigation Rail | sectioned nav, active item, compact labels | `mvp-p1-component-library-v2`, `mvp-p2-portability-v2` | run-detail/provider/workflow variants |
| CX-F03 | Right Action/Inspector Rail | grouped actions, support context, diagnostics snippets | `mvp-p1-run-detail-v2`, `mvp-p2-portability-v2` | workflow/provider/livebook right panels |
| CX-F04 | Lane + Baseline Selector | `fixture`/`live_smoke`/`live` toggle with baseline affordance | `mvp-p1-run-detail-v2`, `mvp-p1-workflow-builder-v2` | portability/provider variants |
| CX-F05 | KPI / Status Strip | incidents, retry pressure, timeout, fallback/circuit indicators | `mvp-p2-provider-health-v2`, `mvp-p2-portability-v2` | overview/operator variants |
| CX-F06 | Filter + Toolbar | global filters, lane filters, table controls, query/search | `mvp-p2-provider-health-v2`, `mvp-p2-portability-v2` | overview/run-detail variants |
| CX-F07 | Dense Data Table | sortable tabular metrics with mono values and state cells | `mvp-p2-provider-health-v2`, `mvp-p2-portability-v2` | component-library tables |
| CX-F08 | Timeline + Event Rail | chronological sequence with states and causality pivots | `mvp-p1-run-detail-v2` | provider-health/portability timelines |
| CX-F09 | Trace Tree + Span Evidence | nested execution spans and drilldown context | `mvp-p1-run-detail-v2` | investigation/operator variants |
| CX-F10 | Structured Logs Panel | timestamped logs with severity and compact row rendering | `mvp-p1-run-detail-v2`, `mvp-p2-portability-v2` | provider/livebook variants |
| CX-F11 | Workflow Builder Canvas Kit | node palette, canvas, connectors, node state cards | `mvp-p1-workflow-builder-v2` | workflow-builder-v1 |
| CX-F12 | Chart Primitive Set | trend lines, heatmap blocks, matrix/delta visuals | `mvp-p2-portability-v2`, `mvp-p2-provider-health-v2` | component-library variants |
| CX-F13 | Drift Narrative Blocks | comparability, confidence, sample-quality narratives | `mvp-p2-portability-v2` | run-detail drift references |
| CX-F14 | Onboarding Stepper + Progress | step cards, readiness checks, progress states | `mvp-p0-onboarding-wizard-v4` | onboarding v1-v3 |
| CX-F15 | State-Pack Surface | `empty/loading/degraded/error/retrying/timeout/fallback/cancelled/success_recovered` | `mvp-p1-component-library-v2`, `mvp-p2-motion-state-v2` | run-detail/provider/portability variants |

## Priority and Extraction Order

| Priority | Families | Why First |
|---|---|---|
| P0 | CX-F01..CX-F05, CX-F15 | Required shell semantics and operational state language across all journeys |
| P1 | CX-F06..CX-F10 | Core observability and triage interactions |
| P2 | CX-F11..CX-F14 | Advanced workflow/chart/onboarding compositions |

## Variant Policy
- Keep one canonical implementation per family.
- Keep variants only when they represent interaction differences, not mere styling drift.
- Legacy variants remain Storybook references, not production defaults.

## Acceptance Criteria for Registry Updates
- Every new journey screen must map to existing family IDs before adding new families.
- Any new family requires at least 2 source references or one strong domain-specific rationale.
- Provider-specific vocabulary is disallowed in family naming and default labels.
