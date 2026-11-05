import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {advicePinnedConstellations} from '../../../../src/aether/instruments/pinned-constellations/advice.ts';
import {evaluatePinnedConstellations} from '../../../../src/aether/instruments/pinned-constellations/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=advicePinnedConstellations(sampleTabs,evaluatePinnedConstellations(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(advicePinnedConstellations([],[]).join(' '),/Open some browser tabs/);
});
