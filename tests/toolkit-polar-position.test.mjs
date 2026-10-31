import test from 'node:test';
import assert from 'node:assert/strict';
import { polarPosition } from '../src/domain/toolkit/polar-position.ts';

test('feat: calculate deterministic orbital positions', () => {
  assert.deepEqual(polarPosition(10,20,5,3,0),{x:15,y:20});
  const p=polarPosition(0,0,0,4,Math.PI/2);assert.ok(Math.abs(p.y-4)<1e-10);
});
