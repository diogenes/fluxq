# UI-CX Journey Mapping

Version: `v0.1`
Owner: `ux-architect` + `react-components`
Input: all `.stitch/designs/*.html`

## Journey to Component Family Matrix

| Journey / Screen Cluster | Primary Sources | Required Families |
|---|---|---|
| Operator Overview | `fxq-overview-operator-v2` | CX-F01, CX-F02, CX-F03, CX-F04, CX-F05, CX-F06, CX-F07, CX-F12, CX-F15 |
| Investigation / Run Detail | `fxq-investigation-operator-v2`, `mvp-p1-run-detail-v2` | CX-F01, CX-F02, CX-F03, CX-F04, CX-F05, CX-F08, CX-F09, CX-F10, CX-F15 |
| Workflow Authoring | `mvp-p1-workflow-builder-v2` | CX-F01, CX-F02, CX-F03, CX-F04, CX-F11, CX-F15 |
| Provider Operations | `mvp-p2-provider-health-v2` | CX-F01, CX-F02, CX-F03, CX-F04, CX-F05, CX-F06, CX-F07, CX-F10, CX-F12, CX-F15 |
| Portability Analytics | `mvp-p2-portability-v2` | CX-F01, CX-F02, CX-F03, CX-F04, CX-F05, CX-F06, CX-F07, CX-F10, CX-F12, CX-F13, CX-F15 |
| Livebook Linkage | `mvp-p2-livebook-linkage-v2` | CX-F01, CX-F02, CX-F03, CX-F04, CX-F10, CX-F15 |
| Motion + State Reference | `mvp-p2-motion-state-v2` | CX-F12, CX-F15 |
| Onboarding | `mvp-p0-onboarding-wizard-v1..v4` | CX-F01, CX-F03, CX-F04, CX-F14, CX-F15 |

## Required State Coverage by Journey

| Journey | Required States |
|---|---|
| Operator Overview | `loading`, `degraded`, `error`, `success_recovered` |
| Investigation / Run Detail | `retrying`, `timeout`, `fallback_engaged`, `error`, `cancelled` |
| Workflow Authoring | `loading`, `error`, `degraded`, `success_recovered` |
| Provider Operations | `degraded`, `timeout`, `fallback_engaged`, `error` |
| Portability Analytics | `degraded`, `error`, `success_recovered` |
| Livebook Linkage | `loading`, `error`, `success_recovered` |
| Onboarding | `empty`, `loading`, `degraded`, `error` |

## Composition Contract
- All journeys compose from family IDs; page-specific components are orchestration wrappers only.
- Runtime-critical surfaces must keep lane selector and action rail visible without extra navigation.
- Timeline/trace/log components share one correlation model and one severity scale.

## Implementation Sequence
1. Extract shell and state semantics (CX-F01..CX-F05, CX-F15).
2. Extract runtime observability surfaces (CX-F06..CX-F10).
3. Extract advanced modules (CX-F11..CX-F14).
4. Compose each journey using mapped families and verify Storybook variant parity.
