import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const guias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guias' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    cluster: z.enum(['presupuesto', 'lote', 'cotizaciones', 'permisos', 'diseno', 'sistemas', 'gestion']),
    type: z.enum(['pilar', 'apoyo']),
    author: z.string(),
    reviewer: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    sources: z.array(z.object({ url: z.url(), context: z.string(), consultedAt: z.coerce.date() })),
    related: z.array(z.string()),
    service: z.string(),
  }),
});

export const collections = { guias };
