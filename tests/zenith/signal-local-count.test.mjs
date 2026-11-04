import test from 'node:test';import assert from 'node:assert/strict';
import {signalLocalCount} from '../../src/zenith/signals/local-count.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Local pages reports safe finite browser telemetry',()=>{
 const measured=signalLocalCount.calculate(demoTabs),empty=signalLocalCount.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
