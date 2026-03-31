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
