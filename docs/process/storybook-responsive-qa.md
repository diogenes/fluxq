# Storybook Responsive QA (Option 1)

Date: `2026-03-31`
Owner: `ux-architect` + `react-components`
Surface scope: App shell + runtime + workflow + chart modules

## Viewports checked
- mobile: `mobile1` (320x568)
- tablet: `768x1024`
- desktop: `1440x900`

## Components reviewed
- `Shell/AppShell` (`DesktopExpanded`, `DesktopCollapsed`, `MobileStacked`)
- `Runtime/Surface Blocks` (`Overview`, `MobileOverview`)
- `Runtime/Timeline Trace Correlation`
- `Runtime/Portability Decision Framing`
- `Workflow/Builder Scaffold`
- `Workflow/Builder Advanced`
- `Telemetry/Operational Chart Suite`

## Fixes applied from QA
- Removed fixed-width overflow pressure in mobile stacked shell rails.
- Added `min-w-0`/wrap behavior on workflow and runtime panels with long copy.
- Made timeline detail panel contain long span/log content with break rules.
- Added responsive chart and advanced workflow builder surfaces for deeper M2/M3 fidelity.

## Residual notes
- Dense data table remains intentionally horizontally scrollable on very small screens.
- Storybook chunk size warnings are present but non-blocking for local QA.

---

Date: `2026-04-01`
Owner: `frontend-quality-specialist` + `ux-architect`
Surface scope: UI-CY families + global responsive/a11y smoke (Option 1)

## Viewports checked
- mobile: `mobile1` (320x568)
- tablet: `768x1024`
- desktop: `1440x900`

## Components reviewed
- `Composition/FormSystem` (`Default`, `Mobile`)
- `Composition/ActionGuard` (`Default`, `Mobile`)
- `Telemetry/TelemetryPro` (`Default`, `Mobile`)
- `Composition/TablePro` (`Default`, `Mobile`, `PolicyBlocked`)
- `Composition/LogViewer` (`Default`, `Mobile`, `ReadOnly`)
- `Workflow/Builder Pro` (`Fixture`, `Mobile`)
- `Shell/AppShell` (`DesktopExpanded`, `MobileStacked`)

## Fixes applied from QA
- Added query-state normalization and shared boundary-state mapping to avoid inconsistent UI state labeling.
- Added dedicated mobile stories for CY05/CY06 component families.
- Confirmed long strings in guarded action/forms/telemetry summaries stay wrapped (`break-words`) inside bounded containers.

## Accessibility checks
- Verified form controls provide labels or `aria-label` in CY05/CY06 components.
- Confirmed dialog confirmation flow is keyboard-safe (`Cancel`/`Confirm` button order and focusable controls).
- Confirmed query/filter controls remain accessible on mobile layouts.

## Visual baseline lock
- Snapshot manifest hash: `6ada54e92c255898b483578ae9b821e1ff6578e78d5207c16291cb49f20865c2`
- File: `apps/fluxq_web/assets/visual-baseline/baseline-manifest.json`

## Residual notes
- Storybook bundle-size warnings remain non-blocking but should be revisited when backend-driven code splitting is introduced.
