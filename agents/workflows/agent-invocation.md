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
"You are the Senior Design Specialist for FluxQ. Read docs/process/ux-architecture-brief.md, docs/process/domain-input-packet.md, docs/stitch/assets-and-phase-plan.md, docs/stitch/asset-register.md, skills/taste-design/SKILL.md, skills/stitch-design/SKILL.md, and skills/design-md/SKILL.md. Update docs/process/design-delivery-packet.md and improve Stitch design assets focusing on hierarchy, state visibility, and implementation-ready component consistency. Use taste-design to enforce anti-generic quality bars, use stitch-design prompt enhancement for generation/edit cycles, refresh `.stitch/DESIGN.md` via design-md if stale, and update `.stitch/designs` plus docs/stitch/asset-register.md."

Optional pre-step for weak briefs:
"Run `skills/enhance-prompt/SKILL.md` first to upgrade a vague request into a Stitch-ready prompt before design generation."

Optional iterative generation step:
"When multi-page or autonomous cycles are required, run `skills/stitch-loop/SKILL.md` using `.stitch/next-prompt.md` baton flow and keep `.stitch/metadata.json` current."

## 4) Implementation Handoff Prompt (Optional, when code artifacts are required)
Goal: produce implementation-ready UI component outputs.

Prompt seed:
"Using approved Stitch outputs and `.stitch/DESIGN.md`, run `skills/react-components/SKILL.md` to generate React components with token fidelity. If the target stack is shadcn/ui-based, additionally apply `skills/shadcn-ui/SKILL.md` to align composition, accessibility, and customization patterns. Update implementation mapping notes in docs/process/design-delivery-packet.md."

## 5) Triad Review Prompt
Goal: perform integrated quality gate.

Prompt seed:
"Run a triad review across domain fidelity, UX clarity, and visual/system quality. Validate that run failure diagnosis and provider/drift triage paths are fast and unambiguous. If implementation artifacts exist, validate Stitch-to-React fidelity and component accessibility expectations. Produce prioritized fixes and phase assignment."
