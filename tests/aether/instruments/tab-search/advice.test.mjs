import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceTabSearch} from '../../../../src/aether/instruments/tab-search/advice.ts';
import {evaluateTabSearch} from '../../../../src/aether/instruments/tab-search/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceTabSearch(sampleTabs,evaluateTabSearch(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceTabSearch([],[]).join(' '),/Open some browser tabs/);
});
