# FluxQ Planning Package

Version: Draft 1  
Date: 2026-03-29  
Positioning: **FluxQ powered by NxQuantum**

FluxQ is the orchestration, observability, resiliency, and control-plane layer for NxQuantum. NxQuantum remains the execution engine and typed provider contract layer.

This document is intentionally implementation-aware and follows the same quality discipline used in NxQuantum: strict DDD boundaries, Hexagonal architecture, deterministic fixture/simulator lanes, typed contract stability, and behavior-first development flow.

---

## Section 1 — Product Positioning

### 1.1 Target Audience
- Elixir/BEAM platform teams building production pipeline systems.
- Quantum developers running provider-backed workloads.
- QML and ML engineers building hybrid quantum-classical workflows.
- Research teams needing reproducibility and operational traceability.
- Infra/SRE teams responsible for reliability, incident response, and cost/risk control.

### 1.2 User Personas

| Persona | Main Objective | Pain Today | FluxQ Value |
|---|---|---|---|
| Quantum Platform Engineer | Reliable orchestration across providers | Ad hoc scripts, unclear retries/failures | Policy-driven runtime control and normalized execution visibility |
| Research Scientist | Experiment fast and reproducibly | Notebook fragmentation, poor lineage | Livebook-linked reproducible runs with run metadata preservation |
| ML Engineer | Integrate hybrid steps in one pipeline | Manual glue code and inconsistent execution semantics | Unified DAG/state model across classical + quantum stages |
| SRE / Operations Lead | Diagnose failures quickly | Logs/traces/metrics disconnected | Correlated observability and troubleshooting bundles |
| Team Admin | Govern access and credentials | Weak role separation and auditability | Org/team RBAC, credential isolation, audit trails |
| OSS Contributor | Contribute safely and predictably | Unclear architecture ownership | Clear contexts, ADR process, deterministic tests |

### 1.3 Jobs-to-be-Done
- Define and version workflows visually and declaratively.
- Execute workflows reliably with transparent runtime control.
- Observe run state and diagnose issues quickly.
- Compare runs across providers and over time.
- Keep deterministic fixture/simulator lanes first-class.
- Move from local demo to self-hosted deployment with minimal friction.

### 1.4 Major Pains Solved
- Fragmented execution across scripts, notebooks, and provider dashboards.
- Weak visibility into queueing, retries, and failure attribution.
- Manual correlation of traces, logs, metrics, and run metadata.
- Lack of consistent resiliency policy for provider variability.
- Limited reproducible workflow comparison and portability analysis.

### 1.5 Value Proposition
**FluxQ is a BEAM-native quantum workflow orchestration and observability platform for reliable hybrid quantum-classical workloads.**

### 1.6 Why BEAM is Uniquely Appropriate
- OTP supervision aligns with long-running, failure-prone workflows.
- Lightweight processes fit step-level concurrency and isolation.
- LiveView + PubSub enables real-time operational UX with low client complexity.
- Fault-tolerant runtime and deterministic process patterns fit reliability goals.

### 1.7 Why FluxQ Complements NxQuantum
- NxQuantum: execution, typed provider lifecycle contracts, portability primitives.
- FluxQ: orchestration, queueing, retries, cancellation, persistence, observability UX, control-plane governance.
- FluxQ must consume and emit NxQuantum envelopes **without shape mutation**.

### 1.8 Ecosystem Importance
- Creates the missing BEAM-native control plane for quantum workflows.
- Gives Elixir teams a full-stack path from research to operations.
- Strengthens BEAM + Nx + Livebook as a credible hybrid quantum-application platform.

---

## Section 2 — Product Principles

| Principle | Rationale |
|---|---|
| Flow-first, not page-first | Users reason about run state transitions, not static screens. |
| Observability is default | Reliability confidence is core product value. |
| Deterministic lanes are first-class | Fixture/simulator workflows are foundational, not fallback docs-only paths. |
| Typed contracts over implicit behavior | Prevents cross-layer and cross-provider drift. |
| Provider complexity is normalized | Keep UX stable while preserving raw metadata for experts. |
| Fast symptom-to-root-cause navigation | Incident response speed drives trust. |
| Visible resiliency behavior | Users must see retries, backoff, circuit-open, and fallback decisions. |
| Progressive disclosure | Avoid overwhelming users while preserving depth for advanced teams. |
| Correlation-first model | Every major artifact links through correlation metadata. |
| Honest probabilistic messaging | Never imply deterministic live-QPU outcomes. |
| Domain boundary integrity | Long-term OSS maintainability depends on clean architecture. |
| Local-first delight | Onboarding quality is adoption leverage. |
| Docs as product surface | Specs, schemas, and examples are core UX for technical users. |

---

## Section 3 — Information Architecture

### 3.1 Primary Navigation (Left Rail)
- Overview
- Workflows
- Runs
- Providers
- Analytics
- Alerts
- Livebook
- Settings
- Admin

### 3.2 Secondary Navigation (Context Tabs)
- Workflows: Catalog, Builder, Templates, Imports
- Runs: Active, History, Search, Compare
- Providers: Health, Capacity, Errors, Credentials
- Analytics: Portability, Drift, Explorer, Reports
- Settings: Runtime Profiles, Policies, Integrations, API
- Admin: Organizations, Teams, Roles, Audit

### 3.3 Key Entities
- Organization, Team, User, Role, Membership
- Workflow, WorkflowVersion, Node, Edge, Template
- Run, RunStep, StepAttempt, RunEvent
- ProviderConnection, ProviderHealthSnapshot
- PolicySet (retry, backoff, timeout, fallback, cancellation)
- AlertRule, AlertIncident
- PortabilityBaseline, DriftRecord
- LivebookLink, NotebookRunContext
- TroubleshootingBundle

### 3.4 Movement Model
- Overview -> Workflow catalog via “Recent workflows”.
- Catalog -> Builder via “Edit workflow”.
- Builder -> Run detail via “Test run”.
- Run detail -> Run history via workflow/version filters.
- Run detail -> Provider health via provider badge.
- Run detail -> Portability analytics via compare action.
- Livebook surface -> Run detail via linked run list.

### 3.5 LiveView Navigation Recommendation
- Route by context with stable URL params for filters/search.
- Global command palette for direct entity navigation.
- PubSub topics scoped by org/team/run for real-time updates.

---

## Section 4 — Core User Journeys

| Journey | User Goal | Entry Point | Happy Path | Error Path | UX Risks | Delight Driver |
|---|---|---|---|---|---|---|
| First-time local Docker onboarding | Run platform quickly | Welcome screen | Compose up -> seed data -> first dashboard | Missing env/service | Setup friction | Health checklist + one-click demo |
| Simulator-first guided demo | Understand value in minutes | Welcome CTA | Load sample workflow -> fixture run -> inspect run | Seed/import issue | Empty state confusion | Guided walkthrough with annotated UI |
| Connecting a provider | Add live backend safely | Providers > Credentials | Add credentials -> readiness check -> test submit | Auth/target mismatch | Secret anxiety | Redacted preview + explicit diagnostics |
| Browsing workflow catalog | Discover reusable workflows | Workflows > Catalog | Filter/sort -> open details -> run | No results | Dead-end browsing | Smart templates and import suggestions |
| Authoring a workflow | Build hybrid flow fast | Builder | Drag nodes -> configure policies -> validate/save | Invalid graph/policy | Builder overload | Real-time lint + contextual recommendations |
| Importing YAML workflow | Bring external config in | Workflows > Imports | Upload -> schema validate -> diff preview -> publish | Schema incompatibility | Text-heavy complexity | Inline fix hints with line mapping |
| Executing a workflow | Start run confidently | Workflow detail | Pick profile/strategy -> preflight -> queue/run | Capability mismatch | Hidden constraints | Preflight explanation panel |
| Observing active run live | Track progress and health | Run detail | Live graph + timeline + metrics update | Stream interrupted | Trust loss | Seamless reconnect + continuity markers |
| Investigating failed run | Find failure cause quickly | Alert or run detail | Error summary -> step trace -> provider context -> action | Missing telemetry | Blame ambiguity | “Why failed” narrative synthesis |
| Comparing runs across providers | Evaluate portability | Runs > Compare | Select runs -> compare deltas -> export | Not comparable fingerprints | False conclusions | Comparability badge with reasons |
| Validating portability drift | Detect regression trends | Analytics > Drift | Baseline vs current -> threshold check -> incident flag | Sparse sample set | Overconfidence | Confidence score + sample quality indicator |
| Launching from Livebook | Trigger run from notebook | Livebook integration | Submit run with metadata -> open FluxQ run page | Auth/context mismatch | Context switching cost | Bidirectional deep links |
| Exploring results with Explorer | Analyze run outputs deeply | Analytics > Explorer | Preview dataframe -> summarize -> compare -> export | Large payload latency | Slow interaction | Progressive loading + sampled previews |
| Managing retry/backoff/fallback | Tune resiliency safely | Workflow policy panel | Edit policy -> simulate behavior -> apply | Conflicting rules | Policy complexity | Visual policy simulator timeline |
| Managing users/teams/roles | Apply governance | Admin | Invite user -> assign role -> audit trail | Permission denial | RBAC opacity | Permission matrix preview |

---

## Section 5 — Screen-by-Screen UX Blueprint

| Screen | Purpose | Layout Hierarchy | Major Components | Critical Actions | Key Data | Empty/Loading/Error | Confidence Contribution |
|---|---|---|---|---|---|---|---|
| Welcome/Setup | Fast activation | Hero -> Checklist -> Demo CTA | Setup wizard, readiness cards | Start demo, connect provider | Service health, seed status | Clear setup diagnostics | “System ready” certainty |
| Home/Overview | Operational snapshot | KPIs -> Active runs -> Alerts -> Providers | Metric tiles, run feed, alert panel | Jump to run, acknowledge alert | Success/failure rates, queue wait | Skeleton + partial data handling | At-a-glance system trust |
| Workflow Catalog | Discover/manage workflows | Filter bar -> Grid/List -> details drawer | Workflow cards, tags, ownership labels | Open, duplicate, run | Version, owner, status | Template-first empty state | Findability and confidence |
| Workflow Detail | Understand one workflow | Header -> Graph summary -> policy -> run history | Mini DAG, policy chips, run table | Run now, compare, edit | Last run outcome, policies | Validation/time freshness markers | Readiness before execution |
| Workflow Builder | Author and validate flows | Palette -> Canvas -> Inspector -> Validation tray | Node library, graph canvas, YAML panel | Add/edit nodes, validate, test run | Node config and policy bindings | Inline validation mapping | Prevents invalid orchestration |
| Run Detail | Core debugging and trust | Status header -> Live graph -> timeline -> telemetry tabs | Node states, trace tree, logs panel, metric charts | Cancel, retry, export bundle | Correlation IDs, durations, terminal attribution | Reconnect-safe streaming UX | Root-cause confidence |
| Run History/Search | Forensics and audit | Search/filter -> table -> side compare panel | Faceted filters, saved views, compare tray | Open, compare, export | Provider/profile/outcome metadata | Query fallback behavior | Reproducible analysis |
| Provider Health/Ops | Provider reliability control | Provider cards -> trend charts -> incidents | Health badges, latency/error charts | Test connection, disable routing | Queue wait, errors by code | Degraded telemetry warnings | Routing trust and transparency |
| Portability Analytics | Quantify drift and portability | Baseline selector -> delta charts -> tables | Drift trend, delta matrix, comparability status | Set thresholds, export report | Delta metrics and sample quality | Not-comparable explanation UI | Migration confidence |
| Alerts/Anomalies | Incident triage | Alert feed -> details drawer -> linked runs | Rule tags, incident timeline | Acknowledge, mute, escalate | Trigger condition and impact scope | “All clear” calm state | Faster incident handling |
| Livebook Integration | Notebook-platform bridge | Linked books -> launch history -> provenance panel | Notebook cards, run launch log | Link, launch, inspect provenance | Notebook ref, commit hash, parameters | Link/auth diagnostics | Research-to-ops continuity |
| Config/Settings | Governance and defaults | Tabs -> form/editor split | Runtime profile editor, schema validator | Save policy, validate config | Thresholds, default profiles | Pre-save impact validation | Safer change management |
| Team/Admin | Access and compliance | Org/team selector -> role matrix -> audit feed | User table, role matrix, audit timeline | Invite, assign role, revoke | Membership and permission grants | Permission-denied clarity | Governance confidence |

---

## Section 6 — Workflow Builder UX

### 6.1 Builder Layout
- Top bar: workflow identity/version/profile selector and save/run actions.
- Left panel: node catalog and reusable templates.
- Center canvas: DAG/state-machine graph.
- Right inspector: selected node/edge settings.
- Bottom tray: validation, run preview, policy simulation.

### 6.2 Canvas Behavior
- Directed curved edges with state-aware animation.
- Snap-to-grid and auto-layout for readability.
- Minimap for large workflows.
- Grouping of branches and subflows.

### 6.3 Side Panels
- Node configuration.
- Provider strategy and routing.
- Retry/backoff/timeout/cancel/fallback policy.
- Metadata and correlation settings.
- Portability analysis options.
- Explorer data-step configuration.
- Livebook link settings.

### 6.4 Node Model
- Categories: `quantum.execute`, `classical.compute`, `data.explorer`, `control.branch`, `control.wait`, `integration.livebook`, `resiliency.fallback`.
- Contract fields: `id`, `type`, `inputs`, `outputs`, `policy_ref`, `provider_strategy_ref`, `metadata`.

### 6.5 Interaction Design
- Inline edge condition editing.
- Hover state with recent reliability hints.
- One-click “test node” in fixture/simulator lane.
- Run preview shows projected path and applied policies.

### 6.6 YAML Editing and Sync
- Visual and YAML split-view over a single canonical AST.
- Deterministic formatting for stable diffs.
- Bidirectional sync with conflict indicators.

### 6.7 JSON Schema Validation
- Syntax validation.
- Structural schema validation.
- Semantic graph validation.
- Runtime compatibility preflight warnings/errors.

### 6.8 Overload Prevention Strategy
- Progressive disclosure with basic/advanced modes.
- Policy presets: `safe_default`, `fast_feedback`, `forensics`.
- Contextual docs and examples panel.

---

## Section 7 — Observability UX

### 7.1 First-Class UX System
- Run detail is observability-native, not a separate plugin-like page.
- Correlation model links traces, logs, metrics, timeline events, and provider lifecycle artifacts.

### 7.2 Presentation Model
- Traces: lifecycle-oriented span tree with friendly labels.
- Logs: structured event stream grouped by phase.
- Metrics: queue wait, execution duration, request latency, success/failure trends.
- Terminal attribution: explicit human-readable cause classification.

### 7.3 Cross-Linking Patterns
- Timeline event -> trace span and filtered logs.
- Error code -> diagnostics catalog and run impact.
- Provider badge -> provider operations with same time window.
- Run -> troubleshooting bundle export page.

### 7.4 Drill-Down Pattern
- Run summary -> failing step -> lifecycle operation -> raw metadata.

### 7.5 OTel-to-UX Translation
- Span names become readable operation labels.
- Attribute groups shown as workflow/provider/runtime/policy/correlation cards.
- Visibility profile displayed with clear profile intent.

---

## Section 8 — Resiliency UX

### 8.1 Retries and Backoff
- Visual retry timeline with planned vs actual delay.
- Retry cause and attempt count always visible in run detail.

### 8.2 Queueing and Provider Delays
- Queue wait separated from execution duration everywhere.
- Provider delay indicators at run and provider pages.

### 8.3 Circuit-Breakers
- Status chip (`closed`, `open`, `half_open`) with trigger reason.
- Manual reset action with audit event.

### 8.4 Fallbacks
- Graph-level fallback edge rendering.
- Explicit fallback reason and policy source.
- Support for simulator and alternate-provider fallback.

### 8.5 Cancellation and Timeout
- Distinguish user cancel vs policy/system timeout.
- Preserve terminal attribution and provider state mapping.

### 8.6 Degraded States
- Compact high-priority banners with optional detail expansion.
- Keep advanced details contextual to avoid noise.

---

## Section 9 — Data, Analytics, and Explorer UX

### 9.1 Explorer Value Model
- Native tabular inspection for runs and comparative analyses.
- Workflow-level data preparation steps for repeatable analytics.

### 9.2 UX Patterns
- Dataframe preview with schema summary.
- Run comparison tables with aligned columns and deltas.
- Statistical summary cards (mean, p95, variance, outliers).
- Drift trend views by fingerprint/provider pair.

### 9.3 Portability and Drift
- Persist portability deltas by run and fingerprint.
- Surface comparability status before showing deltas.

### 9.4 Exports and Handoff
- CSV/Parquet/JSON exports with metadata manifest.
- Notebook handoff preserving run context.

---

## Section 10 — Livebook UX

### 10.1 Livebook Responsibilities
- Authoring exploratory code and ad hoc analysis.
- Launching FluxQ workflows with run metadata.

### 10.2 FluxQ Responsibilities
- Persisting run context, policies, observability, and governance artifacts.
- Providing operational and forensic views post-launch.

### 10.3 Shared Metadata Contract
- `workflow_id`, `workflow_version`, `runtime_profile`, `provider_strategy`, `seed`, `correlation_id`, notebook reference.

### 10.4 Reproducibility Story
- FluxQ stores immutable launch context from Livebook.
- Re-run uses same context by default with explicit diff review if modified.

---

## Section 11 — Visual Design System

### 11.1 Color Tokens

```css
:root {
  --fxq-bg-deep-space: #0B0F1A;
  --fxq-brand-violet: #7C5CFF;
  --fxq-brand-indigo: #5A3BFF;
  --fxq-brand-glow: #AFA2FF;
  --fxq-info: #3BA7FF;
  --fxq-success: #22C55E;
  --fxq-warning: #F59E0B;
  --fxq-error: #EF4444;
  --fxq-panel: #111827;
  --fxq-card: #1F2937;
  --fxq-border: #374151;
  --fxq-text-secondary: #9CA3AF;
  --fxq-text-primary: #F9FAFB;
  --fxq-gradient-flow: linear-gradient(120deg, #7C5CFF 0%, #3BA7FF 55%, #22C55E 100%);
}
```

### 11.2 Semantic Colors
- Idle: neutral gray.
- Running: violet glow.
- Success: green.
- Failed: red.
- Retrying: amber pulse.
- Cancelled: muted red-gray.
- Queued: subdued blue-violet.

### 11.3 Typography
- Primary: Poppins.
- Utility/data: Inter.
- Scale: H1 28-32, H2 22-24, H3 18, Body 14-16, Caption 12.

### 11.4 Spacing and Shape
- Spacing: 4, 8, 12, 16, 24, 32, 40, 48.
- Radius: 12 default, 16-20 for cards/nodes.

### 11.5 Shadows, Borders, Iconography
- Soft layered shadows with restrained blur.
- Border default 1px neutral, 2px accent for focused/active states.
- Rounded geometric icon set emphasizing status clarity.

### 11.6 Component Style Direction
- Calm dark-first visual language.
- Strong hierarchy and whitespace.
- Signature gradient reserved for high-value active/hero/focus cues.

### 11.7 Graph and Chart Guidelines
- Graph nodes and edges encode lifecycle state.
- Charts always tied to concrete operational questions.
- Status colors remain semantically consistent across all charts.

### 11.8 Motion Guidelines
- Subtle transitions (150-250ms).
- Pulse only for active/retrying states.
- Reduced motion mode supported.

### 11.9 Accessibility
- WCAG AA contrast for text and controls.
- Keyboard-first navigation including builder workflows.
- Color is never sole status channel.

### 11.10 Dark vs Light Strategy
- MVP: dark-first only.
- Later: light theme parity with semantic token mapping.

---

## Section 12 — Design Component Model

| Component | Purpose | LiveView/HEEx Pattern |
|---|---|---|
| Dashboard card | KPI and summary display | Function component with slots |
| Status badge | Unified status language | Typed attr maps to semantic token |
| Step node | Workflow graph node | LiveComponent + JS hook |
| Workflow edge | Directed transition | JS hook with server state payload |
| Timeline item | Lifecycle event display | Streamed list component |
| Provider health panel | Provider reliability snapshot | Composite panel with chart slots |
| Logs panel | Structured log stream | Virtualized viewport hook |
| Trace tree viewer | Span hierarchy navigation | Expand/collapse component |
| Metric tile | Compact metric representation | Typed number + trend component |
| Comparison table | Cross-run/provider analysis | Server-side pagination/filter |
| Filter bar | Unified filtering UX | URL-synced LiveView component |
| Command/search palette | Fast navigation/actions | Keyboard-driven JS+LV integration |
| Onboarding callout | Guided adoption | Dismissible persisted component |
| Empty state | Actionable first-use guidance | Context-aware CTA component |
| Setup wizard | First-run activation flow | Stepper LiveComponent |
| YAML/config editor layout | Visual/text config editing | Code editor hook + AST sync events |

### 12.1 shadcn-Inspired Adaptation for LiveView
- Build composable HEEx primitives (`Card`, `Badge`, `Tabs`, `Dialog`, `Sheet`, `Tooltip`).
- Keep state server-driven by default; use JS hooks for graph/editor virtualization only.
- Expose typed attrs and slot contracts for consistency.

---

## Section 13 — Domain Model and Bounded Contexts

| Context | Purpose | Aggregates/Entities | Value Objects | Domain Services | Events | Invariants | Boundary Rule |
|---|---|---|---|---|---|---|---|
| Identity & Access | Auth and permissioning | User, Session, Token | Email, AuthRef | AccessPolicy | UserAuthenticated | No unauthorized action | No workflow logic |
| Organizations & Teams | Tenancy and membership | Organization, Team, Membership | OrgId, TeamRole | MembershipService | TeamCreated | Org scope enforced | No provider secrets |
| Workflow Catalog | Versioned workflow lifecycle | Workflow, WorkflowVersion, Template | VersionTag | CatalogService | WorkflowPublished | Published versions immutable | No runtime mutation |
| Workflow Authoring | Drafting and validation | DraftWorkflow, Node, Edge | NodeType, EdgeCondition | GraphValidationService | DraftValidated | Valid graph and policy refs | No execution side effects |
| Workflow Runtime | Run/step lifecycle orchestration | Run, RunStep, StepAttempt | RunState, StepState, CorrelationId | RuntimeOrchestrator | RunStarted, RunCompleted | Valid transitions only | No raw provider SDK leaks |
| Scheduling & Queueing | Dispatch and scheduling | Schedule, QueueItem | CronExpr, QueueKey | SchedulerService | RunScheduled | Idempotent dispatch | No UI concerns |
| Provider Operations | Provider readiness and routing | ProviderConnection, HealthSnapshot | ProviderId, TargetRef | ProviderHealthService | ProviderDegraded | Credential scoping | Metadata-only raw payload storage |
| Observability | Correlated telemetry model | TraceLink, LogRecord, MetricSample | VisibilityProfile, Fingerprint | CorrelationService | BundleExported | Correlation required | No policy decisions |
| Portability Analytics | Cross-provider comparison | PortabilityBaseline, DriftRecord | DeltaMetrics, Score | PortabilityService | DriftDetected | Compare only compatible fingerprints | No provider I/O here |
| Configuration & Policy | Declarative config governance | ConfigBundle, PolicySet | SchemaVersion, PolicyRef | ConfigNormalizationService | ConfigApplied | Validate before apply | Secrets unresolved in domain |
| Integrations | External automation/webhooks | IntegrationEndpoint, Subscription | EndpointRef, SigningKeyRef | IntegrationDispatchService | WebhookDelivered | Idempotent delivery | No business rule ownership |
| Livebook Bridge | Notebook-platform linkage | LivebookLink, NotebookContext | NotebookRef | ProvenanceService | NotebookRunLinked | Provenance immutable post-launch | No workflow mutation from adapter |
| Audit & Compliance | Immutable audit history | AuditRecord, ComplianceSnapshot | ActorRef, ChangeSetHash | AuditService | AuditRecorded | Append-only audit log | No orchestration ownership |

### 13.1 Layer Separation
- Domain: entities, value objects, invariants, domain events.
- Application: use-case orchestration and transaction boundaries.
- Adapters: Ecto, Oban, NxQuantum gateway, OTel exporters, web APIs.

### 13.2 NxQuantum Boundary Contract
- FluxQ receives and returns normalized NxQuantum envelopes unchanged.
- FluxQ enrichment happens as sidecar metadata, not envelope schema changes.

---

## Section 14 — System Architecture

### 14.1 High-Level Architecture (Text)

```text
[LiveView UI] ----\
[REST API] --------> [FluxQ Application Services] ---> [Domain Model]
[GraphQL (later)] --/             |                         |
                                   | via Ports               |
                                   v                         v
                        [Adapter: NxQuantum Gateway]    [Policy Engine]
                                   |
                                   v
                             [NxQuantum]
                                   |
                                   v
                         [Providers: IBM/AWS/Azure/Google]

[Oban Scheduler/Workers] <--> [Application Services]
[PubSub] <--> [Live updates]
[Ecto Repo/Postgres] <--> [Run State, Config, Audit, Analytics]
[OTel Exporter] <--> [External Observability Backends]
```

### 14.2 Architecture Recommendation
- **Modular monolith** for deployment simplicity.
- **Monorepo umbrella** for code organization and boundary clarity.

### 14.3 Phoenix Application Structure
- Web layer in `fluxq_web` only.
- Context/application services in `fluxq_core`.
- Adapters and workers in `fluxq_infra`.

### 14.4 LiveView Fit
- Real-time run updates and provider health via PubSub.
- Minimal SPA complexity while preserving responsive operational UX.

### 14.5 Queueing and Execution Orchestration
- Oban for scheduling, dispatch, retry semantics, and dead-letter behavior.
- Runtime worker executes step transitions with policy checks before each transition.

### 14.6 Persistence Model
- PostgreSQL transactional store for runs, steps, policies, configs, audit, portability records.
- Append-only run event log for replay and forensic timelines.

### 14.7 Eventing Model
- Domain events persisted and projected.
- PubSub for in-app real-time UI updates.
- Outbox for external webhooks/event export.

### 14.8 Provider Adapter Interaction
- Application calls `NxQuantumGateway` port.
- Adapter delegates to NxQuantum `ProviderBridge` APIs.
- Envelope parity preserved across runtime profiles.

### 14.9 Telemetry Flow
- FluxQ emits orchestration telemetry.
- NxQuantum emits provider lifecycle telemetry.
- Shared correlation metadata for unified UX linking.

### 14.10 YAML / JSON Schema Config Flow
- YAML import -> JSON Schema validate -> normalize -> domain apply -> persist.
- UI and YAML editor both operate on normalized model.

### 14.11 API Surface
- MVP internal APIs + REST command endpoints.
- GraphQL read APIs later for complex dashboard aggregation.

### 14.12 Background Processing
- Oban queues: scheduler, runtime, analytics, alerts, webhooks, maintenance.

### 14.13 Configuration Boundaries
- Runtime env config for platform wiring.
- Domain config/policies persisted and versioned.

### 14.14 Future Scaling Path
- Split runtime workers and web into separate deployables when throughput demands.
- Keep domain/application stable so service decomposition is low-risk.

---

## Section 15 — Monorepo Structure

```text
fluxq/
  apps/
    fluxq_core/
    fluxq_infra/
    fluxq_web/
    fluxq_cli/
  config/
  docs/
  docs/adr/
  features/
  schemas/
  examples/
  notebooks/
  docker/
  deploy/
  kube/
  scripts/
  priv/
```

### 15.1 What Belongs Where
- `fluxq_core`: domain, application, ports.
- `fluxq_infra`: adapters, repositories, workers, telemetry/export wiring.
- `fluxq_web`: Phoenix UI, LiveView, HTTP/API endpoints.
- `fluxq_cli`: schema validation, config migration, seed/demo utilities.

### 15.2 Dependency Direction
- `fluxq_core` has no internal dependencies.
- `fluxq_infra` depends on `fluxq_core`.
- `fluxq_web` depends on `fluxq_core` and selects app-facing infra APIs.
- `fluxq_cli` depends on core + infra.

### 15.3 Decoupling Rules
- No domain module depends on Ecto/Phoenix/NxQuantum adapter internals.
- No adapter module leaks provider SDK types into domain/application.

---

## Section 16 — Configuration Model

### 16.1 Declarative YAML Scope
- Workflow definitions and versions.
- Retry/backoff/timeout/cancel/fallback policies.
- Provider routing strategies.
- Runtime and observability profiles.
- Alerts and anomaly thresholds.
- Portability thresholds and baseline rules.
- Team-level policy defaults.

### 16.2 Schema Validation
- JSON Schemas per config kind under `schemas/fluxq/v1/`.
- Validation sequence: schema -> semantic -> runtime compatibility checks.

### 16.3 Versioning Strategy
- `apiVersion` and `kind` fields in all config resources.
- Additive updates in v1; breaking changes in v2.

### 16.4 Migration Strategy
- CLI migrator with explicit upgrade reports.
- Keep backward read compatibility during migration windows.

### 16.5 Secrets Handling
- `secretRef` only for sensitive fields in production profiles.
- Adapter-layer resolution from env/secret manager.
- Deterministic redaction for all diagnostics and exports.

### 16.6 Environment Overlays
- Base + overlay model (`local`, `staging`, `prod`) with deterministic merge precedence.

### 16.7 Mapping to Domain Concepts
- Import parser maps YAML resources to domain commands and value objects.
- Store both raw YAML and normalized snapshot for audit and round-trip fidelity.

### 16.8 Visual/Text Editing Model
- Builder UI and YAML editor share normalized AST model.
- Round-trip consistency checks required before publish.

### 16.9 Example Categories

```yaml
apiVersion: fluxq.io/v1
kind: Workflow
metadata:
  name: qml-portability-check
spec:
  runtimeProfile: fixture
  visibilityProfile: high_level
  providerStrategy:
    primary: ibm_runtime
    fallback: aws_braket
  retryPolicy:
    maxAttempts: 3
    backoff: exponential
    baseMs: 1000
  timeoutPolicy:
    runTimeoutMs: 120000
    stepTimeoutMs: 45000
  portabilityPolicy:
    maxLatencyDeltaMs: 1500
    maxExpectationDeltaAbs: 0.03
    maxSampleKl: 0.08
```

---

## Section 17 — API Strategy

### 17.1 Recommendation
- MVP: REST + WebSocket/SSE.
- Later: GraphQL read surface for complex cross-entity queries.

### 17.2 Why This Split
- REST keeps command semantics simple and explicit.
- GraphQL adds value for dashboard/report composition and ad hoc filtering.

### 17.3 API Consumers
- LiveView internal app services.
- External automation and CI scripts.
- Livebook integrations.
- Future plugin ecosystem.

### 17.4 Webhooks and Event Streams
- MVP: signed webhooks for terminal run states and incidents.
- Later: event stream support for large external integrations.

### 17.5 Export Endpoints
- Troubleshooting bundle export.
- Portability report export.
- Config snapshot export.

---

## Section 18 — Identity, Access, and Multi-Tenancy

### 18.1 MVP Auth/RBAC
- Phoenix native auth and session/token model.
- Core roles: Owner, Admin, Operator, Researcher, Viewer.

### 18.2 Self-Hosted Strategy
- Add OIDC/SAML support in v0.3+.
- Keycloak support is **later**, not MVP, to avoid premature complexity.

### 18.3 Tenancy Model
- Org-scoped data model from day one.
- Team scoping and role assignment within org.
- Single-org default mode for local deployments.

### 18.4 Provider Credential Isolation
- Credentials encrypted and org-scoped.
- Optional team-scoped credentials for delegated operations.
- Access and usage audit logging required.

### 18.5 Auditability
- Immutable audit records for auth, role change, config change, run control actions.

---

## Section 19 — Infrastructure and Deployment

### 19.1 Docker-First DX
- `docker compose up` boots core dependencies and app.
- Seed command loads demo org/workflows/runs.

### 19.2 Local Demo Mode
- Fixture/simulator-first deterministic demo flows.
- Includes success, retry, failure+fallback examples.

### 19.3 Mise Setup
- Toolchain pinned in `mise.toml`.
- Standard setup command path documented and enforced in CI.

### 19.4 Service Dependencies
- MVP required: app + PostgreSQL.
- Optional local profile: OTel collector + Grafana stack.

### 19.5 Secrets and Config
- Env vars for platform secrets.
- Secret refs for provider credentials.

### 19.6 Production Deployment Pattern
- Single OTP release container initially.
- Horizontal scale for web/runtime workers as needed.

### 19.7 Kubernetes Future Shape
- Introduce k8s manifests later.
- Add Helm when deployment matrix stabilizes.

### 19.8 Golden Demo Experience
- Clone -> up -> onboarding -> first run detail investigation in under 10 minutes.

---

## Section 20 — Observability Architecture

### 20.1 OTel Integration
- FluxQ spans for orchestration and control-plane actions.
- NxQuantum spans for provider lifecycle.
- Context propagation with correlation metadata.

### 20.2 Logs, Metrics, Traces
- Structured logs with deterministic redaction.
- Core metrics include lifecycle latency and error rates.
- Traces cover workflow and provider operation boundaries.

### 20.3 Storage and Query
- MVP: run-centric observability projections in Postgres for product UX.
- External export via OTLP for deep ops integrations.

### 20.4 Dashboards and Alerts
- Provider lifecycle health.
- Queue vs execution behavior.
- Portability and drift trends.

### 20.5 Exports and Retention
- Troubleshooting bundle with schema and policy versions.
- Configurable retention tiers by environment.

### 20.6 MVP vs Later
- MVP: strong correlated run detail and bundle export.
- Later: advanced custom attribute governance and long-term analytics pipelines.

---

## Section 21 — Resiliency and Runtime Control Model

### 21.1 Workflow State Machine
- `draft -> validated -> queued -> dispatching -> running -> completed | failed | cancelled | timed_out | degraded`.

### 21.2 Step Lifecycle
- `pending -> queued -> running -> retrying -> succeeded | failed | cancelled | skipped | fallback_running -> fallback_succeeded | fallback_failed`.

### 21.3 Provider Job Mapping
- Use NxQuantum normalized states directly: `submitted`, `queued`, `running`, `completed`, `cancelled`, `failed`.

### 21.4 Retry/Timeout/Cancellation
- Per-step and per-run policies.
- Deterministic retry budget accounting.
- Typed terminal attribution for timeout and cancellation outcomes.

### 21.5 Circuit-Breakers and Dead Letter
- Circuit policy on provider route/workflow route.
- Dead-letter persistence and replay controls with audit tracking.

### 21.6 Fallback Model
- Fallback to simulator or alternate provider based on policy and capability.
- Explicit fallback event stream for observability.

### 21.7 Deterministic Mode Handling
- Fixture/simulator are deterministic reference lanes.
- Live lanes remain probabilistic with contract-stable envelopes.

### 21.8 Text State Model

```text
RUN_QUEUED
 -> RUN_DISPATCHING
 -> RUN_RUNNING
 -> (STEP_RUNNING -> STEP_SUCCEEDED)* -> RUN_COMPLETED

RUN_RUNNING
 -> STEP_FAILED
 -> RETRY_ELIGIBLE ? STEP_RETRYING -> STEP_RUNNING
 -> FALLBACK_ELIGIBLE ? STEP_FALLBACK_RUNNING -> STEP_FALLBACK_SUCCEEDED
 -> else RUN_FAILED

Any RUN_* state
 -> CANCEL_REQUESTED -> RUN_CANCELLED
 -> TIMEOUT_REACHED -> RUN_TIMED_OUT
 -> CIRCUIT_OPEN + POLICY_DEGRADE -> RUN_DEGRADED
```

---

## Section 22 — MVP Definition

### 22.1 In MVP
- Workflow catalog + visual builder (core subset).
- YAML import/export + JSON Schema validation.
- Strong run detail view with correlated observability.
- Queueing, retries, timeout, cancellation, fallback.
- Provider support focus: IBM Runtime + AWS Braket.
- Portability comparison for comparable fingerprint runs.
- Local Docker-first onboarding with seeded guided demos.
- Minimal Livebook link + launch metadata support.

### 22.2 Out of MVP
- Enterprise SSO/Keycloak depth.
- Full GraphQL surface.
- Kubernetes Helm production templates.
- Rich plugin marketplace.
- Full dynamic circuit authoring for unsupported provider capabilities.

### 22.3 Explicitly Deferred
- Fine-grained enterprise RBAC matrix expansion.
- Data warehouse connectors and long-horizon analytics pipelines.
- Multi-region production deployment strategy.

---

## Section 23 — Phased Roadmap

| Phase | Product Capabilities | Technical Priorities | UX Priorities | OSS Adoption Goals |
|---|---|---|---|---|
| MVP | Orchestration + observability core + demo + 2 providers | Core contexts, Oban runtime, config schemas, run detail | Polished onboarding, run detail, builder basics | Fast local start, high-quality docs/examples |
| v0.2 | Policy and analytics expansion | Drift engine, alert rules, webhook outbox, API hardening | Better compare UX, policy simulator, provider ops depth | Community templates and reproducible demos |
| v0.3 | Team/self-host maturity | OIDC support, RBAC expansion, scaling refinements | Admin UX maturity, multi-team ergonomics | Early production pilots and integration guides |
| v1.0 | Stable production control plane | Upgrade tooling, extension APIs, release hardening | Full workflow authoring/debugging polish | Durable contributor ecosystem and plugin growth |

---

## Section 24 — Stitch Design Deliverables

| Artifact | Purpose | Must Show | Fidelity | Dependencies |
|---|---|---|---|---|
| Sitemap | IA alignment | Primary + secondary nav and transitions | Low | IA model |
| Brand moodboard | Visual direction | Flow, trust, technical depth, friendliness | Low-Mid | Brand brief |
| Color token sheet | Visual consistency | Base + semantic + status tokens | Mid | Brand colors |
| Typography sheet | Typographic hierarchy | Poppins/Inter usage and scale | Mid | Design system |
| Dashboard wireframes | Operational overview | KPIs, active runs, alerts, provider status | Mid | Metrics model |
| Builder wireframes | Authoring flow | Palette, canvas, inspector, validation tray | Mid-High | Node model and schema rules |
| Run detail wireframes | Debugging core | Graph + timeline + logs/traces/metrics | High | Observability model |
| Provider health wireframes | Provider operations | Health cards, latency/error trends | Mid | Provider context |
| Onboarding wizard wireframes | Activation flow | Setup checks, demo path, provider connect | Mid | Docker demo flow |
| Portability analytics wireframes | Drift analysis | Delta tables, trend charts, comparability status | Mid-High | Portability model |
| Livebook-linked concepts | Research bridge UX | Launch, provenance, deep links | Mid | Integration contract |
| Component library sheet | Reusable UI system | Core components and variants | High | Tokens and UX patterns |
| Motion/state annotation sheet | Behavior clarity | Node/edge transitions and state animations | Mid | Graph state model |

---

## Section 25 — Codebase Bootstrap Recommendation

### 25.1 Bootstrap Sequence
1. Initialize umbrella apps (`core`, `infra`, `web`, `cli`).
2. Add architecture docs and dependency-direction guard tests.
3. Add AGENTS/SKILLS/development-flow files mirroring NxQuantum discipline.
4. Implement core domain entities and run state machine.
5. Wire Ecto repositories and Oban queues.
6. Add NxQuantum gateway adapter with envelope passthrough tests.
7. Build first LiveView surfaces (Welcome, Overview, Workflow Catalog, Run Detail).
8. Add YAML import + JSON schema validation.
9. Seed demo workflows and sample run events.
10. Add docker-compose golden demo path and CI quality gates.

### 25.2 First Directories and Files
- `apps/fluxq_core/lib/fluxq/domain/*`
- `apps/fluxq_core/lib/fluxq/application/*`
- `apps/fluxq_core/lib/fluxq/ports/*`
- `apps/fluxq_infra/lib/fluxq/adapters/*`
- `apps/fluxq_web/lib/fluxq_web/live/*`
- `schemas/fluxq/v1/workflow.schema.json`
- `schemas/fluxq/v1/policy.schema.json`
- `features/workflow_lifecycle.feature`
- `docs/architecture.md`
- `docs/bounded-context-map.md`
- `docs/development-flow.md`

### 25.3 First Domain Modules
- `FluxQ.Domain.Workflow`
- `FluxQ.Domain.WorkflowVersion`
- `FluxQ.Domain.Run`
- `FluxQ.Domain.RunStep`
- `FluxQ.Domain.Policy.Retry`
- `FluxQ.Domain.Policy.Timeout`
- `FluxQ.Domain.Policy.Fallback`

### 25.4 First LiveView Surfaces
- Welcome/Setup
- Overview
- Workflow Catalog
- Run Detail

### 25.5 First Configs and Schemas
- Workflow schema
- Policy schema
- Provider strategy schema
- Runtime profile schema
- Alert rule schema

### 25.6 First Seeded Demo Flows
- Simulator success path.
- Provider retry then success path.
- Provider failure + fallback-to-simulator path.
- Portability compare path.

### 25.7 First Tests
- Domain invariant unit tests.
- State machine transition tests.
- Architecture boundary tests.
- NxQuantum envelope passthrough contract tests.
- LiveView smoke and interaction tests.

### 25.8 First Telemetry Plumbing
- Run-level orchestration spans and lifecycle logs.
- Correlation propagation from workflow to provider operations.
- Troubleshooting bundle export for single run.

### 25.9 First Docker Experience
- Compose stack with app + Postgres.
- Seeded data and guided onboarding defaults.
- Optional observability profile for local advanced demo.

---

## Section 26 — Final Recommendation

### 26.1 Strongest Architecture Direction
Adopt a modular monolith in an umbrella monorepo with strict DDD + Hexagonal boundaries and contract-preserving NxQuantum integration.

### 26.2 Strongest UX Direction
Make flow and debugging first-class: a powerful workflow builder plus an exceptional run detail experience with built-in correlation and resiliency transparency.

### 26.3 MVP with Clearest User Value
Deliver one polished end-to-end path: author/import workflow -> run with policy -> observe live -> diagnose failure -> compare portability, all with local Docker-first onboarding.

### 26.4 Best OSS Adoption Strategy
Reuse NxQuantum’s proven quality discipline: behavior-first specs, deterministic verification gates, architecture guardrails, clear ADRs, reproducible examples, and contributor-oriented docs from day one.
