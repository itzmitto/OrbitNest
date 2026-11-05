import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceReadingHarbor} from '../../../../src/aether/instruments/reading-harbor/advice.ts';
import {evaluateReadingHarbor} from '../../../../src/aether/instruments/reading-harbor/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceReadingHarbor(sampleTabs,evaluateReadingHarbor(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceReadingHarbor([],[]).join(' '),/Open some browser tabs/);
});
