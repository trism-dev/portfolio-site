import { readdirSync, readFileSync, statSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';

const PLACEHOLDER = /\{\{[A-Z0-9_]+\}\}/g;
const TEXT = /\.(html|xml|txt|json|svg|css|js|webmanifest)$/;

/** Returns [{file, token}] for every `{{PLACEHOLDER}}` found under `dir`. */
export function findPlaceholders(dir) {
  const hits = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) hits.push(...findPlaceholders(p));
    else if (TEXT.test(name))
      for (const m of readFileSync(p, 'utf8').matchAll(PLACEHOLDER)) hits.push({ file: p, token: m[0] });
  }
  return hits;
}

// Run after `next build`. `--dev` downgrades the failure to a warning (used by CI and local builds).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const hits = findPlaceholders('out');
  if (hits.length) {
    const msg = `Placeholders remain in build output: ${[...new Set(hits.map((h) => h.token))].join(', ')}`;
    if (process.argv.includes('--dev')) console.warn(`WARN ${msg}`);
    else {
      console.error(`ERROR ${msg}`);
      process.exit(1);
    }
  }
}
