import test from 'node:test';
import assert from 'node:assert/strict';
import { clampCamera } from '../src/domain/toolkit/clamp-camera.ts';

test('feat: clamp unsafe camera coordinates', () => {
  assert.equal(clampCamera(20000),10000);
  assert.equal(clampCamera(-10,5),-5);
  assert.equal(clampCamera(Infinity),0);
});
