import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceQuietZone} from '../../../../src/aether/instruments/quiet-zone/advice.ts';
import {evaluateQuietZone} from '../../../../src/aether/instruments/quiet-zone/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceQuietZone(sampleTabs,evaluateQuietZone(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceQuietZone([],[]).join(' '),/Open some browser tabs/);
});
