import test from 'node:test';import assert from 'node:assert/strict';
import {lensInternalPlanets} from '../../src/zenith/lenses/internal-planets.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Local planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensInternalPlanets.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensInternalPlanets.select([]),[]);
 assert.equal(lensInternalPlanets.select(source).length,result.length);
});
