# Stitch MCP Setup and Verification Guide

Date: `2026-03-31`
Owner: `design-system-ops`

## Goal
Provide a repeatable setup so Stitch MCP works reliably in Codex sessions for FluxQ design iterations.

## Why this setup works
Codex MCP processes may not inherit your interactive shell PATH. Running Stitch through an absolute `mise` executable guarantees `node`, `npm`, and `npx` are available with the repo-pinned version.

## 1) Toolchain Baseline (via `mise`)
This repo uses local runtime management to ensure `node`, `npm`, and `npx` are available.

Project file:
- `.mise.toml`

Contents:
```toml
[tools]
node = "22"
```

Install and verify:
```bash
cd /Users/diogenes/Projects/diogenes/fluxq
mise trust .mise.toml
mise install
mise exec -- node --version
mise exec -- npm --version
mise exec -- npx --version
```

## 2) Codex MCP Server Configuration
Use the Stitch MCP server package that is currently available on npm and run it through `mise` so PATH issues do not break startup.

File:
- `~/.codex/config.toml`

Recommended server block:
```toml
[mcp_servers.stitch]
command = "/opt/homebrew/bin/mise"
args = [ "x", "node@22", "--", "npx", "-y", "@_davideast/stitch-mcp", "proxy", "--transport", "stdio" ]
enabled = true

[mcp_servers.stitch.env]
STITCH_API_KEY = "<YOUR_STITCH_API_KEY>"
```

Notes:
- Server name in Codex calls is `stitch` (not `StitchMCP`).
- Use `@_davideast/stitch-mcp` (the unscoped `@davideast/...` package name fails).
- If you rotate keys, restart Codex or open a new thread so MCP env is reloaded.

## 3) Authentication Options
Choose one:

1. API key (recommended for CI-like flows)
```bash
export STITCH_API_KEY="<YOUR_STITCH_API_KEY>"
```

2. OAuth / gcloud flow
```bash
npx @_davideast/stitch-mcp init
npx @_davideast/stitch-mcp doctor
```

3. System gcloud reuse
- Configure gcloud externally, then set `STITCH_USE_SYSTEM_GCLOUD=1` in server env.

## 4) Connection Verification
CLI-level verification:
```bash
STITCH_API_KEY="<YOUR_STITCH_API_KEY>" \
/opt/homebrew/bin/mise x node@22 -- npx -y @_davideast/stitch-mcp proxy --transport stdio
```

Expected logs:
- `Connecting to https://stitch.googleapis.com/mcp...`
- `Connected to Stitch, discovered ... tools`
- `Proxy server running`

Codex-level verification (inside thread):
- run Stitch tools such as `list_projects` / `get_project`.
- if unavailable, restart Codex or open a fresh thread so MCP server registry reloads.

## 5) Smoke Test (Copy/Paste)
```bash
cd /Users/diogenes/Projects/diogenes/fluxq
mise exec -- node --version
mise exec -- npx --version

# Should list available tools:
/opt/homebrew/bin/mise x node@22 -- npx -y @_davideast/stitch-mcp tool

# Optional: verify auth health
/opt/homebrew/bin/mise x node@22 -- npx -y @_davideast/stitch-mcp doctor --verbose
```

## 6) Known Errors and Fixes
1. `unknown MCP server 'StitchMCP'`
- Cause: wrong server key.
- Fix: use server id `stitch`.

2. `MCP startup failed: No such file or directory (os error 2)`
- Cause: `npx`/Node not resolvable by MCP runtime.
- Fix: run server through absolute `mise` command as shown above.

3. `npm 404 ... @davideast/stitch-mcp`
- Cause: package name is wrong/outdated.
- Fix: use `@_davideast/stitch-mcp`.

4. `Proxy server error: StitchProxy requires an API key`
- Cause: `STITCH_API_KEY` missing from MCP env.
- Fix: set `mcp_servers.stitch.env.STITCH_API_KEY` or run auth flow.

5. `resources/list ... Method not found`
- Cause: this Stitch proxy does not implement resource listing endpoints.
- Fix: use Stitch tool APIs (`list_projects`, `list_screens`, `edit_screens`, etc.) instead of MCP resource listing.

## 7) Iteration Checklist (Before Design Work)
1. `mise exec -- node --version` succeeds.
2. Stitch MCP server block in `~/.codex/config.toml` matches this guide.
3. Auth mode is valid (API key or gcloud login).
4. New Codex thread/session started after config changes.
5. `list_projects` returns FluxQ project.

## 8) FluxQ Usage Pattern
For FluxQ design iterations:
1. Use triad gate inputs (`domain-input-packet`, `ux-architecture-brief`, `design-delivery-packet`).
2. Refine screens via Stitch tools (`edit_screens` / `generate_screen_from_text`).
3. Keep design decisions aligned with lane semantics, observability clarity, and actionability.
4. Preserve shadcn-ready structure for future React integration with Phoenix backend events.

## 9) Minimum Operating Procedure (Every New Iteration)
1. Validate runtime: `mise exec -- node --version`.
2. Validate Stitch auth: `npx @_davideast/stitch-mcp doctor`.
3. In Codex, run `list_projects` first; stop if it fails.
4. Only then run generation/refinement tools (`edit_screens`, `generate_screen_from_text`, `generate_variants`).
5. Record screen IDs and asset IDs in iteration notes for traceability.
