import test from 'node:test';import assert from 'node:assert/strict';
import {cameraPreset,presets} from '../../src/zenith/engine/camera.ts';
import {defaultCamera} from '../../src/zenith/core/state.ts';
test('camera presets produce bounded immersive viewpoints',()=>{for(const item of presets){
 const camera=cameraPreset(defaultCamera,item.id);assert.ok(camera.distance>=7);assert.ok(Math.abs(camera.pitch)<=1.35);
}assert.notEqual(cameraPreset(defaultCamera,'top').pitch,defaultCamera.pitch);});
