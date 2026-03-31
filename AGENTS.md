# AGENTS.md

## Mission
Build FluxQ as a trustworthy, observability-first, BEAM-native orchestration control plane for hybrid quantum-classical workloads, with UX quality high enough for daily operational use.

## Non-Negotiable Invariants
- Preserve DDD + hexagonal dependency direction: `Domain <- Application <- Adapters`.
- Keep NxQuantum envelope compatibility: FluxQ consumes/emits envelopes without shape mutation.
- Treat deterministic lanes (`fixture`, `live_smoke`) as first-class in UX and runtime.
- Never allow provider SDK/raw payload semantics to leak into domain or UX language.
- Observability and resiliency must be visible by default in product surfaces.
- UX decisions must be traceable to domain facts from the Quantum ML Specialist.
- Use Google Stitch as the only design-generation toolchain for UX/design execution.

## Active Agent Roles
| Agent | Primary responsibility | Must produce |
| --- | --- | --- |
| `quantum-ml-specialist` | Domain truth for workflows, observability, drift, and failure modes | Domain Input Packet |
| `ux-architect` | Information architecture, journeys, interaction model, decision hierarchy | UX Architecture Brief |
| `senior-design-specialist` | Visual system, component/state language, and production-ready design boards | Design Delivery Packet |

## Mandatory Execution Order
1. `quantum-ml-specialist` produces domain packet before UX synthesis.
2. `ux-architect` converts domain packet into IA + journeys + interaction model.
3. `senior-design-specialist` produces visual execution through Stitch (`stitch-design`, `design-md`, and `stitch-loop` when iterative).
4. Joint critique pass validates domain fidelity, usability, and implementation readiness.
5. Publish handoff assets and update roadmap checklists.

## Required Reading by Agent
| Agent | Required reading |
| --- | --- |
| `quantum-ml-specialist` | `docs/plan/master-plan.md`, `docs/platform/config-api-identity-infra-observability-runtime.md`, `docs/roadmap.md` |
| `ux-architect` | `docs/ux/information-architecture-and-journeys.md`, `docs/ux/screen-blueprint-and-design-system.md`, latest domain packet |
| `senior-design-specialist` | `docs/process/design-delivery-packet.md`, `skills/stitch-design/SKILL.md`, `skills/design-md/SKILL.md`, latest UX architecture brief |

## Quality Gates (Design Process)
- No UX architecture accepted without explicit domain assumptions and confidence levels.
- No high-fidelity board accepted without empty/loading/error/resiliency states.
- No screen accepted if symptom-to-root-cause path exceeds 3 navigation steps for core incidents.
- Every design delivery must include implementation mapping to phase (`MVP-P0`, `MVP-P1`, `MVP-P2`, ...).

## Stop Rules
Stop and escalate when:
- domain inputs conflict with observed telemetry model or roadmap scope,
- UX hides retries/timeouts/fallbacks behind secondary screens,
- visual direction reduces readability for dense operational data,
- artifacts cannot be mapped to concrete implementation surfaces.

## Mandatory Handoff Format
### Summary
### Inputs consumed
### Decisions
### Artifacts produced
### Risks / unknowns
### Next action and owning agent
