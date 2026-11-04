import test from 'node:test';import assert from 'node:assert/strict';
import {orbitDoubleSpiral} from '../../src/zenith/formations/double-spiral.ts';
test('Binary spiral arms computes finite, deterministic 3D planet positions',()=>{
 const a=orbitDoubleSpiral.place(3,22,19203),b=orbitDoubleSpiral.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitDoubleSpiral.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitDoubleSpiral.place(4,22,19203);assert.notDeepEqual(a,other);
});
