import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Post types per NOTES.md §5 — a visible tag so a general reader and a methods
 * reader each know which posts are theirs.
 */
export const POST_KINDS = ['Finding', 'Method', 'Notes'] as const;

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    kind: z.enum(POST_KINDS),
    /** Optional: ties a post to a project slug from src/data/projects.ts. */
    project: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
