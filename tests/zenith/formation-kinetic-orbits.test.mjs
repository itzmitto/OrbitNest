import test from 'node:test';import assert from 'node:assert/strict';
import {orbitKineticOrbits} from '../../src/zenith/formations/kinetic-orbits.ts';
test('Kinetic orbits computes finite, deterministic 3D planet positions',()=>{
 const a=orbitKineticOrbits.place(3,22,19203),b=orbitKineticOrbits.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitKineticOrbits.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitKineticOrbits.place(4,22,19203);assert.notDeepEqual(a,other);
});
