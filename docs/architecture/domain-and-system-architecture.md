# FluxQ Domain and System Architecture

Source of truth: [Master Plan](../plan/master-plan.md)

## Architectural Direction
- Domain-Driven Design.
- SOLID module boundaries.
- Hexagonal architecture with strict dependency direction.
- Dependency rule: Domain <- Application <- Adapters.

## Bounded Contexts (Strategic)
- Identity and Access.
- Organizations and Teams.
- Workflow Catalog.
- Workflow Authoring.
- Workflow Runtime.
- Scheduling and Queueing.
- Provider Operations.
- Observability.
- Portability Analytics.
- Configuration and Policy.
- Integrations.
- Livebook Bridge.
- Audit and Compliance.

## Context Responsibilities (Condensed)

| Context | Core Ownership | Key Invariant |
|---|---|---|
| Workflow Runtime | Run and step state machine | No invalid state transitions |
| Workflow Authoring | Draft graph and policy integrity | No publish of invalid graph/policy |
| Provider Operations | Provider readiness and route health | No credential scope violations |
| Observability | Correlation model and troubleshooting bundles | Correlation links must remain resolvable |
| Portability Analytics | Cross-provider comparability and drift | Only comparable fingerprints can be compared |
| Configuration and Policy | YAML/schema normalization and policy governance | Invalid config never applied |

## Layer Mapping

### Domain Layer
- Entities and aggregates.
- Value objects and invariants.
- Domain events.

### Application Layer
- Use-case orchestration.
- Transaction boundaries.
- Policy decision evaluation.

### Adapter Layer
- Ecto repositories.
- Oban workers.
- NxQuantum gateway adapter.
- OTel exporters.
- HTTP/LiveView interfaces.

## NxQuantum Integration Boundary
- FluxQ must not leak provider SDK/raw payload semantics into domain/application layers.
- FluxQ must not mutate NxQuantum envelope shapes.
- FluxQ adds platform metadata in sidecar domain structures.

## High-Level Runtime Topology

```text
LiveView/Web/API -> Application Services -> Domain
                               |            |
                               | via ports  |
                               v            v
                         Infra Adapters -> NxQuantum -> Providers
                               |
                               v
                            Postgres + Oban + Telemetry Export
```

## Monorepo / Umbrella Recommendation
- `apps/fluxq_core`: domain, application, ports.
- `apps/fluxq_infra`: adapters, repositories, workers.
- `apps/fluxq_web`: UI and HTTP interfaces.
- `apps/fluxq_cli`: migrations, validation, seed tooling.

## Architecture Guardrails
- Add dependency-direction architecture tests from day one.
- Keep contract tests for NxQuantum gateway behavior.
- Keep feature-to-context mapping docs current during refactor.

