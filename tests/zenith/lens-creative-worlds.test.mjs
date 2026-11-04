import test from 'node:test';import assert from 'node:assert/strict';
import {lensCreativeWorlds} from '../../src/zenith/lenses/creative-worlds.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Creative worlds is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensCreativeWorlds.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensCreativeWorlds.select([]),[]);
 assert.equal(lensCreativeWorlds.select(source).length,result.length);
});
