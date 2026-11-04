import test from 'node:test';import assert from 'node:assert/strict';
import {orbitAccretionDisc} from '../../src/zenith/formations/accretion-disc.ts';
test('Accretion disk computes finite, deterministic 3D planet positions',()=>{
 const a=orbitAccretionDisc.place(3,22,19203),b=orbitAccretionDisc.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitAccretionDisc.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitAccretionDisc.place(4,22,19203);assert.notDeepEqual(a,other);
});
