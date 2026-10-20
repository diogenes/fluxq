# NxQuantum Gateway (FluxQ side)

Status: implemented for the fixture lane (2026-10-19). Branch `nxquantum-0.12-gateway`.

## Boundary

| Layer | Module | Responsibility |
| --- | --- | --- |
| Port (application) | `FluxQ.Ports.NxQuantumGateway` | `decode/1`, `resume/3` behaviour. Application code depends on this only. |
| Adapter (infra) | `FluxQ.Infra.NxQuantum.Gateway` | Delegates to `NxQuantum.ProviderBridge` and `NxQuantum.ProviderBridge.Serialization`. |
| Projection (application, pure) | `FluxQ.Application.EnvelopeSummary` | Turns an envelope map into operator facts: kind, state, provider, lane, attention, typed error. |

Rules (from `AGENTS.md`):
1. FluxQ consumes and emits NxQuantum envelopes unchanged. The summary is a projection, never persisted back into the envelope.
2. No provider SDK payloads reach `EnvelopeSummary`. It reads only envelope top-level fields and `metadata.transport.mode`.
3. Failures stay NxQuantum typed errors (`NxQuantum.ProviderBridge.ProviderError`, or `%{code: ...}` maps from decoding). FluxQ does not invent error codes.

## Dependency

`apps/fluxq/mix.exs` declares `{:nx_quantum, path: "../../../nxquantum"}`. Both repos must be checked out as siblings. The path dependency is a development-time choice. Switch to a version pin (`~> 0.12`, or a git tag) once NxQuantum 0.12.0 is published. CI must check out `nxquantum` next to `fluxq` until then.

`{:jason, "~> 1.4", only: :test}` is test-only: path dependencies do not bring their dev/test dependencies along.

## G2 gate (envelope compatibility)

`apps/fluxq/test/fluxq/nx_quantum_contract_test.exs` reads NxQuantum's golden snapshots through `Mix.Project.deps_paths()[:nx_quantum]`:
- every stored job, result, and error decodes and re-encodes unchanged;
- every stored job resumes through the gateway with its id intact, for all four core providers;
- unsupported schema versions surface NxQuantum's typed error unchanged.

If NxQuantum changes an envelope without a `schema_version` bump, the snapshot test fails in NxQuantum first. The policy is in NxQuantum's `docs/api-stability.md`.

## Known limits

1. Resume covers jobs only. Results are returned as decoded; re-fetching a result is not yet wired.
2. The adapter module is not part of the envelope. Callers pass it at resume time, which means FluxQ needs a provider-id-to-adapter registry before live runs. That registry is not built yet.
3. Live lanes are not exercised by G2; live outcomes are probabilistic and are covered by the NxQuantum live-smoke lanes.
