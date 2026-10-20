import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const kv = z.object({ label: z.string(), value: z.string() });

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(['uk', 'en']),
      caseSlug: z.string(),
      h1: z.string(),
      metaTitle: z.string(),
      metaDescription: z.string(),
      geo: z.enum(['UA', 'EN']),
      title: z.string(),
      src: z.string(),
      cardImage: image(),
      metric: z.string(),
      metricNote: z.string(),
      hook: z.string(),
      cardHook: z.string().optional(),
      hook2: z.string().optional(),
      agency: z.boolean().optional(),
      about: z.array(kv),
      period: z.object({
        label: z.string(),
        start: z.string(),
        end: z.string(), // ISO або "present"
        asOf: z.string().optional(),
        length: z.string(),
      }),
      dyn: z.array(
        z.object({
          k: z.enum(['img', 'traf', 'pos']),
          cap: z.string(),
          image: image().optional(),
          shared: z.boolean().optional(), // скрін без EN/UA-версії (показується в обох мовах)
          alt: z.string().optional(),
          head: z.array(z.string()).optional(),
          rows: z.array(z.array(z.string())).optional(),
          note: z.string().optional(),
          plain: z.boolean().optional(),
        }),
      ),
      traffic: z.object({
        from: z.object({ label: z.string(), value: z.string() }),
        to: z.object({ label: z.string(), value: z.string() }),
        delta: z.string(),
      }),
    }),
});

export const collections = { cases };
