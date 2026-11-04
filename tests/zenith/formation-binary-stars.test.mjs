import test from 'node:test';import assert from 'node:assert/strict';
import {orbitBinaryStars} from '../../src/zenith/formations/binary-stars.ts';
test('Twin star systems computes finite, deterministic 3D planet positions',()=>{
 const a=orbitBinaryStars.place(3,22,19203),b=orbitBinaryStars.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitBinaryStars.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitBinaryStars.place(4,22,19203);assert.notDeepEqual(a,other);
});
