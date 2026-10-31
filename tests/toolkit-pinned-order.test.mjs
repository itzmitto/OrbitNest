import test from 'node:test';
import assert from 'node:assert/strict';
import { pinnedFirst } from '../src/domain/toolkit/pinned-order.ts';

test('feat: prioritize pinned tabs without mutating input', () => {
  const input=[{pinned:false,index:0},{pinned:true,index:2},{pinned:true,index:1}];
  assert.deepEqual(pinnedFirst(input).map(t=>t.index),[1,2,0]);
  assert.equal(input[0].index,0);
});
