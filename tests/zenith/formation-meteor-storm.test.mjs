import test from 'node:test';import assert from 'node:assert/strict';
import {orbitMeteorStorm} from '../../src/zenith/formations/meteor-storm.ts';
test('Meteor storm computes finite, deterministic 3D planet positions',()=>{
 const a=orbitMeteorStorm.place(3,22,19203),b=orbitMeteorStorm.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitMeteorStorm.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitMeteorStorm.place(4,22,19203);assert.notDeepEqual(a,other);
});
