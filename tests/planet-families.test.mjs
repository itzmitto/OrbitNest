import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlanetNodes, PLANET_KINDS, stableHash } from '../src/graph/planet-system.ts';
import { sampleTabs } from '../src/domain/sample.ts';

test('ten real planet material families are available', () => {
  assert.equal(PLANET_KINDS.length, 10);
  assert.equal(new Set(PLANET_KINDS).size, 10);
  for (const kind of ['gas', 'ocean', 'nebula', 'moon', 'aurora']) {
    assert.ok(PLANET_KINDS.includes(kind));
  }
});

test('planet radii and rotational speeds stay reasonable', () => {
  const nodes = createPlanetNodes(sampleTabs, 1280, 720);
  assert.ok(nodes.every(node => node.r >= 17 && node.r <= 47));
  assert.ok(nodes.every(node => node.speed > 0 && node.speed < 1));
  assert.ok(nodes.every(node => node.kindIndex >= 0 && node.kindIndex < PLANET_KINDS.length));
});

test('one domain still produces one planet family across duplicate tabs', () => {
  const tabs = [
    {...sampleTabs[0], id: 9001, domain: 'example.org'},
    {...sampleTabs[0], id: 9002, domain: 'example.org'},
  ];
  const [a, b] = createPlanetNodes(tabs, 1280, 720);
  assert.equal(a.kind, b.kind);
  assert.notEqual(a.id, b.id);
  assert.equal(stableHash('example.org'), stableHash('example.org'));
});
