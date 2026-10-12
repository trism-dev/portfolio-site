import { ImageResponse } from 'next/og';
import { config } from '@/config';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${config.name}: ${config.tagline}`;

// Name + tagline only, no stock art. Uses the built-in OG font.
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 96, background: '#0f172a', color: '#e2e8f0' }}>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>{config.name}</div>
        <div style={{ fontSize: 40, marginTop: 24, color: '#5eead4' }}>{config.tagline}</div>
        <div style={{ fontSize: 28, marginTop: 40, color: '#94a3b8' }}>Aspiring software engineer · data and engineering projects</div>
      </div>
    ),
    size,
  );
}
