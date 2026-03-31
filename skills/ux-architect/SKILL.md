# SKILL: ux-architect

## Purpose
Translate domain truth into information architecture, journeys, and interaction contracts that are implementation-ready.

## Inputs
- `docs/process/domain-input-packet.md` (required)
- `docs/ux/information-architecture-and-journeys.md`
- `docs/ux/screen-blueprint-and-design-system.md`
- `docs/roadmap.md`

## Required Output
Create or update: `docs/process/ux-architecture-brief.md`

## Required Sections in UX Architecture Brief
1. Updated sitemap and navigation rationale
2. Top journeys with happy/error/degraded paths
3. Symptom-to-root-cause flow map
4. Screen responsibilities and cross-links
5. Priority by roadmap phase
6. UX risks and mitigation strategy
7. Domain assumptions consumed from packet

## Process
1. Validate domain packet freshness and confidence.
2. Design for observability-first triage (state at a glance -> drill-down).
3. Ensure retries/timeouts/fallbacks appear in primary operational views.
4. Add deterministic-lane visibility and controls where decisions are made.
5. Produce actionable interaction contracts for design execution.

## Stop Rules
Stop and escalate if:
- any core journey cannot reach root-cause in <= 3 meaningful steps,
- resiliency controls are only available in deep settings,
- required domain assumptions are low-confidence and unresolved.
