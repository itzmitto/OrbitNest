import test from 'node:test';import assert from 'node:assert/strict';
import {orbitStellarGrid} from '../../src/zenith/formations/stellar-grid.ts';
test('Stellar navigation grid computes finite, deterministic 3D planet positions',()=>{
 const a=orbitStellarGrid.place(3,22,19203),b=orbitStellarGrid.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitStellarGrid.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitStellarGrid.place(4,22,19203);assert.notDeepEqual(a,other);
});
