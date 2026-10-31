import test from 'node:test';
import assert from 'node:assert/strict';
import { clusterCenter } from '../src/domain/toolkit/cluster-center.ts';

test('feat: compute safe visual cluster centroids', () => {
  assert.deepEqual(clusterCenter([{x:0,y:2},{x:10,y:4}]),{x:5,y:3});
  assert.equal(clusterCenter([]),null);
});
