import test from 'node:test';
import assert from 'node:assert/strict';
import { toWorld } from '../src/domain/toolkit/world-convert.ts';

test('feat: translate canvas clicks back to world coordinates', () => {
  assert.deepEqual(toWorld({x:24,y:17},{x:0,y:0},2,{x:4,y:-3}),{x:10,y:10});
});
