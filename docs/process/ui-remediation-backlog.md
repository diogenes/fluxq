# UI Remediation Backlog

Version: `v0.1`
Date: `2026-03-30`
Source: `TRIAD-01`

## Prioritization Model
- Priority = user impact on incident handling + implementation urgency.
- Effort: `S`, `M`, `L`.
- Owners: `QMLS` (Quantum ML Specialist), `UXA` (UX Architect), `SDS` (Senior Design Specialist).

## Backlog

| ID | Priority | Item | Phase Target | Owners | Effort | Acceptance Criteria |
|---|---|---|---|---|---|---|
| `UXR-001` | P0 | Introduce `Incident Action Rail` in all anomaly-bearing screens | MVP-P1 | UXA, SDS | M | Overview, Run Detail, Provider Health, Portability show contextual CTA actions on incident/anomaly rows. |
| `UXR-002` | P0 | Standardize `Operational Status Strip` | MVP-P1 | QMLS, UXA, SDS | M | Run Detail and Builder show normalized strip with retry, timeout, fallback, circuit, terminal attribution. |
| `UXR-003` | P0 | Establish global state pack templates | MVP-P1 | UXA, SDS | M | Every operational board has explicit empty/loading/error/degraded states and visual examples. |
| `UXR-004` | P0 | Rebuild typography/contrast hierarchy for dense cards | MVP-P1 | SDS | S | Primary signals are visually dominant; metadata remains readable without overpowering key values. |
| `UXR-005` | P0 | Enforce domain-safe copy dictionary | MVP-P0 | QMLS, UXA | S | Screen copy follows allowed terms and avoids forbidden terms from domain packet. |
| `UXR-006` | P1 | Standardize filter/query interaction model | MVP-P2 | UXA, SDS | M | Provider Health, Portability, and future Run History use a consistent filter bar and chip language. |
| `UXR-007` | P1 | Add timeline severity markers and action hooks | MVP-P1 | UXA, SDS | M | Run timelines include severity color, attribution tooltip, and one-click drill-down action. |
| `UXR-008` | P1 | Strengthen portability decision framing | MVP-P2 | QMLS, UXA, SDS | M | Delta table includes threshold context, status class, and recommended action per breach. |
| `UXR-009` | P1 | Add provider routing recommendation panel | MVP-P2 | QMLS, UXA, SDS | M | Provider Health includes recommendation rationale tied to queue/error/latency metrics. |
| `UXR-010` | P2 | Add triage command palette shortcuts | v0.2 | UXA, SDS | M | Command palette supports direct jump to active incidents, failed runs, provider anomalies. |
| `UXR-011` | P2 | Add policy simulation preview UI | v0.2 | UXA, SDS | L | Retry/backoff/fallback policy changes are previewable before apply. |
| `UXR-012` | P2 | Integrate quick compare from Run Detail | MVP-P2 | UXA, SDS | M | Run Detail provides one-click compare to baseline/provider peer with preserved filters. |

## Milestone Mapping

### MVP-P0
- [ ] `UXR-005` domain-safe copy enforcement

### MVP-P1
- [ ] `UXR-001` incident action rail
- [ ] `UXR-002` operational status strip
- [ ] `UXR-003` global state pack templates
- [ ] `UXR-004` typography/contrast hierarchy
- [ ] `UXR-007` timeline severity + hooks

### MVP-P2
- [ ] `UXR-006` standardized filter/query model
- [ ] `UXR-008` portability decision framing
- [ ] `UXR-009` provider routing recommendation panel
- [ ] `UXR-012` quick compare from run detail

### v0.2
- [ ] `UXR-010` command palette triage shortcuts
- [ ] `UXR-011` policy simulation preview UI

## Immediate Execution Sequence (Next 2 Sprints)
1. Sprint A
- `UXR-001`, `UXR-002`, `UXR-004`

2. Sprint B
- `UXR-003`, `UXR-005`, `UXR-007`

## Tracking Rule
- Mark item as done only when:
1. design artifact updated,
2. asset register updated,
3. exported board regenerated,
4. implementation mapping note added in design packet.
