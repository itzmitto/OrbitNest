import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceWindowFleet} from '../../../../src/aether/instruments/window-fleet/advice.ts';
import {evaluateWindowFleet} from '../../../../src/aether/instruments/window-fleet/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceWindowFleet(sampleTabs,evaluateWindowFleet(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceWindowFleet([],[]).join(' '),/Open some browser tabs/);
});
