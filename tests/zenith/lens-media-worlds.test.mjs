import test from 'node:test';import assert from 'node:assert/strict';
import {lensMediaWorlds} from '../../src/zenith/lenses/media-worlds.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Media worlds is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensMediaWorlds.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensMediaWorlds.select([]),[]);
 assert.equal(lensMediaWorlds.select(source).length,result.length);
});
