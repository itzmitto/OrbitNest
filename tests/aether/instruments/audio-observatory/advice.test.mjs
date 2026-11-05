import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceAudioObservatory} from '../../../../src/aether/instruments/audio-observatory/advice.ts';
import {evaluateAudioObservatory} from '../../../../src/aether/instruments/audio-observatory/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceAudioObservatory(sampleTabs,evaluateAudioObservatory(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceAudioObservatory([],[]).join(' '),/Open some browser tabs/);
});
