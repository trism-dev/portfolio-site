# Tristan Morton: portfolio

An employer-facing portfolio with About, Experience, and Projects. Built with Next.js static export, React, TypeScript and Tailwind CSS. Node.js runs development/build tooling; published pages need no Node server.

## Development

- npm install
- npm run dev (use the URL printed by Next.js)
- npm run check: typecheck and lint
- npm run check:content: project schemas, headings and demo rules
- npm test
- npm run build:dev: static export with placeholder warnings
- npm run build: strict release build, rejects placeholders

## Content

About: src/content/about.mdx, preserved verbatim. Experience: MDX entries require title, org, when, order, plus a stack list; published: false excludes an entry. Only Formwork is published; Recreation and Education are excluded from the website but remain visible in repository source.

Project frontmatter is defined in src/lib/project-schema.ts. Every entry needs kind, title, dates, order, featured, summary and stack; repoUrl is optional and must only be supplied for public repositories. kind: summary renders a homepage entry only, without metric, diagram, status, demo or detail route. kind: case-study additionally requires tagline, limitation, status, heroMetric, architectureDiagram and diagramAlt, and the six headings Problem, What I built, Architecture, Key decisions, Results, What didn't work. Only case studies generate routes and sitemap entries.

Heart Disease is first, with an Open live app button linking to its hosted Streamlit application and a separate GitHub link. The existing case-study route is retained. Portfolio Website is a summary-only entry, with no private repo URL. Site-wide values and project demo links live in src/config.ts. siteRepoPublic enables the portfolio GitHub button and footer source link. Technology tags replace the former Skills section.

## Before launch

Public contact details are configured and Tristan approved the Formwork/Matter wording. The supplied resume is served at public/resume.pdf, and the production URL is https://portfolio-site-trism2.vercel.app. Replace public/resume.pdf to update the downloadable resume. Pending contact icons are disabled but retain placeholder markers for the strict guard. Recreation title/dates are no longer launch inputs. The Heart demo is hosted separately on Streamlit. Repository publication and website deployment are separate steps.

The default palette is dark teal/gray with an optional light theme. At widths of 640px and above, the identity panel stays stationary and the content panel scrolls independently. Cursor lighting is decorative, ignores pointer interactions, and is disabled for touch and reduced-motion preferences.
