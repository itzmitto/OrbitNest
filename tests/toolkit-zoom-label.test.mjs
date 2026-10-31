import test from 'node:test';
import assert from 'node:assert/strict';
import { zoomLabel } from '../src/domain/toolkit/zoom-label.ts';

test('feat: format accessible camera zoom percentages', () => {
  assert.equal(zoomLabel(1.25),'125%');
  assert.equal(zoomLabel(Infinity),'100%');
  assert.equal(zoomLabel(99),'800%');
});
