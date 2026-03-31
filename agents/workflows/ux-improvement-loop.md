# Workflow: UX Improvement Loop

## Purpose
Run a reliable multi-agent flow to improve FluxQ UX quality with strong domain grounding.

## Loop
1. Domain Intake (`quantum-ml-specialist`)
- produce/update Domain Input Packet
- mark confidence levels and unresolved domain assumptions

2. UX Architecture (`ux-architect`)
- update IA, journeys, and screen responsibilities from domain packet
- produce delta notes against previous UX baseline

3. Visual Execution (`senior-design-specialist`)
- update Stitch screens and exports
- ensure component/state consistency and phase annotations

4. Triad Review
- domain fidelity check (specialist)
- usability and journey check (ux architect)
- visual/system quality check (design specialist)

5. Handoff and Tracking
- update `docs/stitch/asset-register.md`
- update `docs/roadmap.md` checklists where applicable
- commit in small scope by artifact type

## Definition of Done (per cycle)
- domain packet updated or explicitly reaffirmed
- UX architecture decisions documented with rationale
- design boards updated with traceable UX changes
- at least one measurable improvement target identified for next cycle
