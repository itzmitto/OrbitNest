import test from 'node:test';
import assert from 'node:assert/strict';
import { parseGalaxyLayout } from '../src/graph/layout-mode.ts';
import { createPlanetNodes } from '../src/graph/planet-system.ts';
import { sampleTabs } from '../src/domain/sample.ts';
test('layout selection validates persistence',()=>{
  assert.equal(parseGalaxyLayout('spiral'),'spiral');
  assert.equal(parseGalaxyLayout('broken'),'orbits');
});
test('golden spiral keeps all tabs separate and is reproducible',()=>{
  const a=createPlanetNodes(sampleTabs,1100,700,1,{x:0,y:0},'spiral');
  const b=createPlanetNodes(sampleTabs,1100,700,1,{x:0,y:0},'spiral');
  assert.equal(a.length,sampleTabs.length);
  assert.deepEqual(a,b);
  assert.notDeepEqual(a.map(x=>[x.x,x.y]),createPlanetNodes(sampleTabs,1100,700).map(x=>[x.x,x.y]));
});
