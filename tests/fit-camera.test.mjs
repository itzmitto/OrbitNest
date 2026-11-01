import test from 'node:test';
import assert from 'node:assert/strict';
import { fitPlanetCamera } from '../src/graph/fit-camera.ts';
import { createPlanetNodes } from '../src/graph/planet-system.ts';
import { sampleTabs } from '../src/domain/sample.ts';
test('fit camera produces bounded zoom and no mutation',()=>{
 const nodes=createPlanetNodes(sampleTabs,950,550);
 const snapshot=JSON.stringify(nodes);
 const camera=fitPlanetCamera(nodes,{width:950,height:550});
 assert.ok(camera.zoom>=0.55&&camera.zoom<=2.25);
 assert.ok(Number.isFinite(camera.offset.x));
 assert.equal(JSON.stringify(nodes),snapshot);
});
test('empty and unusable scenes get a reset camera',()=>{
 assert.deepEqual(fitPlanetCamera([],{width:100,height:100}),{zoom:1,offset:{x:0,y:0}});
});
