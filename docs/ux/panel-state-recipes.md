# Panel State Recipes (Resilience-first)

Owner: `ux-architect`
Scope: `DF-07`
Applies to: shell + runtime blocks in `UI-M2` and `UI-M3`

## Goal
Guarantee every major panel defines explicit `empty`, `degraded`, and `error` behavior without hiding recovery actions.

## Recipe Format
For each panel:
- `empty`: no payload yet or no matching records.
- `degraded`: partial or stale evidence, operator can still act.
- `error`: action failed or evidence unavailable.

## Panel Recipes

### 1) Unified Filter Bar
- empty: show `No active filters` chip and keep `Apply` enabled.
- degraded: show inline warning badge when stale query index is detected.
- error: preserve current filter values and show retry affordance for query execution.

### 2) Dense Data Table
- empty: show a single explanatory row with next-best action (`adjust filters`).
- degraded: keep rows visible and annotate affected cells with warning tone.
- error: keep table shell + headers, replace rows with error callout and reload action.

### 3) Run Detail Block
- empty: show timeline scaffold placeholders and guidance to select a run.
- degraded: show partial timeline with explicit missing segments marker.
- error: lock mutation actions and surface incident rail with root-cause hint + retry.

### 4) Provider Health Block
- empty: show status strip placeholders and onboarding hint for first provider check.
- degraded: keep latest known health values with stale timestamp chip.
- error: switch diagnostics panel to failure mode while preserving route action controls.

### 5) Portability Analytics Block
- empty: comparability matrix placeholder with baseline selection prompt.
- degraded: confidence/sample quality cards remain visible with reduced confidence annotation.
- error: preserve threshold configuration panel and show failed comparison reason copy.

### 6) Livebook Linkage Block
- empty: show provenance checklist skeleton and CTA to attach a notebook session.
- degraded: show last known linkage and mark reproducibility confidence as reduced.
- error: show linkage retrieval error with action to re-sync provenance chain.

### 7) Workflow Builder Scaffold
- empty: display canvas placeholder and starter node suggestions.
- degraded: keep editable graph and annotate validation uncertainty.
- error: preserve current draft graph, block publish, and show blocking policy errors.

## Cross-panel Rules
- All degraded/error states must preserve at least one recovery action in-view.
- Keep deterministic lane label visible for all state variants.
- Never hide diagnostics rail when a panel is degraded or error.
- Do not collapse state messaging into generic toasts; panel-local explanation is required.
