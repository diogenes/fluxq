# Stitch Asset Plan and Phase Mapping

Owner: `senior-design-specialist`  
Updated: `2026-03-30`

## Purpose
Define the Stitch-first design execution plan for FluxQ and map design assets to roadmap phases.

## Stitch Artifact Model
- Design system source of truth: `.stitch/DESIGN.md`
- Project and screen identifiers: `.stitch/metadata.json`
- Prompt baton for iterative generation: `.stitch/next-prompt.md`
- Generated HTML/screenshots: `.stitch/designs/`
- FluxQ canonical register in docs: `docs/stitch/asset-register.md`

## Naming and Traceability Rules
- Asset naming pattern: `FXQ_<Phase>_<Surface>_vN`
- Every asset entry must map to one roadmap phase (`MVP-P0`, `MVP-P1`, `MVP-P2`, ...)
- Every generated screen must include state coverage references:
  - `empty`
  - `loading`
  - `error`
  - `degraded`
  - `timeout/cancelled` (for operational surfaces)

## Phase Mapping

### MVP-P0 (Onboarding and UX Foundations)
Required Stitch outputs:
- Moodboard and visual direction frames
- Token-aligned typography and spacing references
- Onboarding/setup wizard screens and deterministic-lane guidance

Primary files:
- `.stitch/DESIGN.md`
- `.stitch/designs/onboarding*.html|png`
- `docs/stitch/asset-register.md`

### MVP-P1 (Core Runtime and Run Observability)
Required Stitch outputs:
- Workflow builder core surfaces
- Run detail investigation surface (graph + timeline + telemetry)
- Component/state library references

Primary files:
- `.stitch/designs/workflow-builder*.html|png`
- `.stitch/designs/run-detail*.html|png`
- `.stitch/designs/component-library*.html|png`
- `docs/stitch/asset-register.md`

### MVP-P2 (Provider Ops, Portability, Livebook)
Required Stitch outputs:
- Provider health and operations views
- Portability/drift analytics screens
- Livebook linkage and provenance surfaces
- Motion/state reference board for runtime behavior communication

Primary files:
- `.stitch/designs/provider-health*.html|png`
- `.stitch/designs/portability*.html|png`
- `.stitch/designs/livebook-linkage*.html|png`
- `.stitch/designs/motion-state*.html|png`
- `docs/stitch/asset-register.md`

## Quality Gates
- No screen accepted without explicit incident action affordance.
- No high-density operational panel accepted without clear hierarchy and contrast.
- No triage-critical screen accepted if symptom-to-root-cause path exceeds 3 navigation steps.
- All design decisions must map back to domain packet semantics.

## Handoff Contract
Every iteration updates:
- `docs/process/design-delivery-packet.md`
- `docs/stitch/asset-register.md`
- relevant roadmap checklist lines in `docs/roadmap.md`
