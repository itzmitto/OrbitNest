import test from 'node:test';import assert from 'node:assert/strict';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
import {buildPlanets} from '../../src/zenith/core/scene.ts';
test('different domains have distinct planet materials and orbital positions',()=>{
 const planets=buildPlanets(demoTabs);
 assert.ok(new Set(planets.map(p=>p.material)).size>=2);
 assert.ok(new Set(planets.map(p=>`${p.x},${p.z}`)).size===planets.length);
});
