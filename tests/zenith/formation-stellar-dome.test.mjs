import test from 'node:test';import assert from 'node:assert/strict';
import {orbitStellarDome} from '../../src/zenith/formations/stellar-dome.ts';
test('Stellar dome computes finite, deterministic 3D planet positions',()=>{
 const a=orbitStellarDome.place(3,22,19203),b=orbitStellarDome.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitStellarDome.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitStellarDome.place(4,22,19203);assert.notDeepEqual(a,other);
});
