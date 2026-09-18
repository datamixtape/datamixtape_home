/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything user-visible derives from the constants below. No component
 *  hardcodes the name — renaming the site is this file and nothing else.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Displayed with a space; the domain has none (see AGENTS.md on the hyphen
 * question). Decided 2026-08-06; `datamixtape.com` registered the same day.
 */
export const SITE_NAME = 'Data Mixtape';

/** Shown under the wordmark on the home page. */
export const SITE_TAGLINE = 'Games and maps built out of real numbers.';

/** Meta description + RSS channel description. */
export const SITE_DESCRIPTION =
  'Interactive games and data tools about sports, money, film, and politics — ' +
  'plus notes on how they were built and what turned up along the way.';

/**
 * Feeds RSS, the sitemap, and canonical/OG tags. No trailing slash.
 * Registered 2026-08-06. This is the canonical host — any other domain pointed
 * at the site must 301 here rather than serve a copy.
 */
export const SITE_URL = 'https://datamixtape.com';

/**
 * Contact alias — never the personal gmail (see NOTES.md §3).
 * ⚠️ Doesn't route yet; needs forwarding set up on the domain.
 */
export const CONTACT_EMAIL = 'hello@datamixtape.com';

/**
 * Nav labels are free text — renaming one changes it everywhere (header, footer,
 * section page heading). `href` must match a section key in data/projects.ts.
 *
 * `children` is supported by the Header but unused today. When the nav flips to
 * topic-first (Sports / Politics / …) with Games / Data inside each dropdown,
 * that's a change to this array plus one route — every project is already
 * tagged with a `topic`. See AGENTS.md.
 */
export const NAV: NavItem[] = [
  { label: 'Games', href: '/games' },
  { label: 'Data Exploration', href: '/data' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}
