// Single source of truth for site-wide values. `{{LIKE_THIS}}` strings are placeholders:
// a production build (`npm run build`) fails while any remain in the output.
export const config = {
  name: 'Tristan Morton',
  tagline: 'CIS @ James Madison University',
  description:
    'Tristan Morton: CIS student at James Madison University and aspiring software engineer building data and engineering projects.',
  email: '{{EMAIL}}',
  linkedin: '{{LINKEDIN_URL}}',
  github: 'https://github.com/trism-dev',
  siteRepo: 'https://github.com/trism-dev/portfolio-site',
  // Swap for the custom domain once bought; used for canonical URLs, sitemap and OG.
  siteUrl: 'https://portfolio-site.vercel.app',
  // Tripwire's repo is private. Flip to true only after the secrets scan.
  TRIPWIRE_REPO_PUBLIC: false,
  // Demo/video URLs per project slug (one line each: scripts/check-content.mjs reads this).
  // Empty or placeholder values hide the button.
  links: {
    'heart-disease': { demoUrl: '{{HEART_DEMO_URL}}', videoUrl: '' },
    tripwire: { demoUrl: '', videoUrl: '{{TRIPWIRE_VIDEO_URL}}' },
  },
} as const;
