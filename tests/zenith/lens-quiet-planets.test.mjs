import test from 'node:test';import assert from 'node:assert/strict';
import {lensQuietPlanets} from '../../src/zenith/lenses/quiet-planets.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Quiet planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensQuietPlanets.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensQuietPlanets.select([]),[]);
 assert.equal(lensQuietPlanets.select(source).length,result.length);
});
