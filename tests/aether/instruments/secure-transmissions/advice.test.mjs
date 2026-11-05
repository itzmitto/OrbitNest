import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceSecureTransmissions} from '../../../../src/aether/instruments/secure-transmissions/advice.ts';
import {evaluateSecureTransmissions} from '../../../../src/aether/instruments/secure-transmissions/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceSecureTransmissions(sampleTabs,evaluateSecureTransmissions(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceSecureTransmissions([],[]).join(' '),/Open some browser tabs/);
});
