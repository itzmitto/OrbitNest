import test from 'node:test';import assert from 'node:assert/strict';
import {orbitHelixTower} from '../../src/zenith/formations/helix-tower.ts';
test('Helical tower computes finite, deterministic 3D planet positions',()=>{
 const a=orbitHelixTower.place(3,22,19203),b=orbitHelixTower.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitHelixTower.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitHelixTower.place(4,22,19203);assert.notDeepEqual(a,other);
});
