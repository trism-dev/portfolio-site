// Fails CI if a project page is missing a required section or a demo/video rule is broken.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/content/projects';
const required = ['Problem', 'What I built', 'Architecture', 'Key decisions', 'Results', "What didn't work", "What I'd do next"];
const cfg = readFileSync('src/config.ts', 'utf8').split('\n');
const errors = [];

for (const f of readdirSync(dir).filter((f) => f.endsWith('.mdx'))) {
  const src = readFileSync(join(dir, f), 'utf8');
  const heads = [...src.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  for (const r of required) if (!heads.includes(r)) errors.push(`${f}: missing "## ${r}"`);
  const status = src.match(/^status:\s*(\S+)/m)?.[1];
  const slug = f.replace(/\.mdx$/, '');
  // Each project's links sit on one line of src/config.ts, e.g. `tripwire: { demoUrl: '', videoUrl: '...' },`
  const line = cfg.find((l) => new RegExp(`^\\s*'?${slug}'?:`).test(l)) ?? '';
  const hasLink = /(demoUrl|videoUrl):\s*'[^']+'/.test(line);
  if (!hasLink && status !== 'in-progress') errors.push(`${f}: needs demoUrl or videoUrl in src/config.ts unless status is in-progress`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('content ok');
