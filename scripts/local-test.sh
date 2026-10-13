#!/usr/bin/env bash
# Build everything as it would ship, into /tmp/dm_test, to click through before a deploy.
#
#   hub    http://localhost:4400   production build, but tool frames/embeds point at
#                                  the local copies below and draft posts are shown
#   nil    :4401   heat :4402   donor :4403   blind :4404
#
# Then serve with the "site-test" preview config (or: python3 /tmp/dm_test/serve.py).
# macOS clears old files from /tmp every few days; just re-run this.
set -euo pipefail
export PATH="$HOME/.local/node-v24.16.0-darwin-arm64/bin:$PATH"
HUB="$(cd "$(dirname "$0")/.." && pwd)"
PROJECTS="$(dirname "$HUB")"
OUT=/tmp/dm_test

rm -rf "$OUT" && mkdir -p "$OUT"/{nil,heat,donor}

echo "==> Tools"
cp "$PROJECTS/NIL money/prototype/index.html" "$PROJECTS/NIL money/prototype/counties.geojson" "$OUT/nil/"
cp -R "$PROJECTS/nba_viz/design/site/." "$OUT/heat/"
cp "$PROJECTS/political_donation_map/prototype/flows.html" \
   "$PROJECTS/political_donation_map/prototype/us_land.geojson" "$OUT/donor/"
( cd "$PROJECTS/nba_draft/app" && npm run build --silent )
cp -R "$PROJECTS/nba_draft/app/dist" "$OUT/blind"

echo "==> Hub"
( cd "$HUB" && PUBLIC_LOCAL_TEST=1 npx astro build --outDir "$OUT/hub" --silent )

cp "$HUB/scripts/local_test_serve.py" "$OUT/serve.py"
echo "✓ built $OUT — serve it, then open http://localhost:4400"
