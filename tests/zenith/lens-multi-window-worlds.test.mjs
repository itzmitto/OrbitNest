import test from 'node:test';import assert from 'node:assert/strict';
import {lensMultiWindowWorlds} from '../../src/zenith/lenses/multi-window-worlds.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Multiverse worlds is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensMultiWindowWorlds.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensMultiWindowWorlds.select([]),[]);
 assert.equal(lensMultiWindowWorlds.select(source).length,result.length);
});
