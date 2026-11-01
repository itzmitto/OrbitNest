import test from 'node:test'; import assert from 'node:assert/strict';
import {galaxyMetrics} from '../src/graph/galaxy-metrics.ts';
import {createPlanetNodes} from '../src/graph/planet-system.ts';
import {sampleTabs} from '../src/domain/sample.ts';
test('metrics use visible independent tabs',()=>{
  const nodes = createPlanetNodes(sampleTabs,850,490);
  assert.equal(galaxyMetrics(nodes).worlds,sampleTabs.length);
  assert.equal(galaxyMetrics([]).families,0);
  assert.equal(galaxyMetrics(nodes).pinned,nodes.filter(n=>n.tab.pinned).length);
});
