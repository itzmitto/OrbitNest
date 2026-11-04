import test from 'node:test';import assert from 'node:assert/strict';
import {signalBackgroundShare} from '../../src/zenith/signals/background-share.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Background occupancy reports safe finite browser telemetry',()=>{
 const measured=signalBackgroundShare.calculate(demoTabs),empty=signalBackgroundShare.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
