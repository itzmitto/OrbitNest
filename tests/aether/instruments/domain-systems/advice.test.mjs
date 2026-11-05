import test from 'node:test';import assert from 'node:assert/strict';
import {sampleTabs} from '../../fixtures.mjs';
import {adviceDomainSystems} from '../../../../src/aether/instruments/domain-systems/advice.ts';
import {evaluateDomainSystems} from '../../../../src/aether/instruments/domain-systems/analysis.ts';
test('instrument advice always explains rather than changing browser state',()=>{
 const notes=adviceDomainSystems(sampleTabs,evaluateDomainSystems(sampleTabs));
 assert.ok(notes.length>0);assert.ok(notes.every(n=>typeof n==='string'&&n.length>10));
 assert.match(adviceDomainSystems([],[]).join(' '),/Open some browser tabs/);
});
