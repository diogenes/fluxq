# FluxQ Product Positioning and Principles

Source of truth: [Master Plan](../plan/master-plan.md)

## Product Positioning

### One-Line Description
FluxQ is a BEAM-native quantum workflow orchestration and observability platform for reliable hybrid quantum-classical workloads.

### Product Line
**FluxQ powered by NxQuantum**

### Audience Segments
- Elixir/BEAM platform engineers.
- Quantum and hybrid workflow developers.
- QML/ML engineers integrating classical + quantum stages.
- Research teams requiring reproducibility.
- Operations teams requiring visibility and reliability controls.

### Value Proposition
FluxQ centralizes orchestration, observability, and resiliency policy around NxQuantum’s typed provider contracts, so teams can move from experiment to operational workflows without losing reliability context.

### Why FluxQ Matters
- Eliminates fragmented execution across scripts/notebooks/provider consoles.
- Makes run-state visibility and failure attribution first-class.
- Preserves deterministic fixture/simulator lanes while supporting live provider operations.
- Provides governance and team controls required for serious self-hosted usage.

## Complementarity with NxQuantum

### NxQuantum Owns
- Execution engine.
- Typed provider lifecycle facade (`submit`, `poll`, `cancel`, `fetch_result`).
- Provider normalization and contract stability.
- Runtime modes (`fixture`, `live_smoke`, `live`).

### FluxQ Owns
- Orchestration and workflow runtime policy.
- Queueing, retries, timeouts, cancellation, fallback control.
- Persistence and run history.
- Operational UX, observability UX, portability analytics UX.
- Team/tenant governance and platform integration surfaces.

### Integration Boundary
FluxQ consumes and emits NxQuantum envelopes unchanged. FluxQ-specific concerns are stored as sidecar metadata and domain entities.

## Product and UX Principles

| Principle | Practical Implication |
|---|---|
| Flow-first | Workflows and state transitions drive navigation and UX framing. |
| Observability by default | Every execution surface has logs/traces/metrics context from day one. |
| Deterministic lanes first-class | Fixture/simulator are explicit runtime profiles in core UX. |
| Explicit resiliency | Retries, backoff, circuit-breakers, fallback are visible and explainable. |
| Progressive disclosure | Basic defaults for speed, advanced controls for experts. |
| Correlation-first | `correlation_id` and run lineage are visible and linkable everywhere. |
| Honest probabilistic communication | Live lanes communicate uncertainty clearly and never overpromise determinism. |
| Boundary integrity | Strict Domain <- Application <- Adapters architecture. |
| Local-first delight | Docker onboarding and seeded demos are polished product surfaces. |
| Docs as product | Architecture, playbooks, and examples are treated as key deliverables. |

