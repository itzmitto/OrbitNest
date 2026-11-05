import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceSleepingWorlds} from '../../../../src/aether/instruments/sleeping-worlds/advice.ts';
import {evaluateSleepingWorlds} from '../../../../src/aether/instruments/sleeping-worlds/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceSleepingWorlds(sampleTabs,evaluateSleepingWorlds(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceSleepingWorlds([],[]).join(' '),/Open some browser tabs/);
});
