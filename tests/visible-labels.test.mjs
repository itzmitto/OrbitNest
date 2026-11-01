import test from 'node:test';
import assert from 'node:assert/strict';
import { visiblePlanetLabels } from '../src/graph/label-layout.ts';
import { createPlanetNodes } from '../src/graph/planet-system.ts';
import { sampleTabs } from '../src/domain/sample.ts';

test('labels avoid collisions and preserve prioritized planets', () => {
  const nodes = createPlanetNodes(sampleTabs, 320, 260);
  const crowded = nodes.map(node => ({ ...node, x: 90, y: 70 }));
  const chosen = visiblePlanetLabels(crowded, [crowded[2].id], 3);
  assert.equal(chosen[0].id, crowded[2].id);
  assert.equal(chosen.length, 1);
  assert.deepEqual(visiblePlanetLabels(nodes, [], -1), []);
  assert.deepEqual(visiblePlanetLabels(nodes, [], Infinity), []);
});
