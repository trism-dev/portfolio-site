// Single source of truth for site-wide values. `{{LIKE_THIS}}` strings are placeholders:
// a production build (`npm run build`) fails while any remain in the output.
export const config = {
  name: 'Tristan Morton',
  tagline: 'CIS @ James Madison University',
  description:
    'Tristan Morton: CIS student at James Madison University and aspiring software engineer building data and engineering projects.',
  email: 'tristanjmorton@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tristan-morton',
  github: 'https://github.com/trism-dev',
  siteRepo: 'https://github.com/trism-dev/portfolio-site',
  siteRepoPublic: true,
  // Swap for the custom domain once bought; used for canonical URLs, sitemap and OG.
  siteUrl: 'https://portfolio-site-trism2.vercel.app',
  // Demo/video URLs per project slug.
  // Empty or placeholder values hide the button.
  links: {
    'heart-disease': { demoUrl: 'https://heart-disease-prediction-alpha.vercel.app/', videoUrl: '' },
  },
} as const;
