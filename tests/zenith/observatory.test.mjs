import test from 'node:test';import assert from 'node:assert/strict';
import {signals,findSignal} from '../../src/zenith/signals/registry.ts';
test('signal registry starts as a typed extensible collection',()=>{
 assert.ok(Array.isArray(signals));assert.equal(findSignal('unknown'),undefined);
});
