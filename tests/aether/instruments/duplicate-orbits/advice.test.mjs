import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceDuplicateOrbits} from '../../../../src/aether/instruments/duplicate-orbits/advice.ts';
import {evaluateDuplicateOrbits} from '../../../../src/aether/instruments/duplicate-orbits/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceDuplicateOrbits(sampleTabs,evaluateDuplicateOrbits(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceDuplicateOrbits([],[]).join(' '),/Open some browser tabs/);
});
