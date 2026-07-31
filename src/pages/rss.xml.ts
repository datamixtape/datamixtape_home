import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/posts';
import { SITE_NAME, SITE_DESCRIPTION } from '../config';

export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: context.site ?? 'https://example.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: [post.data.kind],
      link: `/blog/${post.id}/`,
    })),
  });
}
