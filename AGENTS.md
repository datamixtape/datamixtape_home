# The hub site — working guide

Astro static site that collects all five projects and hosts the blog.
`NOTES.md` is the brief (vision, locked decisions, open questions). **This file
is current state and next tasks.** Keep it updated.

Run everything from this folder.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview
```

## ⚠️ The name is a placeholder

`Roughly Precise` is a stand-in, not a decision. **Every user-visible string
derives from `src/config.ts`** — `SITE_NAME`, `SITE_TAGLINE`,
`SITE_DESCRIPTION`, `SITE_URL`, `CONTACT_EMAIL`. No component hardcodes any of
them. Renaming the site is one file.

Two things that also need the real name before deploy:
- `SITE_URL` — feeds RSS, sitemap, canonical + OG tags. Currently `example.com`.
- `CONTACT_EMAIL` — must be an alias, never the personal gmail (NOTES.md §3).
- `public/favicon.svg` — placeholder mark (a point inside its error bar).

## Layout

```
src/
  config.ts               ← name/domain/nav. The rename lives here.
  data/projects.ts        ← the projects: accent color, topic, section, `added` date
  lib/feed.ts             ← merges projects + posts into the home feed
  content.config.ts       ← blog schema; kind = Finding | Method | Notes
  content/blog/*.mdx      ← posts
  lib/posts.ts            ← published-only, newest-first
  layouts/Base.astro      ← html shell, meta, OG
  components/             ← Header, Footer, FeedEntry, ProjectCard, PostCard, EmailCapture
  pages/                  ← index (feed), [section], blog/, about, privacy, 404, rss.xml
  styles/global.css       ← @theme tokens + .prose-note
```

## Changing the nav

Two different sizes of change:

- **Renaming a label** — one line in `NAV` (`src/config.ts`). Header, footer, and
  the section-page heading all follow. Section headings/intros live in `SECTIONS`
  (`src/data/projects.ts`) so a rename usually touches both.
- **Going topic-first** (Sports / Politics / Entertainment / Science, each with
  Games + Data Exploration inside) — most of it is already in place:
  - Every project carries a `topic` alongside its `section`, with `byTopic()` and
    `activeTopics()` helpers.
  - `NAV` items accept `children`, and `Header.astro` renders a CSS-only dropdown
    (hover + focus-within, no JS) when they're present. Verified working.
  - `pages/[section].astro` generates one route per `SECTIONS` key — no per-page
    files to add.

  What's actually left: a `pages/[topic]/[section].astro` route (a near-copy of
  the existing one, filtered by both axes), copy for each topic, and rewriting
  `NAV` as the nested shape. Roughly an hour, not a restructure. The home feed
  doesn't change either way — it's chronological, not categorical.

## The home page is a feed

Reverse-chronological stream of everything that ships — tools, games, and posts
in one column, newest first. Built for roughly one new thing a week, so entries
are light rows (a colored kicker in the project's palette) rather than big
cards. The full tinted cards live on the section pages.

**Nothing needs adding to the home page when something ships.** Add the project
to `data/projects.ts` with an `added` date, or drop an `.mdx` in
`content/blog/`, and `lib/feed.ts` picks it up.

⚠️ **The `added` dates are mostly made up.** Only `blind-board` (2026-06-27) is
real. Fix the other four before deploy — they're displayed on the page.

When the feed gets long, cap it: `getFeed(20)` takes a limit, and the section
pages already act as the complete index.

## Conventions

- **Palettes are per-project, deliberately unharmonized** (NOTES.md §5). Do not
  normalize the accents toward the site color — the color shift between projects
  is the point.
- `wrap` is the 68rem page gutter; `wrap-prose` shares that gutter but caps each
  child at reading width, **left-aligned**, so body text lines up with the
  wordmark. Opt a child out with `max-w-none`.
- Site chrome only uses the `@theme` tokens in `global.css` (paper / ink / accent).
- New post: drop an `.mdx` in `src/content/blog/` with `title`, `description`,
  `date`, `kind`, optional `project` (a slug from `data/projects.ts`) and
  `draft`. `kind` outside the three values fails the build on purpose.
- `draft: true` hides a post from the listing, the routes, and RSS.
  `src/content/blog/example-draft.mdx` is the frontmatter reference — delete it
  once real posts exist.
- Light mode only.

## What's done

Phase 1 shell: home feed, Games / Data Exploration / Blog / About, post pages,
RSS, sitemap, 404, privacy policy, responsive down to 375px. Build is clean, no
console errors, fonts self-hosted (no third-party requests).

## Next, in order

1. **Pick the name + buy the domain.** Blocks everything below. Update
   `src/config.ts`, then rename this folder off `data_viz_main_site`.
2. **Email provider** (NOTES.md §11 Q15). `EmailCapture.astro` is inert and says
   so on the page — set `ACTION` to the provider endpoint to switch it on.
3. **git init**, and *set the commit name + noreply email before the first push*
   (NOTES.md §3 — pseudonym decision).
4. **Deploy to Vercel.** `vercel.json` is in place (`cleanUrls`, empty rewrites).
5. **Correct the `added` dates** in `data/projects.ts` (four of five are guesses).
6. **Real screenshots on the project cards** — currently text-only.
7. **Phase 2:** path rewrites so the tools live on this domain (NOTES.md §4B).
   Needs `base: '/blind-board/'` in the Blind Board's vite config first.
8. **Deploy the NIL map** — the one tool that's built but not public. Gated on an
   explicit go from the user.
