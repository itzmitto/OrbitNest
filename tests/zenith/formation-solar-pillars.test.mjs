import test from 'node:test';import assert from 'node:assert/strict';
import {orbitSolarPillars} from '../../src/zenith/formations/solar-pillars.ts';
test('Solar pillars computes finite, deterministic 3D planet positions',()=>{
 const a=orbitSolarPillars.place(3,22,19203),b=orbitSolarPillars.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitSolarPillars.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitSolarPillars.place(4,22,19203);assert.notDeepEqual(a,other);
});
