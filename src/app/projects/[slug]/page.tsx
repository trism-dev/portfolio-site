import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Diagram } from '@/components/Diagram';
import { config } from '@/config';
import { getProjects } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

async function find({ params }: Props) {
  const { slug } = await params;
  return getProjects().find((p) => p.slug === slug);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const p = await find(props);
  return p ? { title: p.data.title, description: p.data.tagline } : {};
}

const badge = { live: 'Live', 'demo-video': 'Video walkthrough', 'in-progress': 'In progress', archived: 'Archived' } as const;
const chip = 'rounded-full bg-chip px-3 py-1 text-xs font-medium text-chip-fg';

// A missing or still-placeholder URL hides the button instead of showing a dead link.
const usable = (u?: string) => (u && !u.includes('{{') ? u : undefined);

export default async function Project(props: Props) {
  const p = await find(props);
  if (!p) notFound();
  const { data, slug } = p;
  const urls = config.links[slug as keyof typeof config.links];
  const demoUrl = usable(urls?.demoUrl);
  const repoUrl = data.repoUrl;

  return (
    <article>
      <p className="mb-8 text-sm">
        <Link href="/#projects" className="font-medium text-head hover:text-accent">&larr; All projects</Link>
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-head">{data.title}</h2>
      <p className="mt-2">{data.tagline}</p>
      <p className="mt-4 flex flex-wrap items-center gap-3 text-sm">
        <span className={`font-mono text-[0.65rem] ${chip}`}>{badge[data.status]}</span>
        <span className="font-mono text-xs">{data.dates}</span>
      </p>
      {(demoUrl || repoUrl) && (
        <p className="mt-5 flex flex-wrap gap-3 text-sm font-medium">
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="rounded bg-accent px-4 py-2 text-accent-fg hover:opacity-90">
              Open live demo
            </a>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="rounded border border-line px-4 py-2 text-head hover:border-accent hover:text-accent">
              Source on GitHub
            </a>
          )}
        </p>
      )}
      <ul className="mt-5 flex flex-wrap gap-2">
        {data.stack.map((s) => <li key={s} className={chip}>{s}</li>)}
      </ul>
      <div className="md mt-8">
        <MDXRemote
          source={p.body}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={{ Diagram: () => <Diagram file={data.architectureDiagram} alt={data.diagramAlt} /> }}
        />
      </div>
    </article>
  );
}
