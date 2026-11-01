import test from 'node:test'; import assert from 'node:assert/strict';
import {selectionHalo} from '../src/graph/selection-halo.ts';
import {createPlanetNodes} from '../src/graph/planet-system.ts';
import {sampleTabs} from '../src/domain/sample.ts';
test('selection rings follow one planet without mutating the input',()=>{
 const nodes=createPlanetNodes(sampleTabs,940,550);
 const halo=selectionHalo(nodes,nodes[0].id);
 assert.equal(halo.left,nodes[0].x);
 assert.ok(halo.diameter>nodes[0].r*2);
 assert.equal(selectionHalo(nodes,-1),null);
});
