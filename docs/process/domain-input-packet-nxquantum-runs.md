# Domain Input Packet: NxQuantum Runs (Envelope, Lanes, Distributed Fan-out)

Version: `v0.1`
Owner: `quantum-ml-specialist` (drafted; requires owner review)
Date: `2026-10-20`
Inputs: NxQuantum `docs/vision.md` §7 (H2), `docs/api-stability.md` (envelope policy), FluxQ `domain-input-packet.md` v0.2
Related: `docs/architecture/nxquantum-gateway.md`, `docs/ux/nxquantum-envelope-resume-brief.md`

## 1) Glossary additions
- `envelope`: NxQuantum's versioned external map for `job`, `result`, or `error`. Stored and returned unchanged (`schema_version` `v1`).
- `lane`: how a run was executed. `fixture` (deterministic replay), `live_smoke` (readiness check only), `live` (hardware, probabilistic). Read from `metadata.transport.mode`.
- `fan_out_task`: one unit of a distributed NxQuantum job (a sweep point, a batch of shots, or a fragment). Each task carries node, seed, and attempt.
- `fragment`: one piece of a cut circuit, run as a task and recombined by classical reconstruction (H2.2).
- `seed_provenance`: the job seed plus task index that produced a task's result. Required to replay any single task.
- `attention`: derived state for operators: `in_progress`, `blocked`, `none`. Derived from envelope `state`, never stored as truth.

## 2) Operator and researcher tasks (additions)
1. Tell whether a distributed run's results are deterministic or probabilistic before using them.
2. Find which node or task failed, and whether it was re-dispatched with the same seed.
3. Replay one task alone from its seed provenance to confirm a result.
4. Refuse or quarantine envelopes from an unsupported schema version, rather than guessing at them.

## 3) Incident taxonomy (additions)
- `node_lost`: a BEAM node hosting tasks disconnected mid-run. Severity default `S2` when all tasks re-dispatch, `S1` when results are missing.
- `task_redispatched`: a task re-ran with its original seed after loss. Informational, but operators must see the attempt count.
- `envelope_version_unsupported`: stored envelope has an unknown `schema_version`. Severity `S2` (data is held, not lost).
- `replay_mismatch`: a fixture-lane replay did not reproduce the stored result. Severity `S1`: it breaks the determinism claim for that run.
- `lane_mismatch`: a run shown as deterministic was produced on `live` or `live_smoke`. Severity `S1`.

## 4) Observability signal map (additions)
- Spans: `nxq.fanout.dispatch`, `nxq.fanout.task`, `nxq.fanout.reassign`. Attributes: node, task_index, seed_digest, attempt, lane.
- Metrics first-class: tasks per node, reassignments per run, replay pass rate (fixture lane), envelope decode failures.
- Never show provider SDK payloads. Show only the envelope fields and the lane.

## 5) Determinism rules that UI copy depends on
1. Same job seed and same task partition give identical per-task results on 1 node and N nodes (fixture lane). If NxQuantum H2.1 does not pass this gate, the UI must say "result-deterministic only" and must not claim trace determinism.
2. `live` results are never labeled deterministic.
3. A replay is only "confirmed" when the fixture-lane replay matches the stored result within the stated tolerance.

## 6) Open domain questions
1. What is the acceptable tolerance for a fixture-lane replay match (exact bytes, or numeric within a fixed bound)?
2. Should a `node_lost` run be shown as `blocked` until every task has re-dispatched, or as `in_progress`?
3. Which lane applies to a run that mixes fixture and live tasks? Proposed: show the lowest-trust lane (`live`).
