import test from 'node:test';import assert from 'node:assert/strict';
import {orbitLemniscate} from '../../src/zenith/formations/lemniscate.ts';
test('Infinity constellation computes finite, deterministic 3D planet positions',()=>{
 const a=orbitLemniscate.place(3,22,19203),b=orbitLemniscate.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitLemniscate.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitLemniscate.place(4,22,19203);assert.notDeepEqual(a,other);
});
