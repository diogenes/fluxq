#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
METADATA_PATH="${STITCH_METADATA_PATH:-$ROOT_DIR/.stitch/metadata.json}"
SYNC_STATUSES="${STITCH_SYNC_STATUSES:-approved,ready_for_review}"

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "error: missing required command: $1" >&2
    exit 1
  fi
}

decode_base64_to_file() {
  local outfile="$1"
  if base64 --help >/dev/null 2>&1; then
    base64 --decode >"$outfile"
  else
    base64 -D >"$outfile"
  fi
}

require_cmd jq
require_cmd mise
require_cmd gcloud

if [[ ! -f "$METADATA_PATH" ]]; then
  echo "error: metadata file not found at $METADATA_PATH" >&2
  exit 1
fi

# Ensure node/npm/npx are available via mise-managed toolchain.
eval "$(mise activate bash)"
require_cmd npx

PROJECT_ID="${STITCH_PROJECT_ID:-$(jq -r '.projectId // empty' "$METADATA_PATH")}"
if [[ -z "$PROJECT_ID" ]]; then
  echo "error: project id missing. Set STITCH_PROJECT_ID or .stitch/metadata.json.projectId" >&2
  exit 1
fi

# stitch-mcp expects GOOGLE_CLOUD_PROJECT for OAuth billing context.
if [[ -z "${GOOGLE_CLOUD_PROJECT:-}" ]]; then
  GCLOUD_PROJECT="$(gcloud config get-value project 2>/dev/null || true)"
  if [[ "$GCLOUD_PROJECT" != "(unset)" && -n "$GCLOUD_PROJECT" ]]; then
    export GOOGLE_CLOUD_PROJECT="$GCLOUD_PROJECT"
  fi
fi

if [[ -z "${STITCH_API_KEY:-}" ]]; then
  if [[ -z "${GOOGLE_CLOUD_PROJECT:-}" ]]; then
    cat >&2 <<'EOF'
error: GOOGLE_CLOUD_PROJECT is not set.
Set it or run:
  gcloud config set project <YOUR_GCP_PROJECT_ID>
Then retry.
EOF
    exit 1
  fi
  if [[ -z "${STITCH_ACCESS_TOKEN:-}" ]]; then
    export STITCH_ACCESS_TOKEN="$(gcloud auth print-access-token)"
  fi
fi

STATUS_REGEX="^($(echo "$SYNC_STATUSES" | tr ',' '|'))$"
mapfile -t SCREENS < <(
  jq -r --arg status_re "$STATUS_REGEX" '
    .screens
    | to_entries[]
    | select(
        .value.id
        and .value.localHtml
        and .value.localPng
        and ((.value.status // "") | test($status_re))
      )
    | [.key, .value.id, .value.localHtml, .value.localPng, (.value.status // "")]
    | @tsv
  ' "$METADATA_PATH"
)

if [[ "${#SCREENS[@]}" -eq 0 ]]; then
  echo "No screens found to sync for statuses: $SYNC_STATUSES"
  exit 0
fi

echo "Syncing ${#SCREENS[@]} screen(s) from Stitch project: $PROJECT_ID"
echo "Using GOOGLE_CLOUD_PROJECT=${GOOGLE_CLOUD_PROJECT:-<api-key-mode>}"

for row in "${SCREENS[@]}"; do
  IFS=$'\t' read -r key screen_id local_html local_png status <<<"$row"
  html_path="$ROOT_DIR/$local_html"
  png_path="$ROOT_DIR/$local_png"
  mkdir -p "$(dirname "$html_path")" "$(dirname "$png_path")"

  echo "-> [$status] $key ($screen_id)"

  code_raw="$(npx -y @_davideast/stitch-mcp tool get_screen_code -o json -d "{\"projectId\":\"$PROJECT_ID\",\"screenId\":\"$screen_id\"}" 2>&1 || true)"
  code_json="$(printf '%s\n' "$code_raw" | sed -n '/^{/,$p')"
  code_ok="$(printf '%s' "$code_json" | jq -r '.success // false' 2>/dev/null || echo false)"
  if [[ "$code_ok" != "true" ]]; then
    echo "   ! failed to fetch HTML for $screen_id"
    printf '%s\n' "$code_raw" | sed -n '1,2p'
    continue
  fi
  html_content="$(printf '%s' "$code_json" | jq -r '.data.htmlContent // .htmlContent // empty')"
  if [[ -z "$html_content" || "$html_content" == "null" ]]; then
    echo "   ! empty HTML for $screen_id"
    continue
  fi
  printf '%s' "$html_content" >"$html_path"

  image_raw="$(npx -y @_davideast/stitch-mcp tool get_screen_image -o json -d "{\"projectId\":\"$PROJECT_ID\",\"screenId\":\"$screen_id\"}" 2>&1 || true)"
  image_json="$(printf '%s\n' "$image_raw" | sed -n '/^{/,$p')"
  image_ok="$(printf '%s' "$image_json" | jq -r '.success // false' 2>/dev/null || echo false)"
  if [[ "$image_ok" != "true" ]]; then
    echo "   ! failed to fetch image for $screen_id"
    printf '%s\n' "$image_raw" | sed -n '1,2p'
    continue
  fi
  image_b64="$(printf '%s' "$image_json" | jq -r '.data.imageContent // .imageContent // empty')"
  if [[ -z "$image_b64" || "$image_b64" == "null" ]]; then
    echo "   ! empty image payload for $screen_id"
    continue
  fi
  printf '%s' "$image_b64" | decode_base64_to_file "$png_path"
done

echo "Stitch sync completed."
