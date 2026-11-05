import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceDeveloperHangar} from '../../../../src/aether/instruments/developer-hangar/advice.ts';
import {evaluateDeveloperHangar} from '../../../../src/aether/instruments/developer-hangar/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceDeveloperHangar(sampleTabs,evaluateDeveloperHangar(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceDeveloperHangar([],[]).join(' '),/Open some browser tabs/);
});
