# Portfolio handoff

## Current site

Next.js static export, React, TypeScript, Tailwind CSS, and MDX. Three homepage sections: About, Experience, Projects. About paragraphs unchanged. Only Formwork appears in Experience; ongoing Sept 2026 — Present, 100+ QA tickets, UI/frontend improvements, search filtering and migration analysis. Tristan approved the current public Formwork/Matter wording.

Heart Disease links directly to https://heart-disease-prediction-project-01.streamlit.app/ with an Open live app button and separate GitHub link. No homepage status label. The six-section case-study route remains available; What I'd do next remains removed. Portfolio Website is a summary-only entry; its GitHub button and footer source link use config.siteRepoPublic.

Dark teal/gray default theme, optional light theme, and a subtle cursor-following radial light. Light ignores clicks and is disabled for touch/reduced motion. At >=640px only main scrolls; identity/nav/contact panel stays stationary. Section navigation observes the content container. Mobile uses normal document scrolling.

## Content architecture

Projects use src/lib/project-schema.ts: kind is case-study or summary. Summary entries require common title/dates/order/featured/summary/stack fields, optional public repoUrl, and produce no detail route or sitemap entry. Case studies also require detailed fields, six headings and status-based demo validation. Experience supports stack and published; Recreation/Education are excluded from the website but remain in repository source. Skills section removed. Tripwire excluded; source projects untouched.

## Publication and deferred launch inputs

Tristan authorized committing/pushing changes and making this repository public. Public email and LinkedIn are configured. Resume and production hosting URL explicitly deferred. No website deployment is authorized in this step. Resume icon stays disabled until public/resume.pdf exists. siteUrl is provisional and must be confirmed before deployment. No rewriting of Git history.

## Verification

Typecheck/lint, content validation, four tests and builds have passed during development. Final pre-publication checks are recorded in the chat. Earlier mobile Lighthouse on a gzip-compressed static preview scored home 97 performance and Heart 96, with 100 accessibility/best-practices/SEO on both; later layout/palette/cursor changes have not been re-audited. Responsive/browser checks verified separate desktop scrolling, section links and mobile overflow. Review hosted behavior after deployment.
