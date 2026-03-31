# FluxQ Information Architecture and User Journeys

Source of truth: [Master Plan](../plan/master-plan.md)

## Information Architecture

### Primary Navigation
- Overview
- Workflows
- Runs
- Providers
- Analytics
- Alerts
- Livebook
- Settings
- Admin

### Secondary Navigation
- Workflows: Catalog, Builder, Templates, Imports.
- Runs: Active, History, Search, Compare.
- Providers: Health, Capacity, Errors, Credentials.
- Analytics: Portability, Drift, Explorer, Reports.
- Settings: Runtime Profiles, Policies, Integrations, API.
- Admin: Organizations, Teams, Roles, Audit.

### Key Entities
- Workflow and WorkflowVersion.
- Run, RunStep, RunEvent.
- ProviderConnection and ProviderHealthSnapshot.
- PolicySet and AlertRule.
- PortabilityBaseline and DriftRecord.
- LivebookLink and NotebookRunContext.

### Navigation Model for LiveView
- Left rail for stable mental model.
- URL param-driven filters/search state.
- Global command palette for quick jump.
- PubSub-backed live updates for run/provider surfaces.

## Core User Journeys

| Journey | Goal | Happy Path | Error Path | Delight Lever |
|---|---|---|---|---|
| First-time onboarding | Get value in minutes | Run local stack -> seed demo -> first dashboard | Missing env/dependency | Setup health checks and one-click fixes |
| Simulator-first guided demo | Understand product workflow quickly | Open sample -> run fixture -> inspect run detail | Seed not loaded | Guided, annotated walkthrough |
| Connect provider | Enable live workloads | Add credential -> readiness validation -> test run | Auth or target mismatch | Clear diagnostics and redaction-safe previews |
| Browse workflow catalog | Find or reuse workflows | Filter/search -> open workflow -> run or edit | Empty results | Smart template suggestions |
| Author workflow | Create new hybrid flow | Build DAG -> attach policy -> validate -> save | Graph/policy invalid | Real-time lint and actionable hints |
| Import YAML | Bring external definitions | Upload -> validate schema -> preview diff -> publish | Schema mismatch | Inline error mapping with fix suggestions |
| Execute workflow | Launch safely | Select runtime/provider strategy -> preflight -> queue/run | Capability mismatch | Preflight explanation and alternatives |
| Observe active run | Track runtime behavior | Live graph + timeline + telemetry tabs | Stream interruption | Auto reconnect and continuity markers |
| Investigate failed run | Identify root cause fast | Error summary -> failing step -> trace/log links | Missing telemetry | Root-cause narrative and action guidance |
| Compare cross-provider runs | Assess portability | Select comparable runs -> delta analysis | Fingerprint mismatch | Comparability badge with reason |
| Validate drift | Detect regression over time | Baseline vs current trend with thresholds | Sparse data confidence | Confidence score and sample quality info |
| Launch from Livebook | Bridge research and operations | Launch run with notebook metadata | Auth/link mismatch | Bidirectional deep links |
| Analyze with Explorer | Inspect outputs deeply | Dataframe preview -> compare -> export | Large data latency | Progressive loading |
| Manage resiliency policy | Tune reliability | Edit retries/backoff/fallback -> simulate -> apply | Conflicting policies | Visual policy simulator |
| Manage teams and roles | Govern access | Invite users -> assign roles -> audit | Permission conflict | Permission matrix preview |

