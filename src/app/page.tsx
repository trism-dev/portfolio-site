import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { config } from '@/config';
import { getAbout, getExperience, getProjects } from '@/lib/content';

const title = 'mb-8 text-xs font-bold uppercase tracking-[0.15em] text-head';
const when = 'pt-1 font-mono text-xs uppercase tracking-wide text-fg';
const chip = 'rounded-full bg-chip px-3 py-1 text-xs font-medium leading-5 text-chip-fg';

function Technologies({ stack }: { stack: string[] }) {
  return <ul aria-label="Technologies used" className="mt-4 flex flex-wrap gap-2">{stack.map((technology) => <li key={technology} className={chip}>{technology}</li>)}</ul>;
}

export default function Home() {
  const projects = getProjects().filter((p) => p.data.featured);
  return (
    <>
      <section id="about" className="mb-24 scroll-mt-16">
        <h2 className={title}>About</h2>
        <div className="md"><MDXRemote source={getAbout()} /></div>
      </section>
      <section id="experience" className="mb-24 scroll-mt-16">
        <h2 className={title}>Experience</h2>
        <ol className="grid gap-8">
          {getExperience().map(({ slug, data, body }) => (
            <li key={slug} tabIndex={0} className="portfolio-row grid gap-3 sm:grid-cols-[7rem_1fr] sm:gap-5">
              <p className={when}>{data.when}</p>
              <div className="min-w-0">
                <h3 className="entry-title font-semibold leading-snug text-head">{data.title} <span className="font-normal">· {data.org}</span></h3>
                <div className="md mt-3 text-sm"><MDXRemote source={body} /></div>
                <Technologies stack={data.stack} />
                {slug === 'formwork' && <a href="https://formworkgroup.co/" target="_blank" rel="noopener noreferrer" aria-label="Formwork website (opens in a new tab)" className="mt-5 inline-flex min-h-11 max-w-full items-center gap-3 rounded-md border border-line bg-[#fff8f2] px-4 py-3 text-[#101010] hover:border-accent hover:bg-white"><Image src="/formwork-logo.svg" alt="Formwork" width={273} height={33} className="h-auto w-36 max-w-full" /><span aria-hidden="true">↗</span></a>}
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section id="projects" className="mb-20 scroll-mt-16">
        <h2 className={title}>Projects</h2>
        <ol className="grid gap-8">
          {projects.map(({ slug, data }) => (
            <li key={slug} tabIndex={data.kind === 'summary' && !data.repoUrl && !(slug === 'portfolio' && config.siteRepoPublic) ? 0 : undefined} className="portfolio-row grid gap-3 sm:grid-cols-[7rem_1fr] sm:gap-5">
              <p className={when}>{data.dates}</p>
              <div className="min-w-0">
                <h3 className="entry-title font-semibold leading-snug text-head">
                  {data.kind === 'case-study' ? <a href={config.links[slug as keyof typeof config.links]?.demoUrl} target="_blank" rel="noopener noreferrer">{data.title} <span aria-hidden="true">↗</span></a> : data.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed">{data.summary}</p>
                {data.kind === 'case-study' && <p className="mt-3 text-sm"><strong className="font-semibold text-head">{data.heroMetric.value}</strong> {data.heroMetric.label}</p>}
                <Technologies stack={data.stack} />
                <div className="mt-3 flex flex-wrap gap-x-6 text-sm font-medium">
                  {data.kind === 'case-study' && <a href={config.links[slug as keyof typeof config.links]?.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-head hover:text-accent">Open live app <span aria-hidden="true" className="ml-2">↗</span></a>}
                  {(slug === 'portfolio' ? config.siteRepoPublic : data.repoUrl) && <a href={slug === 'portfolio' ? config.siteRepo : data.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-head hover:text-accent">GitHub <span aria-hidden="true" className="ml-2">↗</span><span className="sr-only">: {data.title}</span></a>}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <footer className="pb-12 text-xs leading-relaxed">
        <p>Built with Next.js and Tailwind CSS.{config.siteRepoPublic && <> <a href={config.siteRepo} className="font-medium text-head hover:text-accent">Source</a>.</>} Last updated {new Date().toISOString().slice(0, 10)}.</p>
      </footer>
    </>
  );
}
