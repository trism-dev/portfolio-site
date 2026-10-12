import type { NextConfig } from 'next';

// Pure static export: no server runtime (PRD constraint).
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default config;
