import test from 'node:test';import assert from 'node:assert/strict';
import {orbitPolarRibbons} from '../../src/zenith/formations/polar-ribbons.ts';
test('Polar aurora ribbons computes finite, deterministic 3D planet positions',()=>{
 const a=orbitPolarRibbons.place(3,22,19203),b=orbitPolarRibbons.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitPolarRibbons.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitPolarRibbons.place(4,22,19203);assert.notDeepEqual(a,other);
});
