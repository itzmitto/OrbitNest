import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {advicePlanetMetadata} from '../../../../src/aether/instruments/planet-metadata/advice.ts';
import {evaluatePlanetMetadata} from '../../../../src/aether/instruments/planet-metadata/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=advicePlanetMetadata(sampleTabs,evaluatePlanetMetadata(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(advicePlanetMetadata([],[]).join(' '),/Open some browser tabs/);
});
