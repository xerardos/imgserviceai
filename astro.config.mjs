// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://flux-portraits.example.com',
  integrations: [sitemap()],
});

// Forcing a server reload to fix potential JSX runtime issues.
