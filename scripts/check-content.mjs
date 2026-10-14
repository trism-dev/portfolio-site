import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import ts from 'typescript';

const required = ['Problem', 'What I built', 'Architecture', 'Key decisions', 'Results', "What didn't work"];
const schemaSource = ts.transpileModule(readFileSync(new URL('../src/lib/project-schema.ts', import.meta.url), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.ESNext },
}).outputText.replace("from 'zod'", `from '${import.meta.resolve('zod')}'`);
const { projectSchema } = await import('data:text/javascript;base64,' + Buffer.from(schemaSource).toString('base64'));

export function usableUrl(value) {
  if (typeof value !== 'string' || value.includes('{{')) return false;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; }
}

export function validateProject(source, links = {}) {
  const { data, content } = matter(source);
  const parsed = projectSchema.safeParse(data);
  if (!parsed.success) return parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
  if (parsed.data.kind === 'summary') return [];
  const headings = [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const errors = required.filter((h) => !headings.includes(h)).map((h) => 'missing "## ' + h + '"');
  const demo = usableUrl(links.demoUrl);
  const video = usableUrl(links.videoUrl);
  if (data.status === 'live' && !demo) errors.push('live status requires a usable demoUrl');
  else if (data.status === 'demo-video' && !video) errors.push('demo-video status requires a usable videoUrl');
  else if (data.status !== 'in-progress' && !demo && !video) errors.push('needs a usable demoUrl or videoUrl unless status is in-progress');
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  // Read the actual config without relying on its formatting.
  const source = ts.transpileModule(readFileSync('src/config.ts', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ESNext },
  }).outputText;
  const { config } = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
  const errors = readdirSync('src/content/projects').filter((f) => f.endsWith('.mdx')).flatMap((f) =>
    validateProject(readFileSync(join('src/content/projects', f), 'utf8'), config.links[f.replace(/\.mdx$/, '')])
      .map((error) => f + ': ' + error));
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  console.log('content ok');
}
