import test from 'node:test';
import assert from 'node:assert/strict';
import { createStarfield } from '../src/graph/starfield.ts';
test('starfield is deterministic, bounded and limited for performance', () => {
  assert.deepEqual(createStarfield(100),createStarfield(100));
  assert.equal(createStarfield(5000).length,240);
  assert.equal(createStarfield(-5).length,0);
  assert.ok(createStarfield(100).every(s=>s.x>=0&&s.x<=100&&s.y>=0&&s.y<=100&&s.opacity<=1));
});
