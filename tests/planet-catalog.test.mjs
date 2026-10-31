import assert from 'node:assert/strict';
import test from 'node:test';
import { selectFeaturedWorlds, WORLD_NAMES } from '../src/graph/planet-catalog.ts';
import { PLANET_KINDS } from '../src/graph/planet-system.ts';
import { sampleTabs } from '../src/domain/sample.ts';

test('featured worlds remain independent browser tabs with stable ordering', () => {
  const worlds = selectFeaturedWorlds(sampleTabs, 5);
  assert.equal(worlds.length, Math.min(sampleTabs.length, 5));
  assert.equal(new Set(worlds.map(world => world.id)).size, worlds.length);
  assert.deepEqual(worlds, selectFeaturedWorlds(sampleTabs, 5));
});
test('invalid and empty limits produce no atlas worlds', () => {
  assert.deepEqual(selectFeaturedWorlds(sampleTabs, 0), []);
  assert.deepEqual(selectFeaturedWorlds(sampleTabs, -3), []);
  assert.deepEqual(selectFeaturedWorlds(sampleTabs, 1.2), []);
  assert.deepEqual(selectFeaturedWorlds([], 5), []);
});
test('each planet family has a descriptive accessible name', () => {
  assert.deepEqual(Object.keys(WORLD_NAMES).sort(), [...PLANET_KINDS].sort());
  assert.ok(Object.values(WORLD_NAMES).every(name => name.length > 5));
});
