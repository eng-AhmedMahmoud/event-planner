#!/usr/bin/env bash
# The merge gate (this repo is not on Jenkins): clean install with pnpm 9 (the
# version Vercel used for this lockfile; pnpm 11 refuses the install because
# of esbuild's ignored build script), lint, the Vitest suite once, then the
# production build that scripts/deploy-pages.sh ships.
#   bash scripts/ci-local.sh
set -euo pipefail
cd "$(dirname "$0")/.."

PNPM=(npx --yes pnpm@9.15.9)

"${PNPM[@]}" install --frozen-lockfile
"${PNPM[@]}" run lint
"${PNPM[@]}" exec vitest run
"${PNPM[@]}" run build
echo "ci-local: all steps passed"
