import test from 'node:test';import assert from 'node:assert/strict';
import {orbitCelestialShell} from '../../src/zenith/formations/celestial-shell.ts';
test('Celestial shell computes finite, deterministic 3D planet positions',()=>{
 const a=orbitCelestialShell.place(3,22,19203),b=orbitCelestialShell.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitCelestialShell.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitCelestialShell.place(4,22,19203);assert.notDeepEqual(a,other);
});
