import test from 'node:test';import assert from 'node:assert/strict';
import {signalLargestCluster} from '../../src/zenith/signals/largest-cluster.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Largest system reports safe finite browser telemetry',()=>{
 const measured=signalLargestCluster.calculate(demoTabs),empty=signalLargestCluster.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
