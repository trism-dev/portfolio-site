# Handoff: Tristan Morton portfolio site (for Codex)

Written 2026-10-13. Repo: `C:\Dev\Projects\portfolio-site` → `github.com/trism-dev/portfolio-site` (**private**). Branch `main`, working tree clean, 2 commits (`fad18da` initial, `548abd8` Heart Disease case study). Not yet deployed.

## Goal
A **permanent, evergreen** personal portfolio for Tristan (senior CIS student at JMU, aspiring software engineer) that he adds to over time. Not an internship campaign: no "seeking internships", no location, no "open to relocation". Original spec: `C:\Users\trist\Downloads\PRD_1.md` (still authoritative for case-study content and honesty rules; the user's later decisions override it where they conflict). Longer plan: `C:\Users\trist\.claude\plans\c-users-trist-downloads-prd-1-md-plan-h-sequential-sprout.md` (Revisions 2 and 3 are current; the older Astro sections are obsolete).

## Decisions already made (do not re-litigate)
- **Stack:** Next.js 16 App Router (`output: 'export'`, `trailingSlash`, `images.unoptimized`), React 19, TypeScript, Tailwind v4, Inter + JetBrains Mono via `next/font`. Deployed on Vercel Hobby. Chosen because the design reference is built that way.
- **Design:** modeled on brittanychiang.com: two-column, sticky left sidebar (name, "CIS @ James Madison University", section nav, icon links, theme toggle), slate/teal, light + dark.
- **Everything free:** Vercel Hobby, GitHub free, Streamlit Community Cloud for the Heart demo, lychee for link check. **Tripwire is not deployed**; it ships as a demo video (unlisted YouTube), status `demo-video`.
- **Left column / links:** icons only (Resume `/resume.pdf`, GitHub, LinkedIn, Email) with `aria-label` + `title`, 44px targets.
- **About:** user's verbatim 3 paragraphs in `src/content/about.mdx`, naming Matter, with a `TODO: confirm with supervisor` comment above the Formwork paragraph. Formwork title is "Software Engineering & AI Systems Intern".
- **Vercel:** the user imports the repo via the Vercel dashboard (no CLI installed). Repo goes public later (`gh repo edit trism-dev/portfolio-site --visibility public --accept-visibility-change-consequences`); that also fixes the lychee failure on the footer source link.

## Architecture (what exists)
- **Content layer:** `src/lib/content.ts` (gray-matter + zod + next-mdx-remote/rsc + remark-gfm). Collections: `src/content/about.mdx`, `experience/*.mdx` (formwork, jmu-rec, education), `projects/*.mdx` (heart-disease, tripwire). Adding a project = one `.mdx` + one line in `src/config.ts`.
- **Project schema:** title, tagline, status (`live|demo-video|in-progress|archived`), dates (string), order, featured (default true), stack[], repoUrl?, heroMetric{value,label}, architectureDiagram (file in `src/diagrams`), diagramAlt.
- **Site config:** `src/config.ts` (name, tagline, description, email, linkedin, github, siteRepo, siteUrl `https://portfolio-site.vercel.app`, `TRIPWIRE_REPO_PUBLIC: false`, per-project `links` with demoUrl/videoUrl on **one line per slug**, which `check-content` parses).
- **Pages:** `src/app/page.tsx` (About, Experience, Projects, Skills-to-evidence from `src/skills.ts`, footer), `src/app/projects/[slug]/page.tsx` (status badge, "Open live demo" only if `usable(demoUrl)`, "Source on GitHub" if `repoUrl`, MDX body with a `<Diagram />` component), `layout.tsx`, `sitemap.ts`, `robots.ts`, OG image.
- **Components:** `Icon`, `ThemeToggle` (client), `ActiveNav` (client, IntersectionObserver, highlights only on `/`), `Diagram` (inlines `src/diagrams/*.svg`; `min-w-[440px]` inside `overflow-x-auto` figure; `role="img"` + aria-label).
- **Diagrams:** hand-written SVG using CSS variables (`--bg --line --accent --head --fg`) so they follow the theme. Template to copy: `src/diagrams/heart-disease.svg` (560x290, 3 boxes top row, arrow down, 3 boxes bottom row right-to-left, dashed pytest bar). Marker ids must be unique per file (`hd-arrow` used; use e.g. `tw-arrow`).
- **Styles:** `src/app/globals.css` with tokens and `.md` markdown styles (incl. tables).
- **Guards:**
  - `npm run build` = `next build && node scripts/placeholder-guard.mjs`. It **fails if any `{{PLACEHOLDER}}` remains in `out/`**. `npm run build:dev` only warns. Vitest test: `tests/placeholder-guard.test.mjs`.
  - `scripts/check-content.mjs` requires 7 `##` headings in every project (Problem, What I built, Architecture, Key decisions, Results, What didn't work, What I'd do next), and a demo/video link in `config.ts` unless status is `in-progress`.
  - MDX gotcha: write literal placeholders as `\{\{TODO\}\}` or MDX evaluates them as JS.
- **CI:** `.github/workflows/ci.yml`: `npm run check` (tsc + eslint), `check:content`, vitest, `build:dev`, two lychee steps over `./out/**/*.html`.

## Status
Done and pushed: scaffold, guards, CI file, layout/theme, About/Experience/Projects/Skills sections, Heart Disease case study + diagram + page template.

Last verified: `tsc` OK, `check:content` OK, eslint 0 errors (1 anonymous-default-export warning in `eslint.config.mjs`), `build:dev` succeeds with placeholder warning.

**Not verified yet:** strict `npm run build` on Next, vitest after the latest changes, GitHub Actions run, light theme, 375px and 320px layout (no horizontal page scroll), JS-disabled rendering, Lighthouse ≥95 mobile on home + one case study.

## Remaining work, in order
1. **Tripwire case study** (`src/content/projects/tripwire.mdx` is a stub with `\{\{TODO\}\}` sections; status `demo-video`, heroMetric 61% precision). Write all 7 sections and `src/diagrams/tripwire.svg`; set `architectureDiagram` and `diagramAlt` in frontmatter.
   - **Source to verify against** (read, don't modify): `C:\Dev\Projects\Tripwire Awareness Dashboard\docs\` → `evaluation.md`, `decisions.md`, `architecture.png`, `ingest_flow.png`, `data_notes.md`, `gdelt_schema.md`, `mission_case.md`, `demo_script.md`, `resume_bullet.md`, `diagrams/`.
   - **Facts (from PRD §4; confirm in evaluation.md):** GDELT 15-minute feed, ~800,000 events; median/MAD robust z-score baselines → alerts; **61% precision on 50 hand-audited alerts (30 true / 19 false / 1 unclear), 95% CI 47–74%**; credibility model trained on 312 labels (206 train / 106 test), **ROC-AUC 0.676 (CI 0.565–0.771) and it did not beat the always-credible baseline on F1**; three tuning fixes tried and rejected on a 20-alert held-out set; 158 tests; Streamlit UI; Postgres. GDELT attribution is required on the page. Not deployed.
2. **VideoFacade** (client component, click-to-load YouTube, `<noscript>` plain link, no player lib) and render it on the project page when `videoUrl` is usable.
3. **Tripwire repo link gating:** show "Source on GitHub" for Tripwire only when `TRIPWIRE_REPO_PUBLIC` is true (repo is private; the URL must not appear in output while false). Currently the template shows the button whenever `repoUrl` is set, so either omit `repoUrl` in the mdx or add the gate in the template.
4. **`public/resume.pdf`** placeholder/real file, 404 page check, OG image copy (no internship framing), SEO/canonicals.
5. **Verification pass:** items under "Not verified yet"; grep rendered HTML for every PRD §4 number; grep for banned words ("deployed" as a claim, "production-grade", "passionate", superlatives).
6. **After V1:** `/now` and writing collections (cheap given the collections; keeps a permanent site fresh). Custom domain optional.

## Honesty rules (PRD §8, non-negotiable)
Only verified numbers. Always report confidence intervals. No "deployed" or "production-grade" claims for undeployed work. Plain first-person copy, no superlatives, no template tropes. If a number isn't in the PRD or the project's own committed docs, don't use it. Formwork: no product screens or internal details; Matter is named per the user's choice.

## Open inputs needed from Tristan (placeholders that block a strict build)
- `{{EMAIL}}`, `{{LINKEDIN_URL}}` (`src/config.ts`)
- `{{JMU_REC_TITLE}}`, `{{JMU_REC_DATES}}` (`src/content/experience/jmu-rec.mdx`)
- `{{HEART_DEMO_URL}}` (needs the Streamlit app deployed free; until then Heart stays `in-progress`), `{{TRIPWIRE_VIDEO_URL}}` (demo video not recorded yet)
- `public/resume.pdf` (the real file)
- Supervisor sign-off on Formwork/Matter wording (TODO comment in `about.mdx`)
- Optional: custom domain

## Things Tristan should be told / has been told
- Heart page says **22 tests** (verified by pytest collection in the Heart repo), PRD says 15. Awaiting confirmation.
- Heart page uses extra verified numbers from the Heart repo's own reports (external-site recall 0.70 pooled, women's recall 0.78 vs men 0.93, repeated-CV 0.705±0.023). Not in PRD §4; he can ask to cut them.
- About's "component library" and "Full-Stack development platform" aren't in PRD facts; kept because they are his own wording.
- Section nav is hidden below 1024px (mobile has no nav).
- Strict build will keep failing until every placeholder is filled; this is intentional.

## Source projects (read-only references)
- Heart: `C:\Dev\Projects\Heart Disease Prediction System` (public repo `github.com/trism-dev/heart-disease-prediction`): README.md, reports/model_comparison.md, reports/external_validation.md, models/metadata.json.
- Tripwire: `C:\Dev\Projects\Tripwire Awareness Dashboard` (private repo `tripwire-awareness-dashboard`).

## Working conventions
- Windows, Git Bash/PowerShell. Node 24 / npm 11. `gh` authed as `trism-dev`. Heredocs for file content were flaky in Bash; prefer writing files directly.
- Run before committing: `npm run check && npm run check:content && npx vitest run && npm run build:dev`.
- Dev server: `npm run dev`. CRLF warnings on commit are harmless.
- Don't push to a public repo or publish anything externally without the user's go-ahead.
