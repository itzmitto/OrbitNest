import test from 'node:test';
import assert from 'node:assert/strict';
import { toScreen } from '../src/domain/toolkit/screen-convert.ts';

test('feat: convert orbit coordinates to screen space', () => {
  assert.deepEqual(toScreen({x:10,y:10},{x:0,y:0},2,{x:4,y:-3}),{x:24,y:17});
  assert.deepEqual(toScreen({x:10,y:10},{x:0,y:0},0,{x:4,y:-3}),{x:10,y:10});
});
