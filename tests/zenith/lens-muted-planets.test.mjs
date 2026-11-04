import test from 'node:test';import assert from 'node:assert/strict';
import {lensMutedPlanets} from '../../src/zenith/lenses/muted-planets.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Muted planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensMutedPlanets.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensMutedPlanets.select([]),[]);
 assert.equal(lensMutedPlanets.select(source).length,result.length);
});
