import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Hand-written SVGs in src/diagrams use CSS variables, so they follow the light/dark theme.
// The container scrolls sideways so the page itself never does on narrow screens.
export function Diagram({ file, alt }: { file: string; alt: string }) {
  const svg = readFileSync(join(process.cwd(), 'src', 'diagrams', file), 'utf8');
  return (
    <figure tabIndex={0} className="my-6 overflow-x-auto rounded-md border border-line p-4" role="img" aria-label={alt}>
      <div className="min-w-[440px]" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
    </figure>
  );
}
