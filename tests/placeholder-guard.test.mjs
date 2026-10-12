import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { expect, test } from 'vitest';
import { findPlaceholders } from '../scripts/placeholder-guard.mjs';

test('flags leftover placeholders and passes clean output', () => {
  const dir = mkdtempSync(join(tmpdir(), 'guard-'));
  try {
    writeFileSync(join(dir, 'index.html'), '<a href="mailto:{{EMAIL}}">hi</a>');
    expect(findPlaceholders(dir).map((h) => h.token)).toEqual(['{{EMAIL}}']);
    writeFileSync(join(dir, 'index.html'), '<a href="mailto:a@b.co">hi</a>');
    expect(findPlaceholders(dir)).toEqual([]);
  } finally {
    rmSync(dir, { recursive: true });
  }
});
