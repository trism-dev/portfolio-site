import { expect, test } from 'vitest';
import { readFileSync } from 'node:fs';
import { validateProject } from '../scripts/check-content.mjs';

const heart = readFileSync(new URL('../src/content/projects/heart-disease.mdx', import.meta.url), 'utf8');
const project = (status) => heart.replace(/^status:.*$/m, 'status: ' + status);

test('in-progress needs no demo; live requires a real web demo URL', () => {
  expect(validateProject(project('in-progress'))).toEqual([]);
  for (const demoUrl of ['', '{{HEART_DEMO_URL}}', 'invalid', 'javascript:alert(1)']) {
    expect(validateProject(project('live'), { demoUrl })).toContain('live status requires a usable demoUrl');
  }
  expect(validateProject(project('live'), { videoUrl: 'https://example.com/video' })).not.toEqual([]);
  expect(validateProject(project('live'), { demoUrl: 'https://example.com/demo' })).toEqual([]);
});

test('summary projects need no case study, metric, diagram, or demo; core fields are required', () => {
  const summary = readFileSync(new URL('../src/content/projects/portfolio.mdx', import.meta.url), 'utf8');
  expect(validateProject(summary)).toEqual([]);
  expect(validateProject(summary.replace(/^summary:.*$/m, ''))).not.toEqual([]);
  expect(validateProject(summary.replace('kind: summary', 'kind: unknown'))).not.toEqual([]);
});

test('video needs a usable URL and all six headings remain mandatory', () => {
  expect(validateProject(project('demo-video'), { videoUrl: '{{VIDEO_URL}}' })).not.toEqual([]);
  expect(validateProject(project('demo-video'), { videoUrl: 'https://example.com/video' })).toEqual([]);
  expect(validateProject(project('in-progress').replace('## Results', ''))).toContain('missing "## Results"');
});
