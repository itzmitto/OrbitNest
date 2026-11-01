import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const shader = readFileSync(new URL('../src/graph/planet-webgl.ts', import.meta.url), 'utf8');
test('planet shader keeps procedural atmosphere and rotating cloud detail', () => {
  assert.match(shader, /cloudMask=smoothstep/);
  assert.match(shader, /float atmosphere=pow/);
  assert.match(shader, /float terminator=smoothstep/);
  assert.match(shader, /uSpin.*node\.speed/);
});
