/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE NAME IS A PLACEHOLDER.
 *
 *  Everything user-visible derives from the four constants below. To rename the
 *  site, change them here and nothing else — no component hardcodes the name.
 *  `SITE_URL` also needs updating once a domain is bought (it feeds RSS,
 *  the sitemap, and canonical/OG tags).
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Shortlist (both `.com` open as of 2026-07-31, unconfirmed at a registrar):
 *   · Roughly Precise      ← currently set
 *   · Directionally True
 * Nothing is decided. Swap the string and the whole site follows.
 */
export const SITE_NAME = 'Roughly Precise';

/** Shown under the wordmark on the home page. */
export const SITE_TAGLINE = 'Games and maps built out of real numbers.';

/** Meta description + RSS channel description. */
export const SITE_DESCRIPTION =
  'Interactive games and data tools about sports, money, film, and politics — ' +
  'plus notes on how they were built and what turned up along the way.';

/** PLACEHOLDER. Must be the real domain before deploy: RSS/sitemap/OG depend on it. */
export const SITE_URL = 'https://example.com';

/** Contact alias — never the personal gmail (see NOTES.md §3). */
export const CONTACT_EMAIL = 'hello@example.com';

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
