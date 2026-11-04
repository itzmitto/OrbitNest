import test from 'node:test';import assert from 'node:assert/strict';
import {signalDomainDiversity} from '../../src/zenith/signals/domain-diversity.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Domain diversity reports safe finite browser telemetry',()=>{
 const measured=signalDomainDiversity.calculate(demoTabs),empty=signalDomainDiversity.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
