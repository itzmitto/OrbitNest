import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceGalaxyBalance} from '../../../../src/aether/instruments/galaxy-balance/advice.ts';
import {evaluateGalaxyBalance} from '../../../../src/aether/instruments/galaxy-balance/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceGalaxyBalance(sampleTabs,evaluateGalaxyBalance(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceGalaxyBalance([],[]).join(' '),/Open some browser tabs/);
});
