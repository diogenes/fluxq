# Domain Input Packet

Version: `v0.2`
Owner: `quantum-ml-specialist`
Date: `2026-03-30`
Related: `docs/process/triad-review-cycle-01.md`

## 1) Domain Glossary
- `workflow`: orchestrated sequence of quantum/classical steps.
- `run`: one execution instance of a workflow version.
- `run_step`: stateful execution of one node in a run.
- `runtime_profile`: `fixture`, `live_smoke`, `live`.
- `terminal_attribution`: normalized reason a run/step ended (`success`, `provider_timeout`, `cancelled`, etc.).
- `portability_delta`: comparison tuple (`latency_delta_ms`, `expectation_delta_abs`, `sample_kl_divergence`).

## 2) Top Operator and Researcher Tasks
1. Check if active runs are healthy and progressing.
2. Understand why a run failed and whether retry/fallback happened.
3. Compare two runs across providers for drift and latency.
4. Decide when to switch provider routing strategy.
5. Validate deterministic baseline before live execution.
6. Export troubleshooting evidence for incident review.

## 3) Incident Taxonomy
- `queue_delay`: excessive wait before execution starts.
- `provider_timeout`: provider operation exceeded allowed timeout.
- `retry_exhausted`: policy retries consumed without recovery.
- `circuit_open`: provider protected by circuit-breaker.
- `result_drift`: statistical deviation beyond threshold.
- `cancellation`: user or policy initiated stop.

Severity model:
- `S1`: active production path blocked or misleading results risk.
- `S2`: degradation with workaround available.
- `S3`: minor/isolated issue with low user impact.

## 4) Observability Signal Map
- Trace spans: `nxq.workflow.run`, `nxq.provider.submit`, `nxq.provider.poll`, `nxq.provider.cancel`, `nxq.provider.fetch_result`.
- Core attributes: provider, target, workflow, runtime_profile, retry_count, poll_cycle_count, phase, terminal_attribution, correlation metadata.
- Metrics to show first-class: provider request latency, queue wait, execution duration, workflow success/failure, provider error counts.
- Correlation key for UX: `correlation_id` as top-level context anchor.

## 5) Resiliency Semantics Users Must See
- Retry policy and current attempt.
- Backoff strategy and next retry ETA.
- Timeout policy per step/provider call.
- Fallback route chosen (simulator or alternate provider).
- Circuit-breaker state and unlock behavior.
- Cancellation source and impact scope.

## 6) Portability and Drift Interpretation
- `latency_delta_ms`: operational performance drift.
- `expectation_delta_abs`: model-output shift magnitude.
- `sample_kl_divergence`: distribution behavior divergence.

Interpretation policy:
- Green: all metrics within threshold.
- Amber: one metric near threshold.
- Red: one or more metrics exceed threshold; investigate before promotion.

## 7) Copy and Terminology Guardrails
Use:
- `provider degraded`, `retrying`, `fallback engaged`, `deterministic baseline`, `drift threshold breached`.

Avoid:
- provider-internal jargon in primary UI copy,
- ambiguous claims like `quantum error` without attribution,
- language implying deterministic live-QPU outputs.

## 8) Confidence and Unknowns
High confidence:
- observability span/metric map,
- runtime profile semantics,
- portability delta trio.

Medium confidence:
- best default thresholds by workload category,
- user-preferred fallback strategy defaults.

Open unknowns:
- organization-specific SLO thresholds,
- preferred team policy defaults for cancellation/fallback.

## 9) TRIAD-01 Domain Decisions
- Enforce normalized status wording in all UX artifacts:
  - `queued`, `running`, `retrying`, `success`, `failed`, `cancelled`, `timeout`, `degraded`.
- Require `terminal_attribution` visibility in first-order run diagnostics.
- Require one-click action affordance near any `S1`/`S2` incident signal.
