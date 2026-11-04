import test from 'node:test';import assert from 'node:assert/strict';
import {signalMutedCount} from '../../src/zenith/signals/muted-count.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Muted worlds reports safe finite browser telemetry',()=>{
 const measured=signalMutedCount.calculate(demoTabs),empty=signalMutedCount.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
