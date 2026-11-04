import test from 'node:test';import assert from 'node:assert/strict';
import {orbitLogarithmicSpiral} from '../../src/zenith/formations/logarithmic-spiral.ts';
test('Logarithmic spiral computes finite, deterministic 3D planet positions',()=>{
 const a=orbitLogarithmicSpiral.place(3,22,19203),b=orbitLogarithmicSpiral.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitLogarithmicSpiral.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitLogarithmicSpiral.place(4,22,19203);assert.notDeepEqual(a,other);
});
