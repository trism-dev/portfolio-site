import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

const root = join(process.cwd(), 'src', 'content');

const project = z.object({
  title: z.string(),
  tagline: z.string(),
  status: z.enum(['live', 'demo-video', 'in-progress', 'archived']),
  dates: z.string(),
  order: z.number(),
  featured: z.boolean().default(true),
  stack: z.array(z.string()).min(1),
  repoUrl: z.string().url().optional(),
  heroMetric: z.object({ value: z.string(), label: z.string() }),
  architectureDiagram: z.string(), // file name in src/diagrams
  diagramAlt: z.string(), // one sentence describing the flow
});

const experience = z.object({
  title: z.string(),
  org: z.string(),
  when: z.string(),
  order: z.number(),
});

function load<T extends z.ZodType>(dir: string, schema: T) {
  return readdirSync(join(root, dir))
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const { data, content } = matter(readFileSync(join(root, dir, f), 'utf8'));
      return { slug: f.replace(/\.mdx$/, ''), data: schema.parse(data) as z.infer<T>, body: content };
    })
    .sort((a, b) => (a.data as { order: number }).order - (b.data as { order: number }).order);
}

export const getProjects = () => load('projects', project);
export const getExperience = () => load('experience', experience);
export const getAbout = () => readFileSync(join(root, 'about.mdx'), 'utf8');
