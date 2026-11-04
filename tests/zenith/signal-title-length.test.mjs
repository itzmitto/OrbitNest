import test from 'node:test';import assert from 'node:assert/strict';
import {signalTitleLength} from '../../src/zenith/signals/title-length.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Title complexity reports safe finite browser telemetry',()=>{
 const measured=signalTitleLength.calculate(demoTabs),empty=signalTitleLength.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
