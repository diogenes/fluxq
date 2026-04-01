# UI Contract v0.2 (Query-State Closure)

Version: `v0.2`
Owner: `react-components` + `ux-architect`
Status: `frozen-for-backend-coupling`

### Summary
This revision closes query-state semantics before backend feature wiring. All data-heavy families now accept normalized query-state contracts and derive boundary-state behavior through shared helpers.

### Inputs consumed
- `docs/process/ui-contract-v0.1.md`
- `apps/fluxq_web/assets/src/lib/ui-cx/contracts.ts`
- `apps/fluxq_web/assets/src/lib/ui-cx/query-state.ts`
- `apps/fluxq_web/assets/src/components/composition/TablePro.tsx`
- `apps/fluxq_web/assets/src/components/composition/LogViewer.tsx`
- `apps/fluxq_web/assets/src/components/charts/TelemetryPro.tsx`

### Decisions
1. Freeze `normalizeQueryState` as the canonical defaulting layer for UI query contracts.
2. Freeze `queryStateToBoundaryState` as the shared mapping from query status to `DataBoundaryState`.
3. Reuse a single translation/tone mapping source for boundary labels across `DataBoundary` and `OperationalStatePack`.
4. Keep lane semantics explicit in all query-aware families: `fixture`, `live_smoke`, `live`.

### Artifacts produced
- `ui-cx` query-state helper module and exports.
- `TelemetryPro` interaction family + stories.
- Query-state adoption in `TablePro` and `LogViewer`.
- Unified boundary state mapping in state-pack components.

### Risks / unknowns
- Query-state mapping is intentionally conservative (`status=all` resolves to `success_recovered`); backend adapters may need richer status synthesis when live evidence is partial.
- Charting families still use fixture data; backend-driven aggregation contracts remain pending.

### Next action and owning agent
- Next action: bind backend adapters to frozen `v0.2` query contracts and replace fixture datasets incrementally per journey.
- Owning agent: `frontend-quality-specialist` with triad sign-off (`quantum-ml-specialist`, `ux-architect`, `senior-design-specialist`).
