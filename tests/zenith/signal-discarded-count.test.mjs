import test from 'node:test';import assert from 'node:assert/strict';
import {signalDiscardedCount} from '../../src/zenith/signals/discarded-count.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Sleeping planets reports safe finite browser telemetry',()=>{
 const measured=signalDiscardedCount.calculate(demoTabs),empty=signalDiscardedCount.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
