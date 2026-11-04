import test from 'node:test';import assert from 'node:assert/strict';
import {buildPlanets,defaultFormation} from '../../src/zenith/core/scene.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('each live tab becomes one stable planet',()=>{
 const a=buildPlanets(demoTabs),b=buildPlanets(demoTabs);assert.equal(a.length,demoTabs.length);assert.deepEqual(a,b);
 assert.ok(a.some(p=>p.moonCount>=2));assert.notEqual(a[0].x,a[1].x);
});
test('formation handles zero tabs without invalid coordinates',()=>{
 assert.deepEqual(buildPlanets([]),[]);assert.ok(Number.isFinite(defaultFormation.place(0,0,0).x));
});
