import test from 'node:test';import assert from 'node:assert/strict';
import {signalShortUrls} from '../../src/zenith/signals/short-urls.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Short addresses reports safe finite browser telemetry',()=>{
 const measured=signalShortUrls.calculate(demoTabs),empty=signalShortUrls.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
