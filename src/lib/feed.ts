import { projects, type Project } from '../data/projects';
import { getPosts } from './posts';

type Post = Awaited<ReturnType<typeof getPosts>>[number];

export type FeedEntry =
  | { kind: 'project'; date: Date; project: Project }
  | { kind: 'post'; date: Date; post: Post };

/**
 * The home page is a running feed: every new tool, game, and post in one
 * reverse-chronological stream. Projects are ordered by `added`, posts by their
 * `date`. Nothing needs adding here when something ships — put it in
 * `data/projects.ts` or drop an `.mdx` in `content/blog/` and it appears.
 */
export async function getFeed(limit?: number): Promise<FeedEntry[]> {
  const entries: FeedEntry[] = [
    ...projects.map(
      (project): FeedEntry => ({
        kind: 'project',
        date: new Date(project.added),
        project,
      })
    ),
    ...(await getPosts()).map(
      (post): FeedEntry => ({ kind: 'post', date: post.data.date, post })
    ),
  ].sort((a, b) => b.date.valueOf() - a.date.valueOf());

  return limit ? entries.slice(0, limit) : entries;
}
