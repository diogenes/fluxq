# FluxQ Bootstrap and Delivery Recommendations

Source of truth: [Master Plan](../plan/master-plan.md)

## Bootstrap Sequence
1. Create umbrella apps (`fluxq_core`, `fluxq_infra`, `fluxq_web`, `fluxq_cli`).
2. Add architecture docs and dependency-direction tests.
3. Add AGENTS and SKILLS guidance aligned with NxQuantum discipline.
4. Implement run/step state machine and policy domain model.
5. Add repositories, migrations, and Oban runtime queues.
6. Add NxQuantum gateway adapter and envelope contract tests.
7. Implement first LiveView surfaces (Welcome, Overview, Catalog, Run Detail).
8. Add YAML import + JSON Schema validation flow.
9. Seed deterministic demo data and guided onboarding path.
10. Wire telemetry and troubleshooting bundle exports.

## First Module Set
- Domain: workflow, workflow_version, run, run_step, policy modules.
- Application: workflow publish, run dispatch, run transition, policy evaluate, portability compare.
- Ports: run repository, policy repository, nxq gateway, event bus, telemetry sink.
- Adapters: Ecto repositories, Oban workers, NxQuantum bridge, OTel exporter.

## First Test Matrix
- Unit tests for domain invariants.
- Architecture dependency direction tests.
- Contract tests for NxQuantum envelope passthrough.
- Feature tests for workflow authoring to run execution path.
- LiveView smoke tests for run detail observability UX.

## Delivery Standards
- Behavior-first acceptance scenarios.
- Deterministic fixture/simulator tests mandatory.
- Architecture boundary checks in CI.
- Docs update required for user-facing and architectural changes.

## Recommended Immediate Next Work
- Complete roadmap progress board implementation.
- Produce first set of Stitch MVP assets.
- Scaffold umbrella project and architecture test harness.
