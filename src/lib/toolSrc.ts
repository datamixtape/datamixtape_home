/**
 * Which address a tool frame or embed loads.
 *
 *   astro dev                     -> devSrc (each tool's own local server), when given
 *   PUBLIC_LOCAL_TEST=1 build     -> the local test copy of the tool (scripts/local-test.sh)
 *   production build              -> the tool's live deployment
 *
 * The local test build swaps only the origin, so paths and ?view=post presets carry over.
 */
const LOCAL_TEST_ORIGINS: Record<string, string> = {
  'https://nilredistribution.vercel.app': 'http://localhost:4401',
  'https://heat-check-nba.vercel.app': 'http://localhost:4402',
  'https://political-donor-map.vercel.app': 'http://localhost:4403',
  'https://the-blind-board.vercel.app': 'http://localhost:4404',
};

export const LOCAL_TEST = !!import.meta.env.PUBLIC_LOCAL_TEST;

export function toolSrc(src: string, devSrc?: string): string {
  if (import.meta.env.DEV && devSrc) return devSrc;
  if (LOCAL_TEST) {
    const url = new URL(src);
    const local = LOCAL_TEST_ORIGINS[url.origin];
    if (local) return local + url.pathname + url.search;
  }
  return src;
}
