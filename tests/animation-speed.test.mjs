import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAnimationSpeed, ANIMATION_FACTORS } from '../src/domain/animation-speed.ts';
test('speed values are validated and deterministic', () => {
  assert.equal(parseAnimationSpeed(null),'normal');
  assert.equal(parseAnimationSpeed('fast'),'normal');
  assert.equal(parseAnimationSpeed('drift'),'drift');
  assert.ok(ANIMATION_FACTORS.drift < ANIMATION_FACTORS.normal);
  assert.ok(ANIMATION_FACTORS.hyperdrive > ANIMATION_FACTORS.normal);
});
