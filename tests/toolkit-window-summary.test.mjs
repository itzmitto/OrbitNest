import test from 'node:test';
import assert from 'node:assert/strict';
import { windowSummary } from '../src/domain/toolkit/window-summary.ts';

test('feat: calculate per-window tab metrics', () => {
  const result = windowSummary([{windowId:2,active:true,pinned:false},{windowId:2,active:false,pinned:true},{windowId:1,active:true,pinned:false}]);
  assert.deepEqual(result.map(x => x.total), [1,2]);
  assert.equal(result[1].pinned, 1);
});
