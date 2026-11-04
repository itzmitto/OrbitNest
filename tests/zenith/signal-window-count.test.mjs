import test from 'node:test';import assert from 'node:assert/strict';
import {signalWindowCount} from '../../src/zenith/signals/window-count.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Open windows reports safe finite browser telemetry',()=>{
 const measured=signalWindowCount.calculate(demoTabs),empty=signalWindowCount.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
