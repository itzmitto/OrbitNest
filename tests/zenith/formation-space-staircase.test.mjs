import test from 'node:test';import assert from 'node:assert/strict';
import {orbitSpaceStaircase} from '../../src/zenith/formations/space-staircase.ts';
test('Nebula staircase computes finite, deterministic 3D planet positions',()=>{
 const a=orbitSpaceStaircase.place(3,22,19203),b=orbitSpaceStaircase.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitSpaceStaircase.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitSpaceStaircase.place(4,22,19203);assert.notDeepEqual(a,other);
});
