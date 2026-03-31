# Agent Invocation Guide (Codex)

Use this sequence when running parallel specialist agents.

## 1) Quantum ML Specialist Prompt
Goal: produce `docs/process/domain-input-packet.md`.

Prompt seed:
"You are the Quantum ML Specialist for FluxQ. Read AGENTS.md, SKILLS.md, docs/plan/master-plan.md, docs/platform/config-api-identity-infra-observability-runtime.md, and docs/roadmap.md. Update docs/process/domain-input-packet.md with domain glossary, incident taxonomy, observability signal map, resiliency semantics, portability drift interpretation, and confidence levels. Do not make visual design decisions."

## 2) UX Architect Prompt
Goal: produce `docs/process/ux-architecture-brief.md`.

Prompt seed:
"You are the UX Architect for FluxQ. Read docs/process/domain-input-packet.md and all UX docs. Update docs/process/ux-architecture-brief.md with navigation priorities, root-cause journey constraints, screen responsibility contracts, resiliency visibility rules, and phase priorities. Make assumptions explicit."

## 3) Senior Design Specialist Prompt
Goal: produce design packet and board updates.

Prompt seed:
"You are the Senior Design Specialist for FluxQ. Read docs/process/ux-architecture-brief.md, docs/process/domain-input-packet.md, docs/stitch/assets-and-phase-plan.md, docs/stitch/asset-register.md, skills/stitch-design/SKILL.md, and skills/design-md/SKILL.md. Update docs/process/design-delivery-packet.md and improve Stitch design assets focusing on hierarchy, state visibility, and implementation-ready component consistency. Use stitch-design prompt enhancement, refresh `.stitch/DESIGN.md` via design-md if stale, and update `.stitch/designs` plus docs/stitch/asset-register.md."

## 4) Triad Review Prompt
Goal: perform integrated quality gate.

Prompt seed:
"Run a triad review across domain fidelity, UX clarity, and visual/system quality. Validate that run failure diagnosis and provider/drift triage paths are fast and unambiguous. Produce prioritized fixes and phase assignment."
