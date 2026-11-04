import test from 'node:test';import assert from 'node:assert/strict';
import {lensDevWorlds} from '../../src/zenith/lenses/dev-worlds.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Developer worlds is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensDevWorlds.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensDevWorlds.select([]),[]);
 assert.equal(lensDevWorlds.select(source).length,result.length);
});
