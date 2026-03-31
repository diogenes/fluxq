# Runtime Action Interaction Spec

Owner: `ux-architect`
Scope: `DF-04`
Phase mapping: `UI-M2` / `UI-M3`

## Purpose
Define deterministic interaction behavior for core operational actions so retry/reroute/cancel paths remain explainable, reversible where possible, and visible in primary run surfaces.

## Actions In Scope
- `retry`
- `reroute`
- `cancel`
- `export_bundle`

## Interaction Contract

### 1) Retry
- Trigger: action rail primary action on failed/degraded run segments.
- Confirmation required: `yes`.
- Confirmation payload:
  - title: `Confirm retry action`
  - body: `Retry this run segment using current policy constraints?`
  - primary CTA: `Retry now`
  - secondary CTA: `Keep current state`
- Pending state:
  - disable all action buttons for the selected segment.
  - show inline state chip `retrying` in rail and run timeline.
- Completion states:
  - success: show `success_recovered` chip and append event to timeline.
  - failure: show `error` chip with retry budget remainder.

### 2) Reroute
- Trigger: secondary action when fallback route is available.
- Confirmation required: `yes`.
- Confirmation payload:
  - title: `Confirm reroute action`
  - body: `Switch this run segment to the configured fallback route?`
  - primary CTA: `Reroute now`
  - secondary CTA: `Keep current route`
- Pending state:
  - show `fallback_engaged` as preview only after explicit confirm.
  - keep retry action disabled while reroute mutation is in flight.
- Completion states:
  - success: lane/status strip reflects new route attribution.
  - failure: preserve prior route and surface deterministic reason copy.

### 3) Cancel
- Trigger: destructive action rail command for active operations.
- Confirmation required: `yes` with explicit irreversible warning.
- Confirmation payload:
  - title: `Confirm cancellation`
  - body: `Cancel this active run segment? This cannot be undone.`
  - primary CTA: `Cancel run segment`
  - secondary CTA: `Continue run`
- Pending state:
  - show spinner + `cancelling` transient chip.
  - disable retry/reroute to prevent action races.
- Completion states:
  - success: final state chip `cancelled` with timestamp.
  - failure: return controls and show `error` with root-cause hint.

### 4) Export bundle
- Trigger: non-destructive supporting action.
- Confirmation required: `no`.
- Pending state:
  - button enters loading state and exposes progress text.
- Completion states:
  - success: show toast + action log entry.
  - failure: inline `error` chip with `retry export` affordance.

## Shared UX Rules
- Symptom-to-root-cause path must remain within 3 steps from the run detail primary surface.
- Action outcomes must be mirrored in both timeline and incident rail.
- Do not expose provider SDK wording in modal/body labels.
- Deterministic lane labels (`fixture`, `live_smoke`, `live`) must remain visible during transitions.
- Reduced-motion mode must replace animated transitions with immediate state swaps.

## State Transition Matrix
| Action | Initial | Pending | Success | Failure |
|---|---|---|---|---|
| retry | `degraded`/`error` | `retrying` | `success_recovered` | `error` |
| reroute | `timeout`/`degraded` | `fallback_engaged` (pending) | `success_recovered` or `degraded` | `error` |
| cancel | `loading`/`retrying`/`degraded` | `cancelling` | `cancelled` | `error` |
| export_bundle | any non-pending | `loading` | `success_recovered` (toast-only attribution) | `error` |
