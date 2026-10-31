import test from 'node:test';
import assert from 'node:assert/strict';
import { isPlanetFilter, filterPlanetNodes } from '../src/graph/planet-filter.ts';
import { createPlanetNodes } from '../src/graph/planet-system.ts';
import { sampleTabs } from '../src/domain/sample.ts';
test('planet filtering never mutates the rendered node collection', () => {
  const nodes = createPlanetNodes(sampleTabs,960,560);
  const result = filterPlanetNodes(nodes,'ocean');
  assert.ok(result.every(node=>node.kind==='ocean'));
  assert.equal(nodes.length,sampleTabs.length);
  assert.notEqual(nodes,result);
});
test('rejects arbitrary filter strings',()=>{
  assert.equal(isPlanetFilter('gas'),true);
  assert.equal(isPlanetFilter('all'),true);
  assert.equal(isPlanetFilter('javascript'),false);
});
