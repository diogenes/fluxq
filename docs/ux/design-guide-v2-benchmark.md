# FluxQ Design Guide v2 (Benchmark-Led)

Date: `2026-03-30`  
Scope: Dashboard quality uplift for `Overview`, `Run Detail`, `Provider Health`  
Status: Direction selected (`Path C`)

## Why v2
- Current boards communicate domain intent but still read as sparse wireframes.
- We need tighter context grouping, clearer action hierarchy, and stronger CTA affordance.
- This guide turns benchmark patterns into implementation-ready design rules for Stitch and LiveView.

## Benchmark References (3+)

1. Vercel Observability Overview (2025)
- Link: [Vercel changelog entry](https://vercel.com/changelog/overview-page-in-observability)
- Screenshot (dark): [Observability Overview Dark](https://vercel.com/vc-ap-vercel-marketing/_next/image?q=75&url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7qKn3WxJ6Da5j7KfLq63SA%2F0521fc128c9b723823079a457345c451%2FObservability_Overview_-_Dark.png&w=1920)
- Benchmark signals:
  - High-level KPI overview as first surface.
  - Metrics double as drill-down entry points.
  - Left navigation + card grid keeps cognitive map stable.

2. Datadog Dashboards
- Link: [Datadog Dashboards page](https://www.datadoghq.com/product/platform/dashboards/)
- Screenshot: [Datadog dashboard UI](https://imgix.datadoghq.com/img/products/hero-v2/product_hero_platform_dashboards_250815_dark.png?auto=format&ch=Width%2CDPR%2CSave-Data&fit=max&fm=png&w=710)
- Benchmark signals:
  - Correlated telemetry mindset (metrics/traces/logs side by side).
  - Fast context pivoting from one panel to deeper investigation.
  - Strong top control bar for filters/time range/actions.

3. Apache Superset Dashboard
- Link: [Superset home](https://superset.apache.org/)
- Screenshot: [Superset dashboard hero](https://superset.apache.org/img/hero-screenshot.jpg)
- Benchmark signals:
  - Clean filter row + composable panel grid.
  - Clear spacing rhythm and strong panel boundaries.
  - Good scanability for mixed chart/table cards.

4. Grafana Dashboard Principles (supporting reference)
- Link: [Grafana dashboard docs](https://grafana.com/docs/grafana/latest/dashboards/)
- Benchmark signals:
  - Dashboard as a set of panels organized for at-a-glance understanding.
  - Reusable variables, annotations, links, and sharing flow.
  - Practical model for investigation-oriented surfaces.

## FluxQ v2 Design Directives

1. Structure by context, not by widget type
- Zone A: `Global control` (time window, provider scope, runtime profile, actions).
- Zone B: `System pulse` (KPI strip + operational status strip).
- Zone C: `Main evidence` (runs/timeline/health views).
- Zone D: `Action rail` (incident actions, safe retries, export, compare, reroute).

2. Enforce explicit action hierarchy
- One primary CTA per screen section (filled button with gradient or indigo).
- Secondary CTAs ghost/outline.
- Dangerous actions isolated with warning styling and confirmation affordance.

3. Turn cards into decision surfaces
- Every card must include:
  - state
  - key metric
  - interpretation hint
  - next action

4. Keep observability correlated by default
- Trace/log/metric entry points must be visually linked from run/incident rows.
- Add one-click "Open correlated telemetry" on anomaly-bearing elements.

5. Normalize global state packs
- Each operational screen must show designed `empty`, `loading`, `error`, `degraded`.
- Use reusable templates, not ad hoc placeholders.

## Candidate Visual Paths

### Path A (Recommended): Calm Command Center
- Mood: restrained dark, high legibility, crisp spacing, subtle violet-blue accents.
- Pros:
  - Best fit for infra trust and long-session operations.
  - Lowest risk for MVP implementation in LiveView.
  - Strong compatibility with current FluxQ color system.
- Risks:
  - Needs careful typographic contrast to avoid "flat dark board."

### Path B: Dense Operator Cockpit
- Mood: information-rich, compact tables/panels, near NOC-style density.
- Pros:
  - Excellent for power users and incident response.
  - Maximizes data-per-screen.
- Risks:
  - Higher cognitive load for new users.
  - Larger accessibility and responsive complexity burden.

### Path C: Hybrid Analyst Workspace
- Mood: balanced light/dark split, stronger chart emphasis, research-friendly.
- Pros:
  - Good for QML/research workflows and presentation.
  - Best for comparison and analytical storytelling.
- Risks:
  - Harder visual consistency across operational workflows.
  - More theming complexity early.

## Selected Baseline
- Baseline: `Path C` (Hybrid Analyst Workspace) for MVP-P1/P2
- Selection rationale:
  - Audience is data-heavy and needs dense comparison and analytical drill-down.
  - Better fit for run comparison, portability drift analysis, and lane-aware operations.
  - Supports investigator workflows where table+chart composition matters more than hero-level visuals.
- Borrow selectively:
  - From Path A: clarity-first CTA hierarchy and restraint in visual noise.
  - From Path B: compact mode toggle for incident triage shifts.

## Quantum ML Specialist Domain Constraints (Applied)
- Separate queue pressure from execution latency in all summary surfaces.
- Always label lanes (`fixture`, `live_smoke`, `live`) in active-run views.
- Show terminal attribution + retry budget status above fold for failed/retrying runs.
- Keep provider health + circuit-breaker state visible without navigation.
- Gate drift/comparison with comparability and sample-quality context.
- Never lead with raw provider SDK language in primary labels.

## Implementation Rules (Stitch + LiveView)
- Use 8px spacing scale with 24px/32px section padding on desktop.
- Preserve one dominant region per screen (no equal-weight triptych layouts).
- Standardize reusable CTA components:
  - `Button.Primary`
  - `Button.Secondary`
  - `Button.Incident`
- Standardize reusable rails:
  - `OperationalStatusStrip`
  - `IncidentActionRail`
  - `FilterControlBar`

## Exit Criteria for v2 Upgrade
- `Overview`, `Run Detail`, and `Provider Health` each contain:
  - context zones A-D
  - primary and secondary CTA separation
  - explicit incident action rail
  - explicit operational status strip
  - designed state packs
- Exported assets replaced and indexed in `docs/stitch/asset-register.md`.
