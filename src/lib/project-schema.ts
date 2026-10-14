import { z } from 'zod';

const common = {
  title: z.string().min(1),
  dates: z.string().min(1),
  order: z.number(),
  featured: z.boolean(),
  summary: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  repoUrl: z.string().url().optional(),
};

export const projectSchema = z.discriminatedUnion('kind', [
  z.object({ ...common, kind: z.literal('summary') }),
  z.object({
    ...common,
    kind: z.literal('case-study'),
    tagline: z.string().min(1),
    limitation: z.string().min(1),
    status: z.enum(['live', 'demo-video', 'in-progress', 'archived']),
    heroMetric: z.object({ value: z.string(), label: z.string() }),
    architectureDiagram: z.string().min(1),
    diagramAlt: z.string().min(1),
  }),
]);
