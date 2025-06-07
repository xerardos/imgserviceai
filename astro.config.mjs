// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',  // ← IMPORTANTE: Faltaba esta línea
  site: 'https://flux-portraits.example.com',
  base: './',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  // Build configuration optimizada para producción
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',  // ← REVERTIR: de 'always' a 'auto' para mejor compatibilidad
  },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: true
    }
  }
});

// Forcing a server reload to fix potential JSX runtime issues.
