# FluxQ Language Governance (Provider-neutral)

Owner: `ux-architect`
Scope: `DF-08`
Applies to: product copy, alerts, diagnostics labels, interaction text, Storybook docs

## Principle
FluxQ UI language must describe domain intent and operator outcomes, not provider SDK internals.

## Required Rules
- Prefer domain terms: `execution target`, `fallback route`, `terminal attribution`, `evidence`, `confidence`.
- Keep deterministic lane semantics explicit: `fixture`, `live_smoke`, `live`.
- Use action-oriented labels for recovery (`retry`, `reroute`, `cancel`, `export bundle`).
- Keep alert and error bodies causal, concise, and non-vendor-specific.

## Do / Don't Examples

### Status + Attribution
- Do: `Terminal attribution: timeout_signal`
- Don't: `provider_timeout` or raw SDK error enum in primary UI copy

### Routing
- Do: `Fallback route engaged due to timeout pressure.`
- Don't: `Switched to Provider B SDK path.`

### Diagnostics
- Do: `Evidence stream delayed; retry budget remains 2/5.`
- Don't: `REST 504 from vendor endpoint /v1/jobs/submit.`

### Run Detail
- Do: `Retry triggered after transient timeout signal.`
- Don't: `nxq.provider.submit.retry invoked.`

### Portability
- Do: `Confidence near threshold; compare with fixture baseline.`
- Don't: `Vendor score drift exceeded proprietary benchmark delta.`

## Vocabulary Guardrails
Allowed nouns:
- run, workflow, lane, target, fallback, attribution, confidence, comparability, evidence, incident

Restricted nouns in primary UX surfaces:
- provider brand names
- SDK namespace identifiers
- endpoint paths or transport protocol details

Allowed low-level terms in secondary diagnostics only (never default-visible):
- trace span ids
- transport status codes
- connector/internal module ids

## Review Checklist
- Does the text remain understandable if provider identity is removed?
- Does it preserve deterministic lane semantics where relevant?
- Does it suggest a next action for degraded/error states?
- Is there any raw payload or SDK term leaking into primary UI labels?
