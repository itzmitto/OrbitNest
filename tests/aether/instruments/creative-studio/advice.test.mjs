import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceCreativeStudio} from '../../../../src/aether/instruments/creative-studio/advice.ts';
import {evaluateCreativeStudio} from '../../../../src/aether/instruments/creative-studio/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceCreativeStudio(sampleTabs,evaluateCreativeStudio(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceCreativeStudio([],[]).join(' '),/Open some browser tabs/);
});
