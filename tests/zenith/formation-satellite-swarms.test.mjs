import test from 'node:test';import assert from 'node:assert/strict';
import {orbitSatelliteSwarms} from '../../src/zenith/formations/satellite-swarms.ts';
test('Satellite swarms computes finite, deterministic 3D planet positions',()=>{
 const a=orbitSatelliteSwarms.place(3,22,19203),b=orbitSatelliteSwarms.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitSatelliteSwarms.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitSatelliteSwarms.place(4,22,19203);assert.notDeepEqual(a,other);
});
