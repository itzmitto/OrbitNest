import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCameraPreference } from '../src/domain/camera-preferences.ts';

test('test: reject infinity and out-of-range restored camera positions',()=>{
  assert.equal(parseCameraPreference(JSON.stringify({zoom:3,offset:{x:0,y:0}})).zoom,1);
  assert.equal(parseCameraPreference(JSON.stringify({zoom:1,offset:{x:5001,y:0}})).offset.x,0);
  assert.equal(parseCameraPreference('{broken').zoom,1);
});
