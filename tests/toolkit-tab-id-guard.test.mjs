import test from 'node:test';
import assert from 'node:assert/strict';
import { safeTabId } from '../src/domain/toolkit/tab-id-guard.ts';

test('feat: reject malformed browser tab identifiers', () => {
  assert.equal(safeTabId(42),42);
  assert.equal(safeTabId('42'),null);
  assert.equal(safeTabId(-1),null);
  assert.equal(safeTabId(NaN),null);
});
