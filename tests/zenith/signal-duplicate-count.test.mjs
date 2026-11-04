import test from 'node:test';import assert from 'node:assert/strict';
import {signalDuplicateCount} from '../../src/zenith/signals/duplicate-count.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Duplicate orbits reports safe finite browser telemetry',()=>{
 const measured=signalDuplicateCount.calculate(demoTabs),empty=signalDuplicateCount.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
