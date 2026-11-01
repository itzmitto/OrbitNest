import test from 'node:test'; import assert from 'node:assert/strict';
import {searchPlanetNodes} from '../src/graph/planet-search.ts';
import {createPlanetNodes} from '../src/graph/planet-system.ts';
import {sampleTabs} from '../src/domain/sample.ts';
test('local planet search matches kind and metadata without mutating nodes',()=>{
 const nodes=createPlanetNodes(sampleTabs,800,500);
 const match=searchPlanetNodes(nodes,nodes[0].kind);
 assert.ok(match.some(n=>n.id===nodes[0].id));
 assert.equal(searchPlanetNodes(nodes,'no-such-kind-999').length,0);
 assert.equal(searchPlanetNodes(nodes,'').length,nodes.length);
});
