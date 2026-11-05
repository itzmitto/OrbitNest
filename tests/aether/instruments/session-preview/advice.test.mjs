import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceSessionPreview} from '../../../../src/aether/instruments/session-preview/advice.ts';
import {evaluateSessionPreview} from '../../../../src/aether/instruments/session-preview/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceSessionPreview(sampleTabs,evaluateSessionPreview(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceSessionPreview([],[]).join(' '),/Open some browser tabs/);
});
