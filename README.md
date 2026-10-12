# Tristan Morton: portfolio

Personal portfolio, built with Next.js (static export) and Tailwind CSS, deployed on Vercel from GitHub. I chose Next.js because it is the stack most SWE teams use; pages are pre-rendered static HTML, with client JS only for the theme toggle and section highlighting.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run check      # typecheck + lint
npm run check:content
npm test
npm run build:dev  # build, warn on leftover placeholders
npm run build      # production build: fails while any {{PLACEHOLDER}} remains
```

## Editing the site

- **About:** `src/content/about.mdx`
- **Add a job:** new file in `src/content/experience/` (frontmatter: `title`, `org`, `when`, `order`). Append bullets as Markdown.
- **Add a project:** new `.mdx` in `src/content/projects/` with the frontmatter in `src/lib/content.ts` and the required `##` sections (checked by `npm run check:content`); add its demo/video link on one line in `src/config.ts`.
- **Resume:** replace `public/resume.pdf` (keep the filename; links stay stable).
- **Site-wide values** (email, LinkedIn, domain, `TRIPWIRE_REPO_PUBLIC`): `src/config.ts`.
- **Placeholders** look like `{{EMAIL}}` and live in `src/config.ts` and `src/content/`. The production build fails until none are left.
