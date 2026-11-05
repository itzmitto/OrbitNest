import test from 'node:test';import assert from 'node:assert/strict';
import {easeInOut,interpolateCamera,makeCameraTour,currentTourFrame,orbitingCamera} from '../../src/aether/core/cinematic.ts';
const camera={yaw:0,pitch:0,distance:20,targetX:0,targetY:0};
test('cinematic camera eases and retains endpoints',()=>{
 const result=interpolateCamera(camera,{...camera,yaw:2},.5);assert.equal(result.yaw,1);
 assert.equal(easeInOut(-4),0);assert.equal(easeInOut(4),1);
});
test('empty scene has a stable cinematic orbit',()=>{
 assert.ok(Number.isFinite(orbitingCamera([],120).distance));
 assert.equal(currentTourFrame([],0),null);assert.equal(makeCameraTour([]).length,0);
});
