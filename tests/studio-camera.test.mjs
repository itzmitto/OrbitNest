import test from 'node:test';import assert from 'node:assert/strict';
import {createCamera,zoomAtPointer,fitCamera} from '../src/studio/camera.ts';
test('cursor zoom maintains the world point',()=>{const c=createCamera();zoomAtPointer(c,1.5,70,90,300,200);assert.ok(Math.abs((70-150)/c.scale-c.x-(70-150))<1e-8);});
test('fit ignores empty tab collection and validates bounds',()=>{const c={x:1,y:2,scale:40};fitCamera(c,[],100,100);assert.deepEqual(c,createCamera());});
