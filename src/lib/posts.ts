import { getCollection } from 'astro:content';
import { LOCAL_TEST } from './toolSrc';

/**
 * Published posts, newest first. Drafts are excluded from production builds but
 * shown under `astro dev` and in the local test build, so they can be previewed.
 */
export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || LOCAL_TEST || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
