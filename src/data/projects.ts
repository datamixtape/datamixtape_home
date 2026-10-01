/**
 * The five projects. Single source of truth for the home feed and the
 * section pages.
 *
 * Per NOTES.md §5: each project keeps its OWN palette, derived from its subject.
 * These accents are deliberately not harmonized to a site color — the mosaic
 * effect is the point.
 */

export type ProjectStatus = 'live' | 'built' | 'in-progress' | 'idea';

/** What kind of thing it is. Drives today's nav. */
export type ProjectSection = 'games' | 'data';

/**
 * What it's about. Not used by the nav yet — it exists so that switching to a
 * topic-first nav later is a routing change, not a re-classification of every
 * project. Add topics here freely; a topic with no projects simply won't render.
 */
export type ProjectTopic = 'Sports' | 'Politics' | 'Entertainment' | 'Science';

export interface Project {
  slug: string;
  name: string;
  /** One line for the card. */
  blurb: string;
  /** A paragraph for the section page — real content, not "coming soon". */
  pitch: string;
  section: ProjectSection;
  topic: ProjectTopic;
  status: ProjectStatus;
  /**
   * When it went up — orders the home feed and is shown on the entry.
   * ⚠️ Only `blind-board` is a verified date. The rest are placeholders;
   * correct them before deploy.
   */
  added: string;
  /**
   * The tool's own deployment. Visitors never go here directly: every link
   * points at `projectPath`, the on-site page that embeds it.
   */
  href?: string;
  /**
   * Screenshot of the tool, served from public/. Shown beside the entry on the
   * home page. Re-shoot when the tool's look changes.
   */
  image?: string;
  /** Card accent, this project's own. */
  accent: string;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: 'Play it',
  built: 'Built — not yet public',
  'in-progress': 'In progress',
  idea: 'Early',
};

export const projects: Project[] = [
  {
    slug: 'blind-board',
    name: 'The Blind Board',
    blurb:
      'Replay real NBA drafts with the names stripped off. Pick on the numbers, then find out who you took.',
    pitch:
      'Every prospect from 2010 to 2026, anonymized — no names, no photos, no schools you recognize. ' +
      'You get college production, measurements, and how good their team actually was, and you draft ' +
      'against the real order. At the end the board flips over and you find out how you did against the ' +
      'league. There is a new one every day.',
    section: 'games',
    topic: 'Sports',
    status: 'live',
    added: '2026-06-27',
    href: 'https://the-blind-board.vercel.app',
    image: '/shots/blind-board.jpg',
    accent: '#1F3A2B',
  },
  {
    slug: 'greenlight',
    name: 'Greenlight',
    blurb:
      'Two film pitches, no titles and no cast. Fund one. Then the box office opens.',
    pitch:
      'The same trick as the Blind Board, pointed at movies. You see two pitch decks — genre, budget, ' +
      'runtime, release window, the shape of the deal — with every identifying detail removed. You pick ' +
      'the one you would have financed, and then the books open. The data pipeline runs — budget ' +
      'coverage came in around 99% and it has already generated roughly 7,500 matchups. The game ' +
      'itself is what is left to build.',
    section: 'games',
    topic: 'Entertainment',
    status: 'in-progress',
    added: '2026-07-29',
    accent: '#2F8455',
  },
  {
    slug: 'heat-check',
    name: 'Heat Check',
    blurb:
      'Shot heatmaps for any NBA player or five-man lineup — offense, defense, on and off.',
    pitch:
      'One court, every shot. Pick a player or build a lineup and see where they actually score from and ' +
      'where they let other teams score from, measured against the league or head-to-head against another ' +
      'unit. The lineup tracking is reconstructed from play-by-play, which is the hard part and the reason ' +
      'it can answer questions the box score cannot.',
    section: 'data',
    topic: 'Sports',
    status: 'live',
    added: '2026-06-10',
    href: 'https://heat-check-nba.vercel.app',
    image: '/shots/heat-check.jpg',
    accent: '#C33B27',
  },
  {
    slug: 'nil-money',
    name: 'NIL Money Map',
    blurb:
      'Where college sports money lands — $2.03B of it, mapped to the towns the players are from.',
    pitch:
      'NIL deals are usually counted by school. This counts them by hometown: every dollar in football and ' +
      "men's basketball placed on the map where the player grew up, not where they play. It is a different " +
      'picture of who college sports actually pays, and which places send the talent that gets paid.',
    section: 'data',
    topic: 'Sports',
    status: 'live',
    added: '2026-07-15',
    href: 'https://nilredistribution.vercel.app',
    image: '/shots/nil-money.jpg',
    accent: '#9A7B1F',
  },
  {
    slug: 'donor-map',
    name: 'Political Donor Map',
    blurb:
      "Political money that crosses state lines — which states bankroll other states' races in 2026.",
    pitch:
      'Every 2026 individual donation to a federal candidate, traced from the state the donor lives in ' +
      'to the state of the race. Each pair is scored against the national pattern, so a big state ' +
      "sending a lot of money only stands out when it sends more than its size predicts. Pick a state " +
      'to see where its money goes and where its candidates’ money comes from. Straight from FEC filings.',
    section: 'data',
    topic: 'Politics',
    status: 'live',
    added: '2026-07-30',
    href: 'https://political-donor-map.vercel.app',
    image: '/shots/donor-map.jpg',
    accent: '#6A5A99',
  },
];

/**
 * Where a project links to on this site. Live tools open inside the site
 * (pages/<section>/<slug>.astro embeds `href`); the rest go to their section.
 */
export const projectPath = (p: Project) =>
  p.status === 'live' ? `/${p.section}/${p.slug}` : `/${p.section}`;

export const bySection = (section: ProjectSection) =>
  projects.filter((p) => p.section === section);

export const byTopic = (topic: ProjectTopic) =>
  projects.filter((p) => p.topic === topic);

/** Topics that actually have something in them, in first-appearance order. */
export const activeTopics = (): ProjectTopic[] => [
  ...new Set(projects.map((p) => p.topic)),
];

/**
 * Copy for each section page. `pages/[section].astro` generates one route per
 * key, so adding a section is adding an entry here plus a NAV item in config.ts
 * — no new page file.
 */
export const SECTIONS: Record<
  ProjectSection,
  { heading: string; intro: string; meta: string }
> = {
  games: {
    heading: 'Games',
    intro:
      'All of them run the same experiment on you. The names come off, the numbers ' +
      'stay on, you commit to a pick — and then everything gets put back and you find ' +
      'out what you actually just did.',
    meta:
      'Games built on the same idea: judge something with the identifying details ' +
      'taken away, then find out what you picked.',
  },
  data: {
    heading: 'Data Exploration',
    intro:
      'Tools for looking at something that already exists in public but has never ' +
      'been arranged this way. Each one is built from primary sources, and each one ' +
      "comes with the method written down — including what it can't tell you.",
    meta:
      'Maps and charts of sports, money, and politics — each one built from primary ' +
      'sources, with the method written down.',
  },
};
