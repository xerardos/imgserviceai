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
  },
  // Vite configuration optimizada para CSS
  vite: {
    build: {
      cssCodeSplit: false,  // ← AÑADIR: Evita problemas de CSS splitting
      assetsInlineLimit: 0, // ← AÑADIR: Evita inline de assets para mejor debugging
    },
    css: {
      devSourcemap: true,   // ← AÑADIR: Mejora debugging en desarrollo
    },
  },
  
  // Resto de configuración mantener igual...
  image: {
    domains: ['images.unsplash.com', 'developer.apple.com', 'play.google.com', 'get.microsoft.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});

// Forcing a server reload to fix potential JSX runtime issues.
