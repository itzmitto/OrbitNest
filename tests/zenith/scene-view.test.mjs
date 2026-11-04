import test from 'node:test';import assert from 'node:assert/strict';
import {project,perspective,lookAt,multiply} from '../../src/zenith/engine/matrices.ts';
test('3D screen projection preserves distinct orbit positions',()=>{
 const vp=multiply(perspective(Math.PI/3,1,.05,250),lookAt([0,0,24],[0,0,0]));
 const center=project([0,0,0],vp),offset=project([3,0,0],vp);
 assert.ok(Math.abs(center[0])<.00001);assert.ok(offset[0]>center[0]);
});
