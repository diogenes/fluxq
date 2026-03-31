# FluxQ Skills

## Active Skill Set
- `skills/quantum-ml-specialist/SKILL.md`
- `skills/ux-architect/SKILL.md`
- `skills/senior-design-specialist/SKILL.md`
- `skills/design-md/SKILL.md`
- `skills/stitch-design/SKILL.md`
- `skills/stitch-loop/SKILL.md`

## Supporting Quality Skills
- `skills/enhance-prompt/SKILL.md`
- `skills/taste-design/SKILL.md`
- `skills/react-components/SKILL.md`
- `skills/shadcn-ui/SKILL.md`

## Rule
For UX/design work, execute skills in this order:
1. `quantum-ml-specialist`
2. `ux-architect`
3. `senior-design-specialist` (must use `taste-design` + `stitch-design`)
4. For weak/ambiguous requests, run `enhance-prompt` before generation.
5. If `.stitch/DESIGN.md` is missing or stale, run `design-md` before generating screens.
6. If running iterative page-build cycles, run `stitch-loop` after design packet updates.
7. If implementation artifacts are required, run `react-components` and/or `shadcn-ui` after approved design outputs.

## Triad Skill Matrix
- Domain truth: `quantum-ml-specialist`
- UX architecture: `ux-architect`
- Visual system quality guardrails: `senior-design-specialist`, `taste-design`
- Prompt quality and generation: `enhance-prompt`, `stitch-design`, `design-md`
- Iterative design loop: `stitch-loop`
- Implementation handoff: `react-components`, `shadcn-ui`

Do not skip upstream artifacts unless explicitly marked as unchanged and still valid.
