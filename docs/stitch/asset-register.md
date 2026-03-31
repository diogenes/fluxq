# Stitch Asset Register

Owner: `senior-design-specialist`  
Updated: `2026-03-30`

This register tracks Stitch assets used by FluxQ design delivery and their mapping to roadmap phases.

## Columns
- `Asset ID`: Stable artifact label in FluxQ docs/process.
- `Phase`: Roadmap phase mapping (`MVP-P0`, `MVP-P1`, `MVP-P2`, ...).
- `Surface`: Product surface represented.
- `Stitch Screen Ref`: Stitch screen identifier or path (`projects/{id}/screens/{id}`).
- `Local Export`: Local generated artifact path (typically `.stitch/designs/*.html|png`).
- `Status`: `planned`, `in_progress`, `ready_for_review`, `approved`, `superseded`.
- `Notes`: Traceability, assumptions, and follow-up actions.

## Assets

| Asset ID | Phase | Surface | Stitch Screen Ref | Local Export | Status | Notes |
|---|---|---|---|---|---|---|
| `FXQ_MVP-P0_Onboarding_v1` | `MVP-P0` | Welcome/Setup wizard | `TBD` | `.stitch/designs/onboarding-v1.html` | `planned` | Must include dependency checks and deterministic lane messaging. |
| `FXQ_MVP-P1_RunDetail_v1` | `MVP-P1` | Run detail investigation | `TBD` | `.stitch/designs/run-detail-v1.html` | `planned` | Must expose status strip + incident action rail above fold. |
| `FXQ_MVP-P1_WorkflowBuilder_v1` | `MVP-P1` | Workflow builder | `TBD` | `.stitch/designs/workflow-builder-v1.html` | `planned` | Must include policy and validation visibility in one screen model. |
| `FXQ_MVP-P2_ProviderHealth_v1` | `MVP-P2` | Provider operations | `TBD` | `.stitch/designs/provider-health-v1.html` | `planned` | Must show circuit-breaker and routing impact semantics. |
| `FXQ_MVP-P2_Portability_v1` | `MVP-P2` | Portability and drift analytics | `TBD` | `.stitch/designs/portability-v1.html` | `planned` | Must include comparability/sample-quality context. |

## Update Rules
- Update this file whenever a Stitch screen is generated, edited, or superseded.
- Record final `Stitch Screen Ref` from `.stitch/metadata.json`.
- Keep one active approved version per surface per phase unless an explicit A/B test is in progress.
