import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source=readFileSync(new URL('../src/graph/planet-webgl.ts', import.meta.url),'utf8');
test('planet rings have per-planet seed and bounded alpha', () => {
  assert.match(source,/uniform float uRingSeed/);
  assert.match(source,/uRingSeed'\),node\.seed/);
  assert.match(source,/clamp\(envelope\*/);
  assert.match(source,/float gap=smoothstep/);
});
