import test from 'node:test';import assert from 'node:assert/strict';
import {lensCommunicationWorlds} from '../../src/zenith/lenses/communication-worlds.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('Communication worlds is a pure tab selection filter',()=>{
 const source=[...demoTabs],before=source.map(t=>t.id),result=lensCommunicationWorlds.select(source);
 assert.deepEqual(before,source.map(t=>t.id));assert.ok(result.length<=source.length);
 assert.ok(result.every(t=>source.includes(t)));assert.deepEqual(lensCommunicationWorlds.select([]),[]);
 assert.equal(lensCommunicationWorlds.select(source).length,result.length);
});
