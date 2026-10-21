# UX Brief (DRAFT): Resume and Inspect Stored NxQuantum Runs

Status: draft for `ux-architect` and `journey-bdd-spec-specialist` convergence. No implementation until the Stitch design pass (AGENTS.md step 6) and the BDD packet are approved. Do not ship LiveView from this document alone.

## Problem

After a restart, an operator must answer three questions about a stored run in at most three navigation steps (FluxQ UX invariant):
1. Is this run deterministic (fixture) or probabilistic (live), and can I trust a replay?
2. What state is it in, and does it need my attention?
3. If it failed, which typed error stopped it, in which operation?

## Facts shown (source: `FluxQ.Application.EnvelopeSummary`)

| Field | Meaning on screen | Source |
| --- | --- | --- |
| `kind` | Job, result, or error | envelope `type` |
| `state` | submitted, queued, running, completed, cancelled, failed | envelope `state` |
| `provider` | Provider display name (never the SDK payload) | envelope `provider` |
| `lane` | Deterministic fixture, readiness check, or live | `metadata.transport.mode` |
| `attention` | `in_progress`, `blocked`, or `none` | derived from `state` |
| `code`, `operation` | Typed error and the operation that raised it | error envelope |

## Lane semantics (copy rules)

- `fixture`: "Deterministic. Replays give the same result." Safe to use as a regression baseline.
- `live_smoke`: "Readiness check only. Shows the contract path works, not a measured outcome."
- `live`: "Hardware run. Results are probabilistic and may vary between runs." Never say "deterministic" for live.
- `unknown`: show it as unknown. Do not guess a lane.

## Journeys (plain English, draft)

Scenario: Operator checks a stored fixture run after a restart
  Given a stored job from the fixture lane
  When the operator opens the run
  Then the run shows the lane "Deterministic"
  And the state is shown with no attention flag

Scenario: Operator resumes a stored job
  Given a stored job in state "running"
  When the operator resumes it
  Then the run is polled through its provider adapter
  And the job keeps its original id

Scenario: Operator reads a typed failure
  Given a stored error envelope with code "provider_rate_limited" from operation "poll"
  When the operator opens the error
  Then the error is marked as blocked
  And the code and operation are shown as NxQuantum reports them

Scenario: Unsupported stored data is refused, not guessed
  Given a stored envelope with schema version "v9"
  When the operator tries to resume it
  Then the run is not resumed
  And the operator sees "Unsupported envelope version v9; supported: v1"

## Open questions for convergence

1. Where do stored envelopes come from? Persistence (Ecto) is not built yet, so the first surface may be read-only.
2. Does "resume" need a confirmation step, since polling a live job can change its state?
3. What is the provider-id-to-adapter registry's owner (Application or Infra)?
4. Which Kano-level expectations apply: is lane clarity a must-be, or a delighter?

## Out of scope (this brief)

- Visual design, component states, and layout (Stitch pass).
- Live-lane controls, cancellation, and retries (P1 roadmap).
