import { projects, type Project } from '../data/projects';
import { getPosts } from './posts';

type Post = Awaited<ReturnType<typeof getPosts>>[number];

export type FeedEntry =
  | { kind: 'project'; date: Date; project: Project }
  | { kind: 'post'; date: Date; post: Post };

/**
 * The home page is a running feed: every new tool, game, and post in one
 * reverse-chronological stream. A project is dated by its intro post (the
 * earliest post naming it in `project:`), falling back to `added`; posts by their
 * `date`. Nothing needs adding here when something ships — put it in
 * `data/projects.ts` or drop an `.mdx` in `content/blog/` and it appears.
 */
export async function getFeed(limit?: number): Promise<FeedEntry[]> {
  const posts = await getPosts();
  const introDate = (slug: string) =>
    posts.filter((p) => p.data.project === slug).at(-1)?.data.date;
  const entries: FeedEntry[] = [
    ...projects.map(
      (project): FeedEntry => ({
        kind: 'project',
        date: introDate(project.slug) ?? new Date(project.added),
        project,
      })
    ),
    ...posts.map(
      (post): FeedEntry => ({ kind: 'post', date: post.data.date, post })
    ),
  ].sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return limit ? entries.slice(0, limit) : entries;
}
