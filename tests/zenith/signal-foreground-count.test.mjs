import test from 'node:test';import assert from 'node:assert/strict';
import {signalForegroundCount} from '../../src/zenith/signals/foreground-count.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Active planets reports safe finite browser telemetry',()=>{
 const measured=signalForegroundCount.calculate(demoTabs),empty=signalForegroundCount.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
