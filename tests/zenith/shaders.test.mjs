import test from 'node:test';import assert from 'node:assert/strict';
import {vertexShader,fragmentShader} from '../../src/zenith/engine/shaders.ts';
test('GLSL vertex and fragment interfaces agree',()=>{
 assert.match(vertexShader,/out vec3 vNormal/);assert.match(fragmentShader,/in vec3 vNormal/);
 for(const uniform of ['uTime','uHue','uMaterial','uFocus','uRing','uLight'])assert.ok(fragmentShader.includes(uniform));
 assert.match(fragmentShader,/fragColor=/);
});
