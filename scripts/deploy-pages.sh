#!/usr/bin/env bash
# Production deploy to Cloudflare Pages: https://event-planner-bwo.pages.dev
# (the demo left Vercel on 2026-11-15; the Vercel project `event-planner` now
# redirects here). Builds from a clean install of the committed tree with
# pnpm 9 (the version Vercel used for this lockfile), uploads the static
# output (Pages serves index.html for every unknown path, so client routes
# like /events work), then checks the live URL.
#   bash scripts/deploy-pages.sh
# Needs a wrangler login on the Cloudflare account that owns the project
# (`npx wrangler@4.156.0 whoami`).
set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT="event-planner"
OUT_DIR="dist"
URL="https://event-planner-bwo.pages.dev"
PNPM=(npx --yes pnpm@9.15.9)
WRANGLER=(npx --yes wrangler@4.156.0)

if [ -n "$(git status --porcelain)" ]; then
  echo "deploy: working tree is dirty; commit or stash first" >&2
  exit 1
fi

"${PNPM[@]}" install --frozen-lockfile
"${PNPM[@]}" run build

"${WRANGLER[@]}" pages deploy "$OUT_DIR" --project-name "$PROJECT" --branch main \
  --commit-hash "$(git rev-parse HEAD)" --commit-message "$(git log -1 --format=%s)"

code="$(curl -s -o /dev/null -m 20 -w '%{http_code}' "$URL/" || true)"
echo "deploy: $URL/ -> $code"
[ "$code" = 200 ]
