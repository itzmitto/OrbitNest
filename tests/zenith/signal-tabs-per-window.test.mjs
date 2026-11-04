import test from 'node:test';import assert from 'node:assert/strict';
import {signalTabsPerWindow} from '../../src/zenith/signals/tabs-per-window.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Tabs per window reports safe finite browser telemetry',()=>{
 const measured=signalTabsPerWindow.calculate(demoTabs),empty=signalTabsPerWindow.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
