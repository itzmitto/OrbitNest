import test from 'node:test';import assert from 'node:assert/strict';
import {orbitCosmicVortex} from '../../src/zenith/formations/cosmic-vortex.ts';
test('Cosmic vortex computes finite, deterministic 3D planet positions',()=>{
 const a=orbitCosmicVortex.place(3,22,19203),b=orbitCosmicVortex.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitCosmicVortex.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitCosmicVortex.place(4,22,19203);assert.notDeepEqual(a,other);
});
