# FluxQ Platform: Config, APIs, Identity, Infra, Observability, Runtime Control

Source of truth: [Master Plan](../plan/master-plan.md)

## Configuration Model

### Declarative Scope
- Workflows and workflow versions.
- Runtime profile and observability profile defaults.
- Retry/backoff/timeout/cancellation/fallback policies.
- Provider routing strategies.
- Alerting thresholds and portability thresholds.

### Validation and Versioning
- YAML as authoring format.
- JSON Schema as validation contract.
- Version fields required in each resource (`apiVersion`, `kind`).
- Migration tooling required for cross-version upgrades.

### Secrets and Environments
- Production secrets referenced via secret refs, not inline plaintext.
- Base plus environment overlays with deterministic merge order.

## API Strategy

### MVP
- REST command endpoints.
- WebSocket/SSE for live updates.

### Later
- GraphQL read APIs for complex dashboard and analytics retrieval.

### Integrations
- Signed webhooks for terminal events.
- Export endpoints for troubleshooting bundles, reports, and config snapshots.

## Identity and Multi-Tenancy

### MVP
- Native auth plus session/token model.
- Core RBAC roles for owner/admin/operator/researcher/viewer.

### Later
- OIDC/SAML and optional Keycloak integration.

### Isolation and Audit
- Org-scoped credential isolation.
- Immutable audit events for role and runtime control changes.

## Infrastructure and Deployment

### Local
- Docker-first stack with seeded demo workflows.
- Fixture/simulator-first default lane for reliability and onboarding.

### Production
- Single OTP release first.
- Horizontal scaling for web/runtime workers as demand grows.

### Kubernetes
- Introduced after MVP maturity.
- Helm packaging deferred until deployment matrix stabilizes.

## Observability Architecture

### Core
- OpenTelemetry spans/metrics/logs in FluxQ and NxQuantum.
- Correlation metadata propagated end-to-end.

### Product UX Expectations
- Run-detail level correlation across traces, logs, metrics.
- Troubleshooting bundles with schema and policy versions.

### Storage and Retention
- MVP run-centric observability projections in Postgres.
- Optional OTLP export to external observability backends.

## Resiliency and Runtime Control

### State and Policy
- Run and step lifecycle state machines.
- Explicit policy handling for retries, backoff, timeout, cancellation, circuit-breakers, fallback.

### Runtime Profile Handling
- Deterministic fixture/simulator lanes remain first-class.
- Live lanes preserve typed contract guarantees, not deterministic outcomes.

### Dead-Letter and Recovery
- Dead-letter tracking and controlled replay operations with audit trails.

