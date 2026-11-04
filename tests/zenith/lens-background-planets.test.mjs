import test from 'node:test';import assert from 'node:assert/strict';
import {lensBackgroundPlanets} from '../../src/zenith/lenses/background-planets.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Background planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensBackgroundPlanets.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensBackgroundPlanets.select([]),[]);
 assert.equal(lensBackgroundPlanets.select(source).length,result.length);
});
