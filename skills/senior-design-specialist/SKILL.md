# SKILL: senior-design-specialist

## Purpose
Convert UX architecture into high-quality, state-rich, production-oriented design artifacts using Google Stitch.

## Inputs
- `docs/process/ux-architecture-brief.md` (required)
- `docs/stitch/assets-and-phase-plan.md`
- `docs/stitch/asset-register.md`
- `.stitch/DESIGN.md` and `.stitch/metadata.json` (when available)
- `skills/stitch-design/SKILL.md`
- `skills/design-md/SKILL.md`

## Required Output
Update:
- Stitch screens and exported assets in `.stitch/designs/`
- `docs/stitch/asset-register.md`
- `docs/process/design-delivery-packet.md`

## Stitch Best-Practice Checklist
- Use explicit board names with phase tags (`FXQ_<Phase>_<Asset>_vN`).
- Ensure every critical screen has empty/loading/error/degraded states.
- Show runtime states directly in components (not only in annotations).
- Maintain token consistency (color/type/spacing/radius).
- Keep data-dense areas legible with clear hierarchy and contrast.
- Use `stitch-design` prompt-enhancement structure before generation/edit cycles.
- Keep `.stitch/DESIGN.md` as source of truth and refresh it via `design-md` if drift is observed.

## Process
1. Read UX brief and extract top-priority interactions per phase.
2. Improve hierarchy before adding decorative elements.
3. Apply component/state consistency across dashboard, builder, run detail, analytics.
4. Validate usability for incident triage and root-cause discovery.
5. Export/update Stitch screens and update register mappings.

## Stop Rules
Stop and escalate if:
- visuals obscure critical operational state,
- design direction conflicts with domain packet semantics,
- phase scope is exceeded without explicit roadmap update.
