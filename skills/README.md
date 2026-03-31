# FluxQ Skills Directory

These skills operationalize the agent loop used to improve FluxQ UX quality.

## Available Skills
- `quantum-ml-specialist`
- `ux-architect`
- `senior-design-specialist`
- `design-md`
- `stitch-design`
- `stitch-loop`
- `enhance-prompt`
- `taste-design`
- `react-components`
- `shadcn-ui`

## Execution Order
1. `quantum-ml-specialist`
2. `ux-architect`
3. `senior-design-specialist` (via `stitch-design`)
4. `design-md` when `.stitch/DESIGN.md` needs synthesis/refresh
5. `stitch-loop` for autonomous iteration loops

## Quality Support Skills
- `enhance-prompt`: upgrades vague requests into Stitch-optimized design prompts.
- `taste-design`: enforces premium visual standards and anti-generic guardrails in `DESIGN.md`.
- `react-components`: converts Stitch outputs into validated React component implementations.
- `shadcn-ui`: normalizes component implementation quality and accessibility in production UI.

## Output Contract
Each skill run must output:
- assumptions
- decisions
- deliverables written/updated
- open risks
- next owner
- Stitch artifacts touched (`.stitch/DESIGN.md`, `.stitch/metadata.json`, `.stitch/designs/*`) when design work is executed
