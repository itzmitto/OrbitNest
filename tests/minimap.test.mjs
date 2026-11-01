import test from 'node:test';import assert from 'node:assert/strict';
import {createMinimap} from '../src/graph/minimap.ts';
import {createPlanetNodes} from '../src/graph/planet-system.ts';
import {sampleTabs} from '../src/domain/sample.ts';
test('minimap points are safe, bounded and retain tab identity',()=>{
 const nodes=createPlanetNodes(sampleTabs,900,560);
 const points=createMinimap(nodes,nodes[0].id);
 assert.equal(points.length,nodes.length);
 assert.ok(points.every(p=>p.x>=0&&p.x<=100&&p.y>=0&&p.y<=100));
 assert.equal(points.filter(p=>p.active).length,1);
 assert.ok(points.every(p=>Object.keys(p).every(key=>['id','x','y','active'].includes(key))));
});
