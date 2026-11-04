import test from 'node:test';import assert from 'node:assert/strict';
import {signalSecureShare} from '../../src/zenith/signals/secure-share.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Secure browsing reports safe finite browser telemetry',()=>{
 const measured=signalSecureShare.calculate(demoTabs),empty=signalSecureShare.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
