import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceCosmicHealth} from '../../../../src/aether/instruments/cosmic-health/advice.ts';
import {evaluateCosmicHealth} from '../../../../src/aether/instruments/cosmic-health/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceCosmicHealth(sampleTabs,evaluateCosmicHealth(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceCosmicHealth([],[]).join(' '),/Open some browser tabs/);
});
