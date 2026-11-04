import test from 'node:test';import assert from 'node:assert/strict';
import {getFormation,getLens} from '../../src/zenith/core/data.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('selected tab lens can be passed through orbital layout',()=>{
 const tabs=getLens('all').select(demoTabs),orbit=getFormation('solar-spiral');
 assert.equal(tabs.length,demoTabs.length);assert.ok(Number.isFinite(orbit.place(0,tabs.length,10).x));
});
