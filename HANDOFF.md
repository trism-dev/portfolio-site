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

Production URL supplied by Tristan: https://portfolio-site-trism2.vercel.app/. Configured for canonicals/sitemap. Unauthenticated requests currently redirect to Vercel login; deployment protection must allow public production access. Resume remains deferred.

Resume added: public/resume.pdf, exported from the user-supplied SWE DOCX with Word and visually checked on both pages. Original DOCX unchanged and not added to the repo. Theme toggle displays moon for dark and sun for light. Cursor gradient brightens dark mode and darkens light mode; touch/reduced-motion exclusions remain.

Heart Disease Vercel migration: portfolio live-app link now points to https://heart-disease-prediction-alpha.vercel.app/. The app source is pushed to trism-dev/heart-disease-prediction, deploying vercel_app through the connected Vercel project. Medical blue/white UI, no cursor effect. Hosted parity checks passed for three examples and unknown ca/thal; invalid inputs rejected. 37 pytest tests collected; 34 non-DB tests pass. Original Streamlit app remains available.
