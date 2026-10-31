import test from 'node:test';
import assert from 'node:assert/strict';
import { safeTabTitle } from '../src/domain/toolkit/safe-tab-title.ts';

test('feat: normalize untrusted tab titles', () => {
  assert.equal(safeTabTitle('  Space   News\nToday '), 'Space News Today');
  assert.equal(safeTabTitle(null), 'Untitled tab');
  assert.ok(safeTabTitle('x'.repeat(200), 24).length <= 24);
});
