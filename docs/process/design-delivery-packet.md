# Design Delivery Packet

Version: `v0.4`
Owner: `senior-design-specialist`
Date: `2026-03-31`
Inputs: `ux-architecture-brief.md`, `domain-input-packet.md`
Related: `docs/process/triad-review-cycle-01.md`, `docs/process/triad-review-cycle-03-mvp-p0.md`, `docs/process/triad-review-cycle-04-mvp-p1.md`, `docs/process/triad-review-cycle-05-mvp-p2.md`, `docs/process/ui-remediation-backlog.md`

## 1) Delivery Scope
Boards in scope:
- overview, builder, run detail, provider health, portability analytics,
- onboarding, component library, motion/state annotations,
- roadmap phase board and supporting token sheets.

MVP-P0 delivered in this iteration:
- moodboard, token board, typography board, onboarding wizard.

MVP-P1 delivered in this iteration:
- workflow builder, run detail, component/state library.

MVP-P2 delivered in this iteration:
- provider health, portability analytics, Livebook linkage, motion/state board.
- desktop v2 refinements applied after TRIAD-05 blocker pass (provider-neutral copy, state-pack parity, transition contract completion).

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
1. validate generated desktop boards against real runtime event payload samples in implementation.
2. verify motion token names map 1:1 to frontend animation primitives without naming drift.
3. add targeted interaction specs for troubleshooting bundle export flow variants.

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
  - provider-neutral language per `docs/ux/language-governance.md`

## 7) MVP-P0 Handoff Map (shadcn + React + Phoenix)
| Surface Module | shadcn Primitive | React Component Target | Phoenix Event / Contract Hint |
|---|---|---|---|
| Onboarding stepper + health checklist | `card`, `progress`, `badge`, `button` | `OnboardingWizard`, `OnboardingChecklist` | `onboarding.step.changed`, `onboarding.health.checked` |
| Deterministic lane primer | `tabs`, `badge`, `tooltip` | `LanePrimerPanel` | `runtime_profile.selected` (`fixture`, `live_smoke`, `live`) |
| Operational state-pack (`empty/loading/degraded/error`) | `alert`, `skeleton`, `badge`, `card` | `OperationalStatePack` | `run.state.changed`, `runtime.health.degraded` |
| Incident action rail | `sheet`, `button`, `dropdown-menu` | `IncidentActionRail` | `run.retry.requested`, `run.cancel.requested`, `bundle.export.requested` |
| Token and typography references | `table`, `separator`, `badge` | `DesignTokenReference`, `TypographyReference` | N/A (design-time artifact) |

## 8) MVP-P1 Handoff Map (shadcn + React + Phoenix)
| Surface Module | shadcn Primitive | React Component Target | Phoenix Event / Contract Hint |
|---|---|---|---|
| Workflow builder canvas and node palette | `card`, `tabs`, `accordion`, `select`, `button` | `WorkflowBuilderCanvas`, `NodePalette`, `NodeInspector` | `workflow.node.updated`, `workflow.validation.requested` |
| Validation and preflight tray | `alert`, `badge`, `separator`, `table` | `ValidationTray`, `PreflightStatus` | `workflow.preflight.completed` |
| Run detail timeline + trace + logs | `tabs`, `card`, `table`, `badge`, `sheet` | `RunDetailTimeline`, `TraceTree`, `StructuredLogPanel` | `run.detail.loaded`, `run.trace.expanded` |
| Incident action rail | `sheet`, `button`, `dropdown-menu`, `tooltip` | `IncidentActionRail` | `run.retry.requested`, `run.reroute.requested`, `bundle.export.requested` |
| Component/state library matrix | `table`, `badge`, `alert`, `accordion` | `ComponentStateMatrix`, `OperationalStatusStripReference` | N/A (design-time artifact) |

## 9) MVP-P2 Handoff Map (shadcn + React + Phoenix)
| Surface Module | shadcn Primitive | React Component Target | Phoenix Event / Contract Hint |
|---|---|---|---|
| Provider health board | `card`, `badge`, `tabs`, `alert`, `table` | `ProviderHealthBoard`, `ProviderCircuitCard`, `RoutingImpactPanel` | `provider.health.updated`, `provider.circuit.state_changed`, `runtime.route.rebalanced` |
| Portability analytics | `table`, `badge`, `alert`, `tabs`, `progress` | `PortabilityMatrix`, `ConfidenceBandStrip`, `SampleQualityPanel` | `portability.comparison.ready`, `portability.drift.threshold_crossed` |
| Livebook linkage and provenance | `card`, `timeline`, `accordion`, `alert`, `button` | `LivebookLaunchPanel`, `ProvenanceChainView`, `ReproducibilityChecklist` | `livebook.launch.requested`, `run.provenance.attached`, `provenance.bundle.exported` |
| Motion/state contract board | `table`, `badge`, `tooltip`, `tabs`, `alert` | `RuntimeTransitionContractTable`, `LaneMotionPolicyPanel` | `run.state.transitioned`, `runtime.motion.profile_selected`, `ui.reduced_motion.enabled` |
