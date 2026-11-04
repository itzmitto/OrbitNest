import test from 'node:test';import assert from 'node:assert/strict';
import {signalPlainHttp} from '../../src/zenith/signals/plain-http.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('HTTP exposure reports safe finite browser telemetry',()=>{
 const measured=signalPlainHttp.calculate(demoTabs),empty=signalPlainHttp.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
