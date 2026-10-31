import assert from 'node:assert/strict';
import test from 'node:test';
import { centerOnPlanet } from '../src/graph/camera.ts';
import { createPlanetNodes } from '../src/graph/planet-system.ts';
import { sampleTabs } from '../src/domain/sample.ts';

test('camera focus centers a selected planet', () => {
  const nodes = createPlanetNodes(sampleTabs, 1200, 720);
  const result = centerOnPlanet(nodes, nodes[0].id, 1200, 720, {x:0,y:0});
  assert.ok(Math.abs(nodes[0].x + result.x - 600) < 0.001);
  assert.ok(Math.abs(nodes[0].y + result.y - 360) < 0.001);
});
test('camera focus leaves offset alone for missing tabs', () => {
  const initial = {x:50,y:-10};
  assert.deepEqual(centerOnPlanet([], 999, 1200, 720, initial), initial);
  assert.deepEqual(centerOnPlanet(createPlanetNodes(sampleTabs, 1000, 700), 999, 1000, 700, initial), initial);
});
