import test from 'node:test';import assert from 'node:assert/strict';
import {lensPinnedWorlds} from '../../src/zenith/lenses/pinned-worlds.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Pinned worlds is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensPinnedWorlds.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensPinnedWorlds.select([]),[]);
 assert.equal(lensPinnedWorlds.select(source).length,result.length);
});
