# FluxQ Stitch Design Proposal v1

Date: `2026-03-31`
Owner: `senior-design-specialist`
Review mode: `triad-gated`

## Summary
This proposal packages your ZIP inputs into a Stitch-ready design system and a triad quality gate for FluxQ's operator workflows. It keeps domain semantics first (QML/ops reliability), preserves usability for daily triage, and prepares direct migration into shadcn-based React components later.

## Inputs consumed
- `tmp/stitch_fluxq_design_requirements/fluxq_design_requirements.html`
- `tmp/stitch_fluxq_design_requirements/stitch_fluxq_design_requirements/fluxq_quantum/DESIGN.md`
- `tmp/stitch_fluxq_design_requirements/stitch_fluxq_design_requirements/a_system_operator_deck/code.html`
- `tmp/stitch_fluxq_design_requirements/stitch_fluxq_design_requirements/a_dashboard_operator_deck/code.html`
- `tmp/stitch_fluxq_design_requirements/stitch_fluxq_design_requirements/a_investigation_operator_deck/code.html`
- Existing FluxQ process artifacts:
  - `docs/process/domain-input-packet.md`
  - `docs/process/ux-architecture-brief.md`
  - `docs/process/ui-quality-gated-process.md`

## Decisions
1. Adopt a dark, operations-first visual baseline from the proposal decks (mission-control profile).
2. Normalize all generated Stitch screens around FluxQ mandatory shell:
   - top bar
   - left nav
   - right inspector rail
3. Enforce domain guardrails from QML perspective:
   - explicit lane labels (`fixture`, `live_smoke`, `live`)
   - separate queue wait vs execution duration
   - explicit drift metric trio and comparability gates
4. Keep design system implementation-ready with shadcn mapping (without implementing React yet).
5. Keep triad gate active before each screen rollout.

## Triad gate (v1)
### Quantum-ML Specialist gate
- Pass conditions met:
  - lane semantics preserved
  - resiliency statuses explicit (`retry`, `timeout`, `fallback`, `terminal attribution`)
  - comparability context required before drift interpretation
- Remaining checks for next iteration:
  - verify provider and drift thresholds by workload archetype
  - validate language against real incident logs from pilot users

### UX Architect gate
- Pass conditions met:
  - incident actionability in right rail
  - root-cause path can be constrained to <= 3 transitions
  - state-pack requirements explicit (`empty`, `loading`, `degraded`, `error`)
- Remaining checks for next iteration:
  - standardize filter interactions across Overview, Provider Health, Portability, Runs
  - validate first-viewport scannability with operator walkthrough timing

### Senior Design Specialist gate
- Pass conditions met:
  - coherent tonal system and hierarchy
  - reusable block structure (status strip, KPI row, decision table, trace panel, timeline)
  - implementation mapping for shadcn-ready component primitives
- Remaining checks for next iteration:
  - balance high-density data readability on smaller laptop screens
  - harden empty/error/degraded visual parity across all core screens

## Artifacts produced
- Stitch design system source of truth:
  - `.stitch/DESIGN.md`
- Stitch screen generation prompt pack:
  - `.stitch/SCREEN_PROMPTS.md`
- Review package (this file):
  - `docs/stitch/proposals/fluxq-design-proposal-v1.md`
- Triad review artifact:
  - `docs/process/triad-review-cycle-02.md`

## Risks / unknowns
- Stitch MCP execution endpoint is not exposed in this Codex tool session, so this pass produced Stitch-ready artifacts and prompts locally rather than pushing directly to a Stitch project.
- Real operator validation is still needed for decision-table density and incident action speed.
- Drift threshold defaults are still medium-confidence and must be tuned with workload telemetry.

## Next action and owning agent
- Next action: run this proposal through your live Stitch MCP project as Screen Set v1 (`Overview`, `Run Investigation`, `System Deck`) using `.stitch/DESIGN.md`, then run triad Gate 2 review.
- Owner: `senior-design-specialist`, with sign-off by `quantum-ml-specialist` and `ux-architect`.
