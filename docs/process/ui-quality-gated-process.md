# FluxQ UI Quality Gated Process

Date: `2026-03-30`  
Current design direction: `Path C (Hybrid Analyst Workspace)`  
Review model: Human-in-the-loop, gate-based approvals

## Goal
Prevent low-signal visual churn and ensure each UI iteration improves decision quality for data-heavy operators.

## Gate Workflow

### Gate 0: Quality Contract
- Define top 3 operator tasks for the target screen.
- Define success criteria and hard constraints for the iteration.
- Lock one visual direction and reject at least one alternative.
- Required approver: Product owner/human reviewer.

### Gate 1: Benchmark Mapping
- For each benchmark reference, document:
  - patterns to adopt
  - patterns to avoid
  - FluxQ-specific adaptations
- Required approver: Product owner/human reviewer.

### Gate 2: Single-Screen Spike (Overview only)
- Build one high-fidelity target screen before touching other screens.
- Include explicit state packs: `empty`, `loading`, `error`, `degraded`.
- Include CTA hierarchy and incident handling path.
- Required approver: Product owner/human reviewer.

### Gate 3: System Extraction
- Extract reusable components/tokens from approved spike.
- Validate consistency and interaction semantics.
- Required approver: Product owner/human reviewer.

### Gate 4: Controlled Rollout
- Apply system to next two screens only.
- No new visual experiments until rollout passes checks.
- Required approver: Product owner/human reviewer.

### Gate 5: Task-Based UX QA
- Run scenario checks (incident triage, provider reroute, run compare, troubleshooting export).
- Fix only gaps that block decisions and actions.
- Required approver: Product owner/human reviewer.

## Mandatory Pass/Fail Checks (Overview)
1. Active incident count and affected scope visible in first viewport.
2. Queue wait separated from execution duration in all summary surfaces.
3. Each run row shows workflow, lane, provider, step, state, age.
4. Failed/retrying rows show retry budget and terminal attribution.
5. Lanes (`fixture`, `live_smoke`, `live`) are first-class labels.
6. Live outcomes are not presented as deterministic guarantees.
7. Provider health and circuit-breaker state visible above fold.
8. Fallback usage shows target + reason + policy source.
9. Drift/comparison requires comparability + sample quality context.
10. Root-cause path from overview is <= 3 interactions.
11. Empty/loading/error/degraded preserve key decision fields.
12. No primary labels expose raw provider SDK jargon.

## Review Cadence
- One design iteration = one gate submission.
- Each submission includes:
  - updated board exports
  - checklist self-evaluation
  - explicit requested decision (`approve` / `reject`)

## Decision Protocol
- If any pass/fail item fails, iteration is rejected.
- Rework scope is constrained to failed checks only.
- New visual direction changes require returning to Gate 0.
