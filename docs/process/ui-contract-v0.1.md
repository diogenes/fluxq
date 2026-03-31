# UI Contract v0.1 (Pre-Backend Freeze)

Version: `v0.1`
Owner: `react-components` + `ux-architect`
Status: `frozen-for-backend-coupling`

## Summary
This document freezes the common UI contracts used to compose FluxQ operator journeys before backend integration. Backend adapters should target these contracts and avoid direct coupling to provider payloads.

## Frozen Contract Groups
- `DataBoundaryState` + `DataBoundaryContract`
- `QueryStateContract`
- `TableProContract<Row>`
- `LogViewerContract`
- `TraceTreeContract`
- `WorkflowBuilderProContract`
- `TelemetryProContract`
- `ActionGuardContract`

## Invariants
1. Deterministic lane semantics remain explicit and unchanged: `fixture`, `live_smoke`, `live`.
2. Provider-specific payload language is not allowed in default labels.
3. Governance states are first-class and visible: `no_access`, `policy_blocked`, `read_only`, `maintenance`.
4. Contract evolution follows additive-only changes inside `v0.1`.

## Adapter Guidance (Frontend-only at this phase)
- Domain/application adapters map incoming shapes to `ui-cx` contracts.
- Components only consume contract types and fixtures.
- Storybook fixtures remain the source of truth for degraded/error/loading behaviors.

## Validation Gate
For all contract-touching milestones:
- `mise exec -- npm run typecheck`
- `mise exec -- npm run build-storybook`
- `mise exec -- npm run visual:verify`
