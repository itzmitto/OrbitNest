import test from 'node:test';
import assert from 'node:assert/strict';
import { easeCamera } from '../src/domain/toolkit/ease-camera.ts';

test('feat: animate camera transitions with smooth easing', () => {
  assert.equal(easeCamera(0),0);
  assert.equal(easeCamera(1),1);
  assert.equal(easeCamera(.5),.5);
  assert.equal(easeCamera(10),1);
});
