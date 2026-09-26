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
  /** External URL today; becomes a path rewrite in Phase 2 (NOTES.md §4B). */
  href?: string;
  /** Card accent, this project's own. */
  accent: string;
  /** Very light wash behind the card. */
  tint: string;
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
      'Mock-draft NBA prospects with the names stripped off. Pick on the numbers, then find out who you took.',
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
    accent: '#A9662F',
    tint: '#F6EEE4',
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
    tint: '#E9F2EB',
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
    accent: '#C33B27',
    tint: '#F8EAE6',
  },
  {
    slug: 'nil-money',
    name: 'NIL Money Map',
    blurb:
      'Where college sports money lands — $1.63B of it, mapped to the towns the players are from.',
    pitch:
      'NIL deals are usually counted by school. This counts them by hometown: every dollar in football and ' +
      "men's basketball placed on the map where the player grew up, not where they play. It is a different " +
      'picture of who college sports actually pays, and which places send the talent that gets paid.',
    section: 'data',
    topic: 'Sports',
    status: 'built',
    added: '2026-07-15',
    accent: '#9A7B1F',
    tint: '#F5F1E1',
  },
  {
    slug: 'donor-map',
    name: 'Who Funds Whom',
    blurb:
      'Political donations by profession, district by district — which jobs bankroll which candidates.',
    pitch:
      'Campaign filings ask donors what they do for a living, and almost nobody reads that column. The ' +
      'question is who each profession actually funds, and how differently a place gives than it votes. ' +
      'Straight from FEC filings. Still being measured: at congressional-district resolution most ' +
      'professions run out of donors, so the geography may have to be coarser than a district. The ' +
      'methodology will be published in full — on this subject that is the whole ballgame.',
    section: 'data',
    topic: 'Politics',
    status: 'idea',
    added: '2026-07-30',
    accent: '#6A5A99',
    tint: '#EFEDF6',
  },
];

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
