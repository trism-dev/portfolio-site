import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';
import { projectSchema } from './project-schema';

const root = join(process.cwd(), 'src', 'content');

const experience = z.object({
  title: z.string(),
  org: z.string(),
  when: z.string(),
  order: z.number(),
  stack: z.array(z.string()).default([]),
  published: z.boolean().default(true),
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

export const getProjects = () => load('projects', projectSchema);
export const getCaseStudies = () => getProjects().filter((p) => p.data.kind === 'case-study');
export const getExperience = () => load('experience', experience).filter((entry) => entry.data.published);
export const getAbout = () => readFileSync(join(root, 'about.mdx'), 'utf8');
