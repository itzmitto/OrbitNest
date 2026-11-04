import test from 'node:test';import assert from 'node:assert/strict';
import {signalMediaShare} from '../../src/zenith/signals/media-share.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Media presence reports safe finite browser telemetry',()=>{
 const measured=signalMediaShare.calculate(demoTabs),empty=signalMediaShare.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
