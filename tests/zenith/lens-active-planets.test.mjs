import test from 'node:test';import assert from 'node:assert/strict';
import {lensActivePlanets} from '../../src/zenith/lenses/active-planets.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Active planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensActivePlanets.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensActivePlanets.select([]),[]);
 assert.equal(lensActivePlanets.select(source).length,result.length);
});
