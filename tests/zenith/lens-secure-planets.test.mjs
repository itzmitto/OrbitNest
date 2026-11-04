import test from 'node:test';import assert from 'node:assert/strict';
import {lensSecurePlanets} from '../../src/zenith/lenses/secure-planets.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Secure planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensSecurePlanets.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensSecurePlanets.select([]),[]);
 assert.equal(lensSecurePlanets.select(source).length,result.length);
});
