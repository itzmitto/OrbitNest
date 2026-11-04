import test from 'node:test';import assert from 'node:assert/strict';
import {lensInsecurePlanets} from '../../src/zenith/lenses/insecure-planets.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Unencrypted planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensInsecurePlanets.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensInsecurePlanets.select([]),[]);
 assert.equal(lensInsecurePlanets.select(source).length,result.length);
});
