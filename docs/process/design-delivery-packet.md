# Design Delivery Packet

Version: `v0.3`
Owner: `senior-design-specialist`
Date: `2026-03-31`
Inputs: `ux-architecture-brief.md`, `domain-input-packet.md`
Related: `docs/process/triad-review-cycle-01.md`, `docs/process/triad-review-cycle-03-mvp-p0.md`, `docs/process/ui-remediation-backlog.md`

## 1) Delivery Scope
Boards in scope:
- overview, builder, run detail, provider health, portability analytics,
- onboarding, component library, motion/state annotations,
- roadmap phase board and supporting token sheets.

MVP-P0 delivered in this iteration:
- moodboard, token board, typography board, onboarding wizard.

## 2) Design Quality Goals
- Improve hierarchy for dense operational data.
- Increase immediate legibility of critical states.
- Strengthen CTA/action cues near anomalies and drifts.
- Keep style consistent across all phase boards.

## 3) Applied Best Practices
Stitch:
- consistent naming and phase tags,
- explicit state representations,
- exported artifact traceability in register.

Stitch flow aligned:
- taste-design guardrails for premium, non-generic visual quality,
- prompt-enhancement before generation/edit cycles,
- token-first style choices with `.stitch/DESIGN.md` as source of truth,
- iterative `edit_screens` refinement over broad regeneration,
- asset traceability through `.stitch/metadata.json` and `docs/stitch/asset-register.md`.

## 4) Remaining Gaps to Address in Next Iteration
1. add explicit in-screen state-pack variants (`empty/loading/degraded/error`) to onboarding wizard.
2. instrument measurable `<= 10 minute` onboarding path checkpoints to run detail.
3. add explicit 3-step symptom-to-root-cause path annotation in onboarding.
4. align onboarding navigation labels to IA contracts for continuity.
5. keep provider-neutral domain-safe copy for onboarding fallback examples.

## 5) Handoff Mapping
- asset register: `docs/stitch/asset-register.md`
- serialized source snapshot: `.stitch/metadata.json`
- exported screens: `.stitch/designs/`

## 6) Implementation Handoff (When Required)
- Design quality guardrails: `skills/taste-design/SKILL.md`
- Prompt uplift for ambiguous briefs: `skills/enhance-prompt/SKILL.md`
- Iterative autonomous generation: `skills/stitch-loop/SKILL.md`
- React component generation: `skills/react-components/SKILL.md`
- shadcn/ui alignment and composition: `skills/shadcn-ui/SKILL.md`
- Quality expectation:
  - token fidelity with `.stitch/DESIGN.md`
  - accessibility-safe interaction and form patterns
  - state parity with designed operational states
