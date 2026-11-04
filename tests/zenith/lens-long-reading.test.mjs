import test from 'node:test';import assert from 'node:assert/strict';
import {lensLongReading} from '../../src/zenith/lenses/long-reading.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Reading planets is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensLongReading.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensLongReading.select([]),[]);
 assert.equal(lensLongReading.select(source).length,result.length);
});
