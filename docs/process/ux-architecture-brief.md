# UX Architecture Brief

Version: `v0.2`
Owner: `ux-architect`
Date: `2026-03-30`
Inputs: `domain-input-packet.md`, roadmap, UX docs
Related: `docs/process/triad-review-cycle-01.md`, `docs/process/ui-remediation-backlog.md`

## 1) UX Diagnosis (Current)
Primary quality issues observed:
- weak visual hierarchy in dense operational areas,
- insufficiently explicit state transitions in some views,
- readability risk from compact text in high-information blocks,
- limited action affordance near metrics and incident cues.

## 2) Navigation Priorities
Primary nav order:
1. Overview
2. Workflow Catalog
3. Run History
4. Provider Health
5. Portability Analytics
6. Alerts
7. Workflow Builder
8. Livebook Bridge
9. Settings
10. Team/Admin

Rationale:
- puts triage and operational awareness before authoring.

## 3) Core Journeys and Root-Cause Speed
Target: symptom to root-cause in <= 3 meaningful transitions.

Flow A (run failure triage):
- Overview alert tile -> Run Detail -> correlated trace/log/metric panel.

Flow B (provider degradation):
- Provider Health anomaly -> affected runs list -> Run Detail timeline.

Flow C (drift incident):
- Portability Analytics breach row -> run comparison details -> linked run details.

## 4) Screen Responsibility Contracts
- Overview: answer “what needs action now?”
- Run Detail: answer “what happened and why?”
- Provider Health: answer “is routing safe now?”
- Portability Analytics: answer “is behavior still equivalent enough?”
- Builder: answer “what will this workflow do under failure?”

## 5) Resiliency Visibility Rules
Always visible in first-order run surfaces:
- retry attempt/current max,
- timeout policy and elapsed time,
- fallback chosen/not chosen,
- circuit-breaker state,
- terminal attribution.

## 6) Phase Priorities
- MVP-P0: onboarding + IA clarity + token consistency baseline.
- MVP-P1: run detail + overview + builder clarity and stateful behavior.
- MVP-P2: provider health + drift analytics + Livebook provenance.

## 7) UX Risks
- risk: visual polish without decision clarity.
- risk: over-compressed layouts reducing scan speed.
- risk: observability data shown without action pathways.

Mitigation:
- design reviews require action mapping per card/panel.

## 8) TRIAD-01 Required UX Upgrades
1. Add mandatory `Incident Action Rail` interaction pattern.
2. Add shared `Operational Status Strip` contract for run/builder diagnostics.
3. Enforce global state-pack coverage for empty/loading/error/degraded states.
4. Standardize query/filter behavior across provider, portability, and run-surfaces.
