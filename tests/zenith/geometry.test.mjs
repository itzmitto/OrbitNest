import test from 'node:test';import assert from 'node:assert/strict';
import {sphere,ring} from '../../src/zenith/engine/geometry.ts';
import {identity,perspective,multiply,translation,project} from '../../src/zenith/engine/matrices.ts';
test('sphere and ring have complete indexed geometry',()=>{
 const m=sphere(12,8),r=ring(1.2,1.7,32);
 assert.equal(m.positions.length/3,13*9);assert.equal(m.indices.length,12*8*6);assert.equal(r.indices.length,32*6);
 assert.equal(m.normals.length,m.positions.length);
});
test('3D matrices keep identity and transform homogeneous positions',()=>{
 const p=multiply(identity(),translation(4,0,-5));assert.equal(p[12],4);
 const projection=perspective(Math.PI/3,1,0.1,100);assert.ok(Number.isFinite(project([0,0,-5],projection)[0]));
});
