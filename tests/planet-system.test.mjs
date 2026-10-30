import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlanetNodes, findPlanet, PLANET_KINDS, stableHash } from '../src/graph/planet-system.ts';
import { sampleTabs } from '../src/domain/sample.ts';

test('planet types and positions remain deterministic', () => {
  const first = createPlanetNodes(sampleTabs, 1100, 620);
  assert.deepEqual(first, createPlanetNodes(sampleTabs, 1100, 620));
  assert.equal(first.length, sampleTabs.length);
  assert.equal(new Set(first.map(item => item.id)).size, sampleTabs.length);
  assert.ok(first.every(item => PLANET_KINDS.includes(item.kind) && Number.isFinite(item.x) && Number.isFinite(item.y)));
});
test('same domain uses same planet material', () => {
  const nodes = createPlanetNodes(sampleTabs, 1000, 600);
  for (const a of nodes) for (const b of nodes) {
    if (a.tab.domain === b.tab.domain) assert.equal(a.kind, b.kind);
  }
});
test('zoom and pan alter positions without modifying inputs', () => {
  const original = JSON.stringify(sampleTabs);
  const normal = createPlanetNodes(sampleTabs, 1000, 600);
  const moved = createPlanetNodes(sampleTabs, 1000, 600, 1.5, {x: 40, y: -20});
  assert.equal(JSON.stringify(sampleTabs), original);
  assert.notEqual(normal[0].x, moved[0].x);
  assert.notEqual(normal[0].r, moved[0].r);
});
test('hit detection selects a visible planet', () => {
  const nodes = createPlanetNodes(sampleTabs, 1000, 600);
  assert.equal(findPlanet(nodes, nodes[0].x, nodes[0].y)?.id, nodes[0].id);
  assert.equal(findPlanet(nodes, -100, -100), undefined);
  assert.equal(stableHash('github.com'), stableHash('github.com'));
});
