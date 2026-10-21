import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { normalizeBase } from './src/lib/paths.ts';
export default defineConfig({
  site: process.env.SITE_URL || 'https://zheyron.github.io',
  base: normalizeBase(process.env.BASE_PATH || '/'),
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
});
