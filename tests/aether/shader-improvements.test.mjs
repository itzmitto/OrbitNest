import test from 'node:test';import assert from 'node:assert/strict';
import {fragmentShader} from '../../src/zenith/engine/shaders.ts';
test('planet materials combine diffuse light, procedural texture and atmospheric rim',()=>{
 assert.match(fragmentShader,/float fbm\(vec3 p\)/);
 assert.match(fragmentShader,/float atmosphere/);
 assert.match(fragmentShader,/uMaterial/);
 assert.match(fragmentShader,/vec3 color=base/);
});
test('shader keeps existing focus highlight and Saturn ring path',()=>{
 assert.match(fragmentShader,/uFocus/);assert.match(fragmentShader,/uRing/);
 assert.match(fragmentShader,/gl_FragColor|fragColor=vec4/);
});
