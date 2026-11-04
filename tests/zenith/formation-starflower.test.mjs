import test from 'node:test';import assert from 'node:assert/strict';
import {orbitStarflower} from '../../src/zenith/formations/starflower.ts';
test('Starflower computes finite, deterministic 3D planet positions',()=>{
 const a=orbitStarflower.place(3,22,19203),b=orbitStarflower.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitStarflower.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitStarflower.place(4,22,19203);assert.notDeepEqual(a,other);
});
