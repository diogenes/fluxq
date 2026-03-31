# Triad Review Cycle 01

Version: `v0.1`
Date: `2026-03-30`
Cycle: `TRIAD-01`

## Review Scope
- Domain packet: `docs/process/domain-input-packet.md`
- UX brief: `docs/process/ux-architecture-brief.md`
- Design packet: `docs/process/design-delivery-packet.md`
- Assets: `docs/stitch/asset-register.md` and external Stitch screen links

## Panel
- `quantum-ml-specialist`: domain fidelity and observability semantics
- `ux-architect`: journey clarity and root-cause speed
- `senior-design-specialist`: visual quality and implementation-readiness

## Verdict
- Domain fidelity: `PASS with reservations`
- UX architecture: `PASS with required remediation`
- Visual/system quality: `PARTIAL` (actionability and hierarchy need a significant upgrade)

## Critical Findings (Ordered by Severity)
1. `S1` Actionability gap in incident surfaces
- Symptoms: anomaly/incident text appears without strong adjacent actions.
- Impact: operators can see a problem but need additional cognitive/interaction effort to act.
- Affected assets: Overview, Run Detail, Provider Health, Portability Analytics.

2. `S1` Inconsistent primary hierarchy in data-dense panels
- Symptoms: high-value signals and supporting metadata compete visually.
- Impact: triage speed drops, especially in failure windows.
- Affected assets: Overview KPI row, Run Detail telemetry panel, Portability tables.

3. `S1` Incomplete explicit loading/degraded-state system
- Symptoms: empty/error/degraded states are not consistently represented as first-class templates.
- Impact: users cannot distinguish transient delay from systemic failure quickly.
- Affected assets: all operational boards.

4. `S2` Resiliency semantics are present but not normalized to a single component pattern
- Symptoms: retry/timeout/fallback/circuit state appears variably by screen.
- Impact: state interpretation cost increases during incidents.
- Affected assets: Builder, Run Detail, Provider Health.

5. `S2` Terminology discipline needs stronger enforcement in UI copy templates
- Symptoms: copy can drift into mixed operator/research phrasing.
- Impact: ambiguity for mixed audience teams.
- Affected assets: all board text templates and future implementation copy.

6. `S3` Cross-screen filter model needs standardization
- Symptoms: selector/filter behavior is implied, not standardized.
- Impact: inconsistent interaction mental model between analytics and history screens.
- Affected assets: Run History (future), Portability, Provider Health.

## Triad Decisions
1. Introduce a mandatory `Incident Action Rail` component for anomaly-bearing screens.
2. Adopt a shared `Operational Status Strip` pattern (state, retry, timeout, fallback, circuit, terminal attribution).
3. Enforce a global `State Pack` for empty/loading/error/degraded/cancelled/timeouts.
4. Standardize copy using domain packet guardrails and forbidden-language checks.
5. Require every high-value panel to expose next action in <= 1 click.

## Measurable Targets for Cycle 02
- Reduce “problem seen to action initiated” path to <= 10 seconds in core triage flows.
- Ensure 100% of operational screens include explicit loading/error/degraded states.
- Ensure 100% of anomaly cards include at least one direct action CTA.
- Ensure 100% of run detail views expose normalized resiliency status strip.

## Output Artifacts from TRIAD-01
- `docs/process/ui-remediation-backlog.md`
- updates to domain/ux/design packets (v0.2)

## Risks and Unknowns
- No real user-test timing data yet for triage path speed.
- Threshold defaults for drift/routing still medium-confidence.
- Stitch MCP availability/connectivity can delay visual verification cycles.

## Next Action and Owner
- Next action: execute backlog items `UXR-001` to `UXR-005` and regenerate exports.
- Owner: `senior-design-specialist` with `ux-architect` review and `quantum-ml-specialist` copy/semantics sign-off.
