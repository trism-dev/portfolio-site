import { MDXRemote } from 'next-mdx-remote/rsc';
import { config } from '@/config';
import { getAbout, getExperience, getProjects } from '@/lib/content';
import { skills } from '@/skills';

const badge = { live: 'Live', 'demo-video': 'Video walkthrough', 'in-progress': 'In progress', archived: 'Archived' } as const;
const title = 'mb-6 text-xs font-bold uppercase tracking-[0.15em] text-head';
const when = 'font-mono mt-1 text-xs uppercase tracking-wide';
const chip = 'rounded-full bg-chip px-3 py-1 text-xs font-medium text-chip-fg';

export default function Home() {
  const projects = getProjects().filter((p) => p.data.featured);
  const experience = getExperience();

  return (
    <>
      <section id="about" className="mb-24 scroll-mt-16">
        <h2 className={title}>About</h2>
        <div className="md">
          <MDXRemote source={getAbout()} />
        </div>
      </section>

      <section id="experience" className="mb-24 scroll-mt-16">
        <h2 className={title}>Experience</h2>
        <ol className="group/list grid gap-10">
          {experience.map(({ slug, data, body }) => (
            <li key={slug} className="grid gap-2 transition-opacity sm:grid-cols-[8.5rem_1fr] sm:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              <p className={when}>{data.when}</p>
              <div>
                <h3 className="font-medium leading-snug text-head">
                  {data.title} · <span className="font-normal text-fg">{data.org}</span>
                </h3>
                <div className="md mt-3 text-sm">
                  <MDXRemote source={body} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="projects" className="mb-24 scroll-mt-16">
        <h2 className={title}>Projects</h2>
        <ol className="group/list grid gap-10">
          {projects.map(({ slug, data }) => (
            <li key={slug} className="grid gap-2 transition-opacity sm:grid-cols-[8.5rem_1fr] sm:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              <p className={when}>{data.dates}</p>
              <div>
                <h3 className="font-medium leading-snug text-head">
                  <a href={`/projects/${slug}/`} className="hover:text-accent">{data.title}</a>{' '}
                  <span className={`font-mono align-middle text-[0.65rem] ${chip}`}>{badge[data.status]}</span>
                </h3>
                <p className="mt-2 text-sm">{data.tagline}</p>
                <p className="mt-2 text-sm">
                  <strong className="font-semibold text-head">{data.heroMetric.value}</strong> {data.heroMetric.label}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {data.stack.map((s) => <li key={s} className={chip}>{s}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="skills" className="mb-24 scroll-mt-16">
        <h2 className={title}>Skills and where I used them</h2>
        <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-[13rem_1fr]">
          {skills.map(({ skill, evidence }) => (
            <div key={skill} className="contents">
              <dt className="mt-3 font-medium text-head sm:mt-0">{skill}</dt>
              <dd>
                {evidence.map((e, i) => (
                  <span key={e.label}>
                    {i > 0 && ', '}
                    <a href={e.to.startsWith('#') ? `/${e.to}` : `/projects/${e.to}/`} className="border-b border-line hover:border-accent hover:text-accent">
                      {e.label}
                    </a>
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <footer className="pb-12 text-xs">
        <p>
          Built with Next.js and Tailwind CSS, deployed on Vercel via GitHub.{' '}
          <a href={config.siteRepo} className="font-medium text-head hover:text-accent">Source</a>. Last updated{' '}
          {new Date().toISOString().slice(0, 10)}.
        </p>
      </footer>
    </>
  );
}
