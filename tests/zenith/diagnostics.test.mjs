import test from 'node:test';import assert from 'node:assert/strict';
import {diagnose,healthMessage} from '../../src/zenith/core/diagnostics.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('health checks detect duplicate and discarded planets',()=>{
 const d=diagnose([...demoTabs,demoTabs[0]]);assert.equal(d.duplicates,1);
 assert.equal(d.tabCount,demoTabs.length+1);assert.ok(healthMessage(d));
 assert.match(healthMessage(diagnose([])),/empty/);
});
