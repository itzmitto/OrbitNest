import test from 'node:test';import assert from 'node:assert/strict';
import {signalUnpinnedCount} from '../../src/zenith/signals/unpinned-count.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Temporary planets reports safe finite browser telemetry',()=>{
 const measured=signalUnpinnedCount.calculate(demoTabs),empty=signalUnpinnedCount.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
