import test from 'node:test';
import assert from 'node:assert/strict';
import { zoomAtPoint } from '../src/graph/camera.ts';

test('pointer anchored zoom preserves the same world position', () => {
  const a = { x: 24, y: -16 }, p = { x: 330, y: 210 };
  const next = zoomAtPoint(1, a, p, 900, 600, -180);
  const before = { x: (p.x - 450 - a.x), y: (p.y - 300 - a.y) };
  assert.ok(Math.abs(before.x - (p.x - 450 - next.offset.x) / next.zoom) < 0.00001);
  assert.ok(Math.abs(before.y - (p.y - 300 - next.offset.y) / next.zoom) < 0.00001);
});
test('zoom obeys bounds and ignores invalid deltas', () => {
  assert.equal(zoomAtPoint(1, {x:0,y:0}, {x:0,y:0}, 900, 600, -1e9).zoom, 2.25);
  assert.equal(zoomAtPoint(1, {x:0,y:0}, {x:0,y:0}, 900, 600, 1e9).zoom, 0.55);
  assert.equal(zoomAtPoint(1, {x:0,y:0}, {x:0,y:0}, 900, 600, NaN).zoom, 1);
});
