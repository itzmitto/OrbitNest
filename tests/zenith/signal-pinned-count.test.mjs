import test from 'node:test';import assert from 'node:assert/strict';
import {signalPinnedCount} from '../../src/zenith/signals/pinned-count.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Pinned planets reports safe finite browser telemetry',()=>{
 const measured=signalPinnedCount.calculate(demoTabs),empty=signalPinnedCount.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
