import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
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

export default async function Project(props: Props) {
  const p = await find(props);
  if (!p) notFound();
  return (
    <article>
      <p className="mb-8 text-sm"><Link href="/#projects" className="font-medium text-head hover:text-accent">&larr; All projects</Link></p>
      <h2 className="text-3xl font-bold tracking-tight text-head">{p.data.title}</h2>
      <p className="mt-2">{p.data.tagline}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {p.data.stack.map((s) => (
          <li key={s} className="rounded-full bg-chip px-3 py-1 text-xs font-medium text-chip-fg">{s}</li>
        ))}
      </ul>
      <div className="md mt-8">
        <MDXRemote source={p.body} />
      </div>
    </article>
  );
}
