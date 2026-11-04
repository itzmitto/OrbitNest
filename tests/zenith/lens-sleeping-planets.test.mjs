import test from 'node:test';import assert from 'node:assert/strict';
import {lensSleepingPlanets} from '../../src/zenith/lenses/sleeping-planets.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Sleeping planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensSleepingPlanets.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensSleepingPlanets.select([]),[]);
 assert.equal(lensSleepingPlanets.select(source).length,result.length);
});
