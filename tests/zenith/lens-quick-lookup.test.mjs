import test from 'node:test';import assert from 'node:assert/strict';
import {lensQuickLookup} from '../../src/zenith/lenses/quick-lookup.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Quick lookup planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensQuickLookup.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensQuickLookup.select([]),[]);
 assert.equal(lensQuickLookup.select(source).length,result.length);
});
