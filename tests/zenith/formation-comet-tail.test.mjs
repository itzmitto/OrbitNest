import test from 'node:test';import assert from 'node:assert/strict';
import {orbitCometTail} from '../../src/zenith/formations/comet-tail.ts';
test('Comet trail computes finite, deterministic 3D planet positions',()=>{
 const a=orbitCometTail.place(3,22,19203),b=orbitCometTail.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitCometTail.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitCometTail.place(4,22,19203);assert.notDeepEqual(a,other);
});
