import test from 'node:test';
import assert from 'node:assert/strict';
import { nodeDistance } from '../src/domain/toolkit/node-distance.ts';

test('feat: measure planet spacing independently of zoom', () => {
  assert.equal(nodeDistance({x:0,y:0},{x:3,y:4}),5);
  assert.equal(nodeDistance({x:NaN,y:0},{x:0,y:0}),Infinity);
});
