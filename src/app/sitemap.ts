import type { MetadataRoute } from 'next';
import { config } from '@/config';
import { getCaseStudies } from '@/lib/content';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...getCaseStudies().map((p) => `/projects/${p.slug}/`)];
  return paths.map((p) => ({ url: new URL(p, config.siteUrl).href }));
}
