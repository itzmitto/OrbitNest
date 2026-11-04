import test from 'node:test';import assert from 'node:assert/strict';
import {lensDuplicateWorlds} from '../../src/zenith/lenses/duplicate-worlds.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Duplicate worlds is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensDuplicateWorlds.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensDuplicateWorlds.select([]),[]);
 assert.equal(lensDuplicateWorlds.select(source).length,result.length);
});
