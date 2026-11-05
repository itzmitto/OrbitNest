import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceRestorePreflight} from '../../../../src/aether/instruments/restore-preflight/advice.ts';
import {evaluateRestorePreflight} from '../../../../src/aether/instruments/restore-preflight/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceRestorePreflight(sampleTabs,evaluateRestorePreflight(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceRestorePreflight([],[]).join(' '),/Open some browser tabs/);
});
