# Stitch Asset Register

Owner: `senior-design-specialist`  
Updated: `2026-03-31`

This register tracks Stitch assets used by FluxQ design delivery and their mapping to roadmap phases.

## Columns
- `Asset ID`: Stable artifact label in FluxQ docs/process.
- `Phase`: Roadmap phase mapping (`MVP-P0`, `MVP-P1`, `MVP-P2`, ...).
- `Surface`: Product surface represented.
- `Stitch Screen Ref`: Stitch screen identifier or path (`projects/{id}/screens/{id}`).
- `Local Export`: Local generated artifact path (typically `.stitch/designs/*.html|png`).
- `Status`: `planned`, `in_progress`, `ready_for_review`, `approved`, `superseded`.
- `Notes`: Traceability, assumptions, and follow-up actions.

## Assets

| Asset ID | Phase | Surface | Stitch Screen Ref | Local Export | Status | Notes |
|---|---|---|---|---|---|---|
| `FXQ_MVP-P0_Moodboard_v1` | `MVP-P0` | Moodboard and visual direction | `projects/5264572250204306984/screens/3265cf789b784da5bf587b618ff0cda4` | `.stitch/designs/mvp-p0-moodboard-v1.html` | `approved` | Triad-03 approved with domain-safe lane semantics and state language references. |
| `FXQ_MVP-P0_Tokens_v1` | `MVP-P0` | Token baseline board | `projects/5264572250204306984/screens/d0ff264d54fd426ba66d48a6ef79dcef` | `.stitch/designs/mvp-p0-tokens-v1.html` | `superseded` | Superseded after triad findings (radius drift and wording cleanup). |
| `FXQ_MVP-P0_Tokens_v2` | `MVP-P0` | Token baseline board (refined) | `projects/5264572250204306984/screens/ef96988c03af4481887aa7d0854baadc` | `.stitch/designs/mvp-p0-tokens-v2.html` | `approved` | Normalized radius tokens and added deterministic lane + state-pack token mapping. |
| `FXQ_MVP-P0_Typography_v1` | `MVP-P0` | Typography and copy system | `projects/5264572250204306984/screens/c4cb98d99d064ddd9de92c6aeb8e0747` | `.stitch/designs/mvp-p0-typography-v1.html` | `approved` | Includes incident copy templates, anti-pattern language, and state microcopy examples. |
| `FXQ_MVP-P0_OnboardingWizard_v1` | `MVP-P0` | Welcome/setup wizard | `projects/5264572250204306984/screens/3353a8d055d249298ba656d4e6da90c7` | `.stitch/designs/mvp-p0-onboarding-wizard-v1.html` | `superseded` | Superseded after triad findings for state-pack and measurable timing instrumentation. |
| `FXQ_MVP-P0_OnboardingWizard_v2` | `MVP-P0` | Welcome/setup wizard (refined) | `projects/5264572250204306984/screens/6d83cdd2527644f39ed32f88630d3672` | `.stitch/designs/mvp-p0-onboarding-wizard-v2.html` | `superseded` | Superseded after adding explicit demo success/failure evidence and completion checkpoint. |
| `FXQ_MVP-P0_OnboardingWizard_v3` | `MVP-P0` | Welcome/setup wizard (gate-close draft) | `projects/5264572250204306984/screens/ec1ef3ea371f4b899ce70349cb0e97c1` | `.stitch/designs/mvp-p0-onboarding-wizard-v3.html` | `superseded` | Superseded after IA label normalization and provider-neutral fallback copy pass. |
| `FXQ_MVP-P0_OnboardingWizard_v4` | `MVP-P0` | Welcome/setup wizard (gate-closed) | `projects/5264572250204306984/screens/3626fbf60e7a4a76b8d2a5bbd8c26b52` | `.stitch/designs/mvp-p0-onboarding-wizard-v4.html` | `approved` | Final gate closure version with canonical IA naming and provider-neutral fallback wording. |
| `FXQ_MVP-P1_RunDetail_v1` | `MVP-P1` | Run detail investigation | `TBD` | `.stitch/designs/mvp-p1-run-detail-v1.html` | `planned` | Must expose status strip + incident action rail above fold. |
| `FXQ_MVP-P1_WorkflowBuilder_v1` | `MVP-P1` | Workflow builder | `TBD` | `.stitch/designs/mvp-p1-workflow-builder-v1.html` | `planned` | Must include policy and validation visibility in one screen model. |
| `FXQ_MVP-P1_ComponentLibrary_v1` | `MVP-P1` | Component/state library | `TBD` | `.stitch/designs/mvp-p1-component-library-v1.html` | `planned` | Must include state parity and shadcn mapping references. |
| `FXQ_MVP-P2_ProviderHealth_v1` | `MVP-P2` | Provider operations | `TBD` | `.stitch/designs/mvp-p2-provider-health-v1.html` | `planned` | Must show circuit-breaker and routing impact semantics. |
| `FXQ_MVP-P2_Portability_v1` | `MVP-P2` | Portability and drift analytics | `TBD` | `.stitch/designs/mvp-p2-portability-v1.html` | `planned` | Must include comparability/sample-quality context. |
| `FXQ_MVP-P2_LivebookLinkage_v1` | `MVP-P2` | Livebook linkage and provenance | `TBD` | `.stitch/designs/mvp-p2-livebook-linkage-v1.html` | `planned` | Must preserve run correlation and provenance chain visibility. |
| `FXQ_MVP-P2_MotionStateBoard_v1` | `MVP-P2` | Motion and runtime state board | `TBD` | `.stitch/designs/mvp-p2-motion-state-v1.html` | `planned` | Must define runtime motion semantics for retry, timeout, fallback, cancellation. |

## Update Rules
- Update this file whenever a Stitch screen is generated, edited, or superseded.
- Record final `Stitch Screen Ref` from `.stitch/metadata.json`.
- Keep one active approved version per surface per phase unless an explicit A/B test is in progress.
