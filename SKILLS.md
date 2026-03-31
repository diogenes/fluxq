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
3. `senior-design-specialist` (must use `stitch-design`)
4. If `.stitch/DESIGN.md` is missing or stale, run `design-md` before generating screens.
5. If running iterative page-build cycles, run `stitch-loop` after design packet updates.

Do not skip upstream artifacts unless explicitly marked as unchanged and still valid.
