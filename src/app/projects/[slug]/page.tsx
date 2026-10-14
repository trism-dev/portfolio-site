import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Diagram } from '@/components/Diagram';
import { config } from '@/config';
import { getCaseStudies } from '@/lib/content';
import { projectSections } from '@/lib/project-sections';

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

async function find({ params }: Props) {
  const { slug } = await params;
  return getCaseStudies().find((p) => p.slug === slug);
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const p = await find(props);
  return p?.data.kind === 'case-study' ? { title: p.data.title, description: p.data.tagline,
    alternates: { canonical: `/projects/${p.slug}/` },
    openGraph: { title: p.data.title, description: p.data.tagline, url: `/projects/${p.slug}/` },
  } : {};
}

const badge = { live: 'Live', 'demo-video': 'Video walkthrough', 'in-progress': 'In progress', archived: 'Archived' } as const;
const chip = 'rounded-full bg-chip px-3 py-1 text-xs font-medium text-chip-fg';

// A missing or still-placeholder URL hides the button instead of showing a dead link.
const usable = (u?: string) => (u && !u.includes('{{') ? u : undefined);

export default async function Project(props: Props) {
  const p = await find(props);
  if (!p || p.data.kind !== 'case-study') notFound();
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
      <div className="mt-8 rounded-lg border border-line p-5 text-sm leading-relaxed">
        <p>{data.summary}</p>
        <p className="mt-4 text-head"><strong>{data.heroMetric.value}</strong> {data.heroMetric.label}.</p>
        <p className="mt-4">{data.limitation}</p>
      </div>
      <nav aria-label="Case study sections" className="mt-8 border-b border-line pb-5">
        <p className="text-xs font-bold uppercase tracking-widest text-head">In this case study</p>
        <ul className="mt-2 flex flex-wrap gap-x-5">
          {projectSections.map(([id, label]) => (
            <li key={id}><a href={'#' + id} className="inline-flex min-h-11 items-center text-sm hover:text-accent">{label}</a></li>
          ))}
        </ul>
      </nav>
      <div className="md mt-8">
        <MDXRemote
          source={p.body}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          components={{
            Diagram: () => <Diagram file={data.architectureDiagram} alt={data.diagramAlt} />,
            h2: ({ children }) => <h2 id={projectSections.find(([, label]) => label === children)?.[0]}>{children}</h2>,
            table: ({ children }) => <table tabIndex={0} aria-label="Evaluation results">{children}</table>,
          }}
        />
      </div>
    </article>
  );
}
