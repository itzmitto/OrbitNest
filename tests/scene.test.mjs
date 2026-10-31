import test from 'node:test';
import assert from 'node:assert/strict';
import { parseScene, SCENES } from '../src/domain/scene.ts';
test('scene preferences accept only supported values', () => {
  for (const scene of SCENES) assert.equal(parseScene(scene),scene);
  assert.equal(parseScene('unknown'), 'deep-space');
  assert.equal(parseScene(null), 'deep-space');
});
