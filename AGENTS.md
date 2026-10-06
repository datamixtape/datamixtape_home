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

## The name: Data Mixtape — `datamixtape.com` (registered 2026-08-06)

Displayed as **Data Mixtape** with a space; the domain has none — `SITE_NAME` and
`SITE_URL` are separate strings on purpose, so the wordmark stays readable while
the URL stays sayable. No hyphen: the run-together form has no bad second reading,
and "hyphen" is dead weight every time you say the address aloud.

`dataremix.com` was the pick first and turned out to be **registered but parked**
— no NS, no SOA, no A record, so a DNS check reads it as free. **The DNS
availability check is reliable for "taken," not for "free."** Always confirm at a
registrar.

**Every user-visible string derives from `src/config.ts`** — `SITE_NAME`,
`SITE_TAGLINE`, `SITE_DESCRIPTION`, `SITE_URL`, `CONTACT_EMAIL`. No component
hardcodes any of them.

Still open on the name:
- `public/favicon.svg` is a leftover mark from an older name (a point inside its
  error bar). It means nothing now — a cassette is the obvious replacement.
- `CONTACT_EMAIL` is `hello@datamixtape.com` and doesn't route yet.
- Unregistered and worth grabbing as 301 redirects: `datamixtapes.com` (the
  likely typo), `data-mixtape.com`. One Vercel project, multiple domains, one
  canonical — never mirror content on two hostnames without a redirect.

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

`added` dates: blind-board (2026-06-27), heat-check (2026-07-29) and nil-money
(2026-09-18) are real, from each tool's first production deploy on Vercel.
⚠️ donor-map and greenlight haven't shipped; set theirs to the day they do.

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
- Light mode only.

## What's done

Phase 1 shell: home feed, Games / Data Exploration / Blog / About, post pages,
RSS, sitemap, 404, privacy policy, responsive down to 375px. Build is clean, no
console errors, fonts self-hosted (no third-party requests).

## Deploy queue (staged 2026-09-28 — run only when the user says "deploy")

Everything below is committed locally, built, and verified inside the hub under
`astro dev` (desktop + phone). Nothing is pushed or deployed. **A push
auto-deploys, so treat pushing the same as `vercel --prod`.** Order matters: the
production hub embeds each tool's *production* URL, so ship the tools first and
the hub last. All Vercel projects are in the same team (`team_DwrC…`).

| # | What | Repo / branch | Unpushed commits | Ship with |
|---|---|---|---|---|
| 1 | Blind Board | `nba_draft` (private `blindboard`) `main` | a3c0c67 → HEAD (8): re-theme, frame sizing, no header when embedded, prospect-card hero, settings panel, brand in draft bar, `/preview` route (the blog post's embedded board) | `cd nba_draft/app && npx vercel --prod` → the-blind-board.vercel.app |
| 2 | Heat Check | `nba_viz` (private `heatcheck`) `main` | f19bc16, 45fdf99, 198e549, fc735df: re-theme, embed script, `?view=post` + URL lineup presets (the blog post's court embeds) | rebuild (`build_lineup_compare.py` → `port_to_live.py`), then `cd design/site && npx vercel --prod` → heat-check-nba.vercel.app |
| 3 | NIL Money Map | `NIL money` (private `nilmoney`) `main` | 3ccd61a, cdddf95, 5c1fd9b, 0d640e9: re-theme, embed script, **TNS football valuations** (licensed; badge + credit in How this works), bigger title | `./build.sh` (needs the gitignored TNS CSV) then `cd prototype && npx vercel --prod` → nilredistribution.vercel.app. The deployed page now carries TNS per-player figures — that's the licensed use; never put it in a public repo |
| 4 | Political Donor Map | `political_donation_map` — local git repo since 2026-10-01 (`main`, 467020b), **no GitHub remote, no Vercel project yet** | — | First deploy creates the project: `cd political_donation_map/prototype && npx vercel --prod`; `prototype/vercel.json` names it `political-donor-map` and rewrites `/` → `flows.html`. The hub embeds `https://political-donor-map.vercel.app` — if Vercel assigns a different URL, update `src/pages/data/donor-map.astro` + `projects.ts` before step 5. Any GitHub repo for it must be **private**; `data/` + `archive/` (12 GB raw FEC, itemized) are gitignored |
| 5 | Hub | this repo, `local-full-site` → `main` (public `datamixtape_home`) | 16 ahead of `origin/main` (which is the "coming soon" placeholder) | merge into `main` + push (auto-deploys datamixtape.com), or `vercel --prod` |

**Before step 5:**
- Set donor-map's `added` date in `data/projects.ts` to its ship day (the
  other live tools' dates are verified).
- Every commit here is authored `placeholder@users.noreply.github.com`. Fine for
  a public repo as-is (it hides identity), but decide before the push, because
  rewriting after it is messy (see step 3 below).
- Drafts only render under `astro dev`, so they won't ship.
- `blind-board-intro.mdx` (draft) embeds `the-blind-board.vercel.app/preview` and `/preview/daily`,
  which only exists once step 1 ships. Publishing it (`draft: false`) also needs
  `hello@datamixtape.com` to route, since the post links to it.

**About page is empty** (placeholder text removed 2026-09-30) — it needs the user's text before the hub ships, or drop it from the nav.

**Still to do before deploy (the user wants these in the same batch):** bigger
page titles and trimmed explainer text on Heat Check and the Political Donor Map
(NIL done in 0d640e9: 32px title, subtitle cut to "2026 NIL earnings by hometown").

**Local "as-shipped" preview:** `:5173` serves the Blind Board *production
build* (`/tmp/bb_serve.py`, SPA fallback) rather than Vite dev, so after any
Blind Board edit run `nba_draft/refresh.sh` first. `:8123/:8124/:8125` serve
the NIL / Heat Check / donor builds from `/tmp/*_dist`. Hub: `astro dev` on
:4331 (it embeds the local builds via `devSrc`). `astro build` is clean.

## Next, in order

1. ~~**Pick the name + buy the domain**~~ — done, **Data Mixtape** /
   `datamixtape.com`, registered 2026-08-06.
   **Remaining: rename this folder off `data_viz_main_site`.**
2. **Email provider** (NOTES.md §11 Q15). `EmailCapture.astro` is inert and says
   so on the page — set `ACTION` to the provider endpoint to switch it on.
3. ~~**git init**~~ — done, `main`, one commit, nothing pushed anywhere.
   ⚠️ **The commit identity is a placeholder and must be fixed before the first
   push** (NOTES.md §3 — pseudonym decision). Currently, set `--local` only:
   `Data Mixtape <placeholder@users.noreply.github.com>`. Once the
   pseudonymous GitHub account exists, take the real
   `<id>+<username>@users.noreply.github.com` from GitHub → Settings → Emails,
   then rewrite every existing commit:

   ```bash
   git config --local user.name "<pseudonym>"
   git config --local user.email "<id>+<username>@users.noreply.github.com"
   git rebase -r --root --exec 'git commit --amend --no-edit --reset-author'
   ```

   Cheap now, unpleasant after the history grows. Creating the GitHub account is
   a manual step — Claude can't create accounts.
4. **Deploy to Vercel.** `vercel.json` is in place (`cleanUrls`, empty rewrites).
5. ~~**Correct the `added` dates**~~ — done for the three shipped tools; donor-map and greenlight get theirs when they ship.
6. **Real screenshots on the project cards** — currently text-only.
7. **Phase 2:** path rewrites so the tools live on this domain (NOTES.md §4B).
   Needs `base: '/blind-board/'` in the Blind Board's vite config first.
8. **Deploy the NIL map** — the one tool that's built but not public. Gated on an
   explicit go from the user.
