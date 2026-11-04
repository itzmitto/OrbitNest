import test from 'node:test';import assert from 'node:assert/strict';
import {orbitGoldenRatio} from '../../src/zenith/formations/golden-ratio.ts';
test('Golden ratio constellation computes finite, deterministic 3D planet positions',()=>{
 const a=orbitGoldenRatio.place(3,22,19203),b=orbitGoldenRatio.place(3,22,19203);
 assert.deepEqual(a,b);for(const value of Object.values(a))assert.ok(Number.isFinite(value));
 for(const value of Object.values(orbitGoldenRatio.place(0,0,0)))assert.ok(Number.isFinite(value));
 const other=orbitGoldenRatio.place(4,22,19203);assert.notDeepEqual(a,other);
});
