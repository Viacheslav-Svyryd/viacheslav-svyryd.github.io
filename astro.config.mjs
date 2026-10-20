// @ts-check
import { defineConfig } from 'astro/config';
import { existsSync, renameSync, rmSync } from 'node:fs';

// Абсолютна адреса потрібна лише для canonical/hreflang. Реального домену на сайті немає:
// після підключення Cloudflare Pages задайте SITE_URL (або змініть значення нижче).
const site = process.env.SITE_URL || 'https://example.com';

// Astro кладе вкладену 404 як en/404/index.html, а Cloudflare Pages шукає саме 404.html
// (найближчий вгору від адреси запиту) — тому англійську 404 переносимо у en/404.html.
const flatten404 = {
  name: 'flatten-nested-404',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const from = new URL('en/404/index.html', dir);
      if (!existsSync(from)) return;
      renameSync(from, new URL('en/404.html', dir));
      rmSync(new URL('en/404/', dir), { recursive: true });
    },
  },
};

export default defineConfig({
  site,
  integrations: [flatten404],
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: {
    '/': '/cases/',
    '/en/': '/en/cases/',
  },
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
