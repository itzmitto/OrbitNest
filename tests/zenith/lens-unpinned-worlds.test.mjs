import test from 'node:test';import assert from 'node:assert/strict';
import {lensUnpinnedWorlds} from '../../src/zenith/lenses/unpinned-worlds.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Floating worlds is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensUnpinnedWorlds.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensUnpinnedWorlds.select([]),[]);
 assert.equal(lensUnpinnedWorlds.select(source).length,result.length);
});
