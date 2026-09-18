// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import { SITE_URL } from './src/config';

// https://astro.build/config
export default defineConfig({
  // Domain lives in src/config.ts. Sitemap, RSS, and canonical URLs all read
  // from it — it must be registered before the first deploy.
  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap(), mdx()],
});
