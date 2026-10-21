# UX Architecture Brief: NxQuantum Runs

Version: `v0.1`
Owner: `ux-architect` (drafted; requires owner review and convergence with `journey-bdd-spec-specialist`)
Date: `2026-10-20`
Inputs: `domain-input-packet-nxquantum-runs.md`, `docs/ux/nxquantum-envelope-resume-brief.md`, `ux-architecture-brief.md` v0.2
Related: `docs/architecture/nxquantum-gateway.md`

## 1) Diagnosis
Operators cannot tell from a run whether it is reproducible. The lane, provenance, and typed failure are present in the envelope but not surfaced. The UI must answer three questions in at most three steps: is it deterministic, what state is it in, and what failed.

## 2) Placement in navigation
- Run History gets a `Lane` filter (`fixture`, `live_smoke`, `live`, `mixed`) next to the existing state filter.
- Run Detail gets a `Provenance` panel above the timeline. It shows lane, schema version, seed digest, and, for distributed runs, node count and reassignment count.
- Provider Health links to a run's typed error instead of raw provider text.
- No new top-level navigation item. Lane is a property of a run, not a destination.

## 3) Lane presentation (copy rules are fixed)
| Lane | Badge | Required line in Provenance | Forbidden wording |
| --- | --- | --- | --- |
| `fixture` | Deterministic | "Replays with the same seed give the same result." | "live", "hardware" |
| `live_smoke` | Readiness check | "Checks the provider contract path. Not a measured outcome." | "result", "accuracy" |
| `live` | Hardware, probabilistic | "Hardware run. Results vary between runs." | "deterministic", "reproducible" |
| `mixed` | Mixed (lowest trust shown) | "Contains live tasks. Treat as probabilistic." | any deterministic wording |
| `unknown` | Unknown lane | "Lane could not be read from this record." | guessing a lane |

## 4) States and attention
- `attention` is derived: `blocked` (failed, cancelled, or missing tasks) draws the operator's eye first.
- `in_progress` shows the count of tasks still running, not a spinner alone.
- `none` shows nothing extra.

## 5) Interaction model (three-step diagnosis)
1. Run History: filter by lane or attention. Row shows badge and attention.
2. Run Detail: Provenance panel answers "deterministic?" without scrolling.
3. Failed task or error row: typed code and operation, with the link "Replay this task alone" enabled only for fixture-lane tasks.

## 6) State packs required (for Stitch and Storybook)
- Lane badge: each of the five lanes.
- Provenance panel: complete, partial (missing seed digest), and unsupported-schema states.
- Run row: blocked, in progress, none.
- Replay control: available, disabled (live lane), and confirmed or mismatched result.

## 7) Out of scope for this brief
- Visual design, color tokens, and layout (Stitch pass).
- Replay execution UI (depends on H2.1 seed provenance).
- Live-lane controls, cancellation, and retries (P1 roadmap).

## 8) Dependencies and gates
- Lane badge and Provenance panel can ship on the current single-node envelope (no distribution needed).
- Distributed fields (node count, reassignments) are gated on NxQuantum H2.1 and its determinism decision D2.
- BDD journeys must be written by `journey-bdd-spec-specialist` before any LiveView implementation (AGENTS.md steps 4–7).
