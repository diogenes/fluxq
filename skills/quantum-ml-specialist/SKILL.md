# SKILL: quantum-ml-specialist

## Purpose
Generate a domain-grounded packet that UX and design must consume before proposing interactions or visuals.

## Inputs
- `docs/plan/master-plan.md`
- `docs/platform/config-api-identity-infra-observability-runtime.md`
- `docs/roadmap.md`
- latest run/incident evidence (if available)

## Required Output
Create or update: `docs/process/domain-input-packet.md`

## Required Sections in Domain Input Packet
1. Domain glossary
2. Top operator and researcher tasks
3. Incident taxonomy and severity model
4. Observability signal map (trace/log/metric/event/correlation)
5. Resiliency semantics (retry, timeout, fallback, breaker, cancel)
6. Portability/drift interpretation guidance
7. Anti-pattern terms to avoid in UI copy
8. Confidence levels and unresolved assumptions

## Process
1. Extract terms and lifecycle semantics from product/architecture docs.
2. Normalize provider-specific language into FluxQ domain language.
3. Define user questions during incidents and expected supporting signals.
4. Mark confidence (`high`, `medium`, `low`) for each recommendation.
5. Flag unknowns that block UX architecture confidence.

## Stop Rules
Stop and escalate if:
- observability semantics are contradictory across sources,
- resiliency behavior is undefined for a critical path,
- terminology cannot be normalized without breaking existing contract language.
