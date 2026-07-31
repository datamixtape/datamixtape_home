# The main site — brief / original vision

*Working doc. This is the vision + the open decisions. `README.md` (layout, how to
run) and `CLAUDE.md` (current state, next tasks) get written once there's code.*

**Status (2026-07-30): the Phase 1 shell is built.** Astro site in this folder —
home mosaic, Games / Data Exploration / Blog / About, post pages, RSS, sitemap,
404, privacy policy, responsive. See `AGENTS.md` for current state and next tasks;
this file stays the vision + the decisions. Most of what follows is still options
with a recommendation attached, plus the questions in §11.

**The site name is still a placeholder** (`Roughly Precise`, set in
`src/config.ts`). So is the domain — `SITE_URL` must be real before deploy.

### Decisions locked (2026-07-30)

| Topic | Decision | Detail |
|---|---|---|
| Identity | **Branded pseudonym** — site has a name and a voice, your legal name never appears; no active cloaking | §3 |
| Tool URLs | **Path rewrites** on one domain (`site.com/heat-check`), tools stay separately deployed | §4 |
| Hub + blog stack | **Astro**, static, on Vercel | §4 |
| Nav | **Games / Data / Blog** (+ About) | §5 |
| Voice | **Editorial "we" / no narrator** — the project speaks, not a person | §5 |
| Reader | Write what's interesting to *you*, but **label posts by type** so a general reader and a methods reader each know which ones are theirs | §5 |
| Phase 1 | **Email capture** in; **all five projects represented**, three of them deployed | §10 |

Still open and blocking Phase 1: **the site name and domain** (§8). Name flavor
deliberately left open for now.

---

## 1. The idea

One website that holds everything: the games, the data tools, and writing about
both. Today each project is an island — separate folders, separate Vercel
deployments, separate visual identities, no way for someone who likes one to find
the others. The site is the connective tissue.

Three things it has to do:

1. **Be the front door.** Someone lands, understands within five seconds that this
   is a place where interactive things about sports/money/culture live, and can get
   into any one of them in one click.
2. **Hold a blog.** Intro posts for each tool ("here's what this is, here's how to
   read it"), findings posts ("the thing I found while building it"), methodology
   posts, and whatever else. The blog is what gives the tools a voice and gives
   people a reason to come back when no new tool has shipped.
3. **Not foreclose money.** Not a business. But a tip jar now and a subscription
   later shouldn't require a rewrite. See §7.

---

## 2. What goes on it

Real status as of 2026-07-30, not aspirational:

| Project | What it is | Stack | State |
|---|---|---|---|
| **The Blind Board** | Mock-draft de-identified NBA prospects, 2010–2026; reveal + score. Daily Challenge mode. | React 19 + Vite 7 + Tailwind v4, static SPA | **Live** — the-blind-board.vercel.app |
| **Heat Check** | On/off shot heatmaps for any NBA player or lineup; one court, offense/defense, vs league or head-to-head. | Vanilla HTML/JS/canvas, static | **Live** — heat-check-nba.vercel.app |
| **NIL Hometown Money Map** | US map of college-sports money placed at players' hometowns. $1.63B, football + men's basketball. | Vanilla HTML/JS + Leaflet-ish map, static | **Built, not deployed** (deploy is gated on an explicit go) |
| **Greenlight** *(working title)* | Blind film-financing game — two pitch decks, no titles or cast, pick one, then the books open. | Planned: mirror the Blind Board stack | **Brief only**, no code (`film_studio_game/NOTES.md`) |
| **Congressional donations map** | Which professions fund which candidates. | — | **Idea only**, empty folder |

Two of five are games, three are data tools. That split matters for the nav (§5)
and it means **the folder name `data_viz_main_site` undersells it** — half the site
isn't data viz. Worth renaming the folder when the site gets a real name.

Also true and relevant: **none of these projects are in version control.** No git,
anywhere. That's survivable for scratch experiments; it's not survivable for the
thing that's your public front door. See §9.

---

## 3. Identity: personal or pseudonymous

**Decided: B, branded pseudonym.** The reasoning and the alternatives are kept
below because the setup work (§9) depends on knowing what B does and doesn't buy.

Three real positions, not two:

**A. Personal, named.** Your name on it, linked from a résumé, an "about me."
Best if the site is ever meant to do professional work for you. Costs nothing.

**B. Branded pseudonym ← chosen.** The site has a name and a voice; your legal
name simply doesn't appear anywhere. No cloak-and-dagger — someone determined
could probably connect it, and that's fine. This is what most independent
tool-builder sites actually are, and it's approximately free.

**C. Hard pseudonymity.** Actively resistant to being linked to you. Meaningfully
more work and it constrains real things (see below).

Before choosing, the question that decides it: **what is the pseudonymity for?**
An employer conflict, the politics project specifically, general preference, or
just not wanting your name in search results? And does it need to hold up against
someone actively trying, or only against casual notice? Those give different
answers.

What C actually costs, concretely — worth knowing before picking it:

- **Domain.** WHOIS privacy is free at most registrars (Cloudflare, Porkbun). Fine.
- **Vercel.** Deployment URLs embed the team slug (`…-<team-slug>.vercel.app`, and
  the existing slug is name-derived) and the old `*.vercel.app` hostnames stay
  reachable and indexable even after a custom domain is attached. Would want a
  fresh team/account under the pseudonym.
- **Git.** If repos go public, every commit carries an author name and email.
  Either private repos, or a pseudonymous account with a `noreply` commit email
  set *before* the first push.
- **Contact.** A forwarding alias, never the gmail.
- **Money.** This is the hard one. Stripe, Ko-fi, Patreon, GitHub Sponsors — all
  require verified legal identity for payout, and the card statement descriptor is
  configurable but the paper trail isn't. You can be pseudonymous *to readers*; you
  can't be pseudonymous to the payment processor or to anyone who receives a
  receipt with an unlucky descriptor. **Hard pseudonymity + taking money is a real
  tension.** Position B has no such problem.
- **The tell is usually the writing.** "I built this, here's what broke" posts leak
  biography faster than any technical artifact.

### What B actually requires (the short list)

Cheap, but not zero — and two of these have to happen *before* the first push and
the first deploy:

- WHOIS privacy on the domain (free at Cloudflare/Porkbun). Do it at purchase.
- A **contact alias**, not the gmail, anywhere an address appears.
- **Set the git commit identity before the first commit** — name + a `noreply`
  email — at minimum on the hub repo, which is the one likeliest to go public.
  Rewriting author history later is possible and unpleasant.
- No "hi, I'm ___" on the About page; the About page is about the project (§11 Q3).
- Nothing else. Payments, analytics, and the existing `*.vercel.app` URLs are all
  fine under B — those only become problems under C.

The one leak B doesn't defend against, and doesn't try to: build-notes posts, which
carry biography whether or not they carry a name. Worth being deliberate in the
writing rather than trying to solve it structurally.

---

## 4. Architecture

The interesting constraint: the tools are **deliberately heterogeneous.** Blind
Board is a React SPA with a router; Heat Check is hand-written canvas with no build
step; the NIL map is a generated HTML file. Unifying their code would be a large
rewrite that buys nothing. Unifying their *URLs and chrome* buys a lot.

Three options:

**A. Hub-and-spoke — the hub links out.** Cheapest. But visitors leave the site to
use anything, each tool keeps a different domain, and there's no shared nav.
Fine for a weekend, weak as a destination.

**B. One domain, path-based rewrites ← chosen.** The hub owns
`site.com`; `vercel.json` rewrites `/heat-check/:path*` →
`https://heat-check-nba.vercel.app/:path*`. Each tool keeps its own repo, its own
stack, its own deploy cadence — nothing merges — but every URL is on one domain,
which consolidates SEO and makes it feel like one product.

Per-tool cost of B:
- *Heat Check, NIL map:* nothing. They fetch `data/*.json` relatively, which
  resolves correctly under a path prefix.
- *Blind Board:* small — `base: '/blind-board/'` in `vite.config.ts` and a matching
  router `basename`. Half an hour, plus a redeploy.
- *Shared nav:* a small snippet each tool includes (a `<header>` + one CSS file
  served from the hub), so the back-to-site link exists everywhere.

**C. Subdomains** (`heatcheck.site.com`) — the escape hatch. Zero refactor, just a
domain alias per Vercel project. Slightly less "one site," and it splits SEO. Keep
in the back pocket if B turns fragile.

**D. Rewrite everything into one Next.js/Astro app.** Rejected. Weeks of work, kills
per-tool independence, and the tools genuinely want different runtimes.

### Hub + blog stack

**Decided: Astro**, statically output, on Vercel.

Why: it's content-first (markdown/MDX collections, RSS, sitemap, OG images all
first-class), ships zero JS by default so the blog is fast, and its "islands" let a
post embed a *real interactive chart* without dragging a whole SPA along. It renders
React components directly, so the existing Tailwind + React knowledge transfers, and
Tailwind v4 works the same as in the Blind Board.

Alternatives considered: **Next.js + MDX** (fine, heavier, better if a backend
appears later for §7); **a hosted CMS** — Ghost or Substack — which gets paid
memberships for free but lives at its own address with its own look, splitting the
identity. Not worth it yet.

Blog content lives as `.mdx` files in the repo. No CMS, no database.

---

## 5. Structure & design

### Nav

**Decided: Games / Data / Blog** (+ About). Matches the actual split and gives
every new project an obvious home.

The known weakness: the sections are thin right now — 2 games, 3 data tools, one
of which isn't deployed. Two ways to keep thin sections from reading as empty:

- **The section index is a real page, not a list.** Big cards in each project's own
  palette (§5, mosaic), a sentence of framing at the top of each section. Three
  substantial cards read as a curated shelf; three text links read as a stub.
- **Let unbuilt work show** where it's genuinely coming (§11 Q6) — Greenlight has a
  full design brief behind it, so a "in progress" card there is honest rather than
  padding.

Revisit if it still looks sparse once the shell exists; switching to Projects /
Writing later is a nav change, not a rebuild.

### Visual system — three tiers

The decided architecture (keep it):

- **Site tier** — wordmark, nav, footer, blog typography. One identity.
- **Family tier** — Games share interaction conventions with each other; Data tools
  likewise.
- **Tool tier** — each tool keeps its own palette, derived from its subject and
  from what the data needs (a diverging heat scale, a choropleth ramp). **Palettes
  do not get harmonized to a site accent** — dataviz color is constrained by the
  data, not by brand.

Coherence comes from structural consistency and a consistent writing voice, not a
shared accent color. The idea worth building: **render each project card on the home
page in that project's own palette**, so the index reads as a mosaic and the color
shift on entering a tool feels intentional rather than broken.

Open: the Blind Board's own theme is unresolved (eight directions mocked, none
chosen — it's currently sitting on a "Hardwood" theme in source, undeployed). The
hub's identity shouldn't wait on it.

### Blog

**Voice: editorial "we" / no narrator.** The project speaks, not a person — which
suits the tools (a methodology note written institutionally reads as more careful,
not less) and is the most consistent with the pseudonym. The cost to watch for: it
can make findings posts feel cold and press-release-ish. Mitigation is being
opinionated rather than being personal — "this number is doing something strange"
is a voice; "I was confused for an hour" is a narrator.

**Reader: write what's interesting to you, and label the post type** so nobody's
lost. Not chasing an audience, but not making a general reader wade through a
lineup-reconstruction bug to reach the finding either. In practice: a visible tag
per post (*Finding* / *Method* / *Notes*), findings written so someone who knows
basketball but not statistics can finish them, method posts written for someone who
wants to check the work. Same site, self-sorting.

Post types, roughly in order of value:

1. **Findings** — "the thing I found." These are the ones with any distribution
   potential. One per tool minimum.
2. **Intros** — what a tool is and how to read it. Doubles as the tool's docs;
   link to it from inside the tool.
3. **Methodology** — how the data was made, what it can't tell you. **Load-bearing
   for the NIL map and mandatory for the politics map** — credibility on money and
   politics data is entirely a function of showing your work. The NIL map already
   has a "How this works" overlay; that content wants to be a post too.
4. **Build notes** — what broke. Cheap to write, real audience, but the most
   biography-leaky if pseudonymous (§3).

---

## 6. What the hub page actually is

Not a link farm. The home page should let you *do something*. Options:

- **Live tiles** — each project card shows a real, small, working piece of itself
  (a mini heatmap, one draft card, a zoomed-out map thumbnail). Expensive but this
  is what makes the site feel alive.
- **Daily hook** — the Blind Board already has a Daily Challenge. Surfacing today's
  puzzle *on the home page* gives a reason to return daily, which is the single
  best thing for an email list and for anything monetizable later.
- **Static cards** — screenshot + title + one line. Ship this first; upgrade later.

Recommend: static cards for v1, daily hook as the first upgrade.

---

## 7. Money

Ladder, cheapest to most invasive:

| Tier | What | Infra needed | Verdict |
|---|---|---|---|
| 1 | **Tip jar** — Ko-fi / Buy Me a Coffee / a Stripe payment link | A link | Cheapest real option, an afternoon. **Deferred out of Phase 1** — revisit once the site is up. |
| 2 | **Sponsors** — GitHub Sponsors, Patreon | A link | Fine, but needs an audience first. |
| 3 | **Paid newsletter** — Ghost memberships, Substack paid tier | Blog moves or gains a members layer | Only if the writing becomes the main draw. |
| 4 | **Paid tool features** — historical seasons, saved lineups, exports, no-limits | **Auth + a backend + entitlements** | The one that breaks everything. See below. |
| 5 | **Ads** | Traffic | Wrong for this aesthetic. |
| 6 | **One-off products** — a dataset download, a paid deep-dive | A file + a checkout | Underrated; near-zero infra. |

**The structural point worth internalizing: only tier 4 changes the architecture.**
Every tool today is a static site with no server, no accounts, and no per-user
state — that's *why* they're cheap to host and impossible to break. Gated features
means auth, a session, a database, and an entitlement check inside each tool. It's
not off the table, but it's a different project and shouldn't be designed for now.

**Decided: the email list ships in Phase 1, the tip jar doesn't.** A single field on
the home page and in the blog footer. It costs nothing today and it's the asset
every later option depends on — a tip jar with no audience is decoration, a list
built from day one compounds. Taking emails means a privacy policy; trivial, but
write one.

Everything else: don't build for money now, just don't paint into a corner.

---

## 8. Domain & name

Needed before much else, because the domain choice bakes in §3.

The name has to cover *games about sports and film* and *maps about money and
politics*. Directions worth exploring rather than specific proposals: a
made-up-word brand, a "workshop/lab/desk" construction, something about the shared
method (numbers stripped of their labels), or just a pen name.

Notes: `.com` if it's cheap and free, otherwise a clean second choice; skip anything
that dates the site to one sport. Register with WHOIS privacy regardless of §3.
Buy it before announcing anything anywhere.

---

## 9. Version control & repo layout

Prerequisite work, not optional once this is public.

- **Every project into git.** Independently — one repo per project, matching how
  they deploy. A monorepo is tempting and wrong here: the tools have unrelated
  toolchains (Python pipelines + Node apps + a plain static folder) and independent
  deploy cadences.
- **The hub gets its own repo**, and it's the only one with a CI story worth having.
- **Set the commit identity before the first push** if §3 lands on B or C.
- Data folders are large (photos, scraped CSVs, ~460MB of `node_modules` in the
  Blind Board) — `.gitignore` needs real thought per project, and large generated
  datasets probably shouldn't be committed at all.

Also housekeeping: the top-level `claude-projects/README.md` index is stale — it
lists three projects out of eight.

---

## 10. Roadmap

**Phase 0 — decide.** Identity (§3), name + domain (§8), nav shape (§5). Nothing
gets built well before these.

**Phase 1 — the shell, with all five projects on it.** Astro site: home page,
Games / Data / Blog sections, About, one real post, RSS, OG images, **email
capture** (+ the privacy policy it requires). Tools still link out to their current
URLs. **Ship it.** This alone is most of the value.

"All five represented" is the goal, and it splits three ways:

| Project | Phase 1 state |
|---|---|
| Blind Board, Heat Check | Already deployed — card links straight out |
| **NIL map** | **Deploy it.** Built, mobile-ready, methodology overlay done. The only real deploy work in Phase 1. |
| Greenlight, donations map | **In-progress cards.** No code exists — Greenlight has a full brief, the donations map is an idea. They can't be deployed without being built first, which is its own project each. |

The in-progress cards should say something real (what it is, what stage) rather
than "coming soon" — a card with a genuine one-paragraph pitch is content; a
placeholder is padding. If either should instead be *built* before launch, that
changes Phase 1 from a weekend to a season.

**Phase 2 — unify.** Domain live. Path rewrites for Heat Check, the Blind Board,
and the NIL map (§4B), plus the shared header snippet. One site, one set of URLs.

**Phase 3 — write.** An intro + a findings post per live tool. Establish a cadence
you can actually hold; a dead blog looks worse than no blog.

**Phase 4 — experiment.** Tip jar. Daily hook on the home page. Live tiles. See
whether anyone shows up before designing anything for money.

New tools (Greenlight, the donations map) slot in whenever they're ready; the site
shouldn't wait on them, and they shouldn't wait on the site.

---

## 11. Open questions

Grouped. Ones with a recommendation don't block Phase 1 — **Q1 does.**

**Naming — blocking**
1. **Site name and domain** (§8). Everything in Phase 0 waits on this.
2. Does the folder get renamed off `data_viz_main_site` to match?
3. Do the tools keep their own names (Heat Check, The Blind Board) under a site
   brand — recommend yes, they're good names — or get absorbed into one scheme?

**Identity follow-ups** *(posture settled: branded pseudonym; voice settled:
editorial)*
4. Does the politics project need different handling from the rest, or does the
   whole site take one posture?
5. What does the About page say — the project's story, the method, or nothing much?
   (Harder under an editorial voice: there's no "me" to introduce, so it probably
   becomes a *statement of method* rather than a bio.)

**Scope & shape**
6. Greenlight and the donations map as in-progress cards — or is either one meant
   to be **built before launch**? That's the difference between a weekend and a
   season (§10).
7. Does the site ever host things that aren't these five — one-off charts, small
   experiments, a links page?

**Blog**
8. What's the realistic cadence — monthly, whenever, or a schedule?
9. Comments — none, or something lightweight? (Recommend none.)
10. Is any of this cross-posted (Substack, Medium, a subreddit), or is the site the
    only home?
11. Does the *Finding / Method / Notes* tagging show as visible labels, or just
    shape how each post is written?

**Technical**
12. Does the shared header get embedded into each tool, or do tools stay
    chrome-less with only a back link?
13. Analytics — Vercel Analytics (already on the Blind Board), something more
    privacy-preserving, or none?
14. Git before or during Phase 1? (Recommend before — the commit identity has to be
    set before the first push anyway; §3.)
15. Which email provider? Buttondown / Kit / Resend + a table are all cheap; the
    pick mostly determines how painful a paid tier is later (§7 tier 3).

**Money** *(tip jar deferred out of Phase 1)*
16. Tip jar in Phase 2, or wait until there's traffic to justify it?
17. Is there any version of this you'd want to be a real business, or is "covers
    the domain and hosting" the ceiling?

---

## 12. Risks

- **The blog is the part that dies.** Tools are finishable; a blog is a commitment.
  Two posts and a year of silence reads worse than a site with no blog. Decide the
  cadence honestly, and consider framing it as "notes" rather than a blog so
  infrequency isn't a failure state.
- **Over-designing the hub before there's traffic.** The mosaic home page and live
  tiles are the fun part and the least load-bearing. Phase 1 should be almost
  boring.
- **Pseudonymity is easy to lose and impossible to regain.** Every leak in §3 is
  permanent once indexed. If C is the answer, do the setup *before* the first push
  and the first deploy — not after.
- **Unifying URLs can break working tools.** Heat Check and the Blind Board are live
  and working. Rewrites touch asset paths, routers, and relative fetches. Do it
  behind a preview deploy, verify both tools end to end, and keep the old URLs
  alive as redirects.
- **The politics project is a different risk class.** Political donation data
  invites scrutiny that NBA shot charts don't. Its methodology write-up isn't a
  nice-to-have, and it may deserve its own decision about identity.
