import test from 'node:test';import assert from 'node:assert/strict';
import {signalAudioCount} from '../../src/zenith/signals/audio-count.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Playing audio reports safe finite browser telemetry',()=>{
 const measured=signalAudioCount.calculate(demoTabs),empty=signalAudioCount.calculate([]);
 assert.ok(Number.isFinite(measured.value));assert.ok(Number.isFinite(empty.value));
 assert.ok(measured.value>=0);assert.ok(empty.value>=0);
 assert.equal(typeof measured.detail,'string');
});
