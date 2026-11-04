import test from 'node:test';import assert from 'node:assert/strict';
import {sortTabs} from '../../src/zenith/core/sort.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('sorting tab planets is stable and never mutates original',()=>{
 const input=demoTabs.slice().reverse(),before=input.map(t=>t.id);
 const result=sortTabs(input,'title');assert.deepEqual(input.map(t=>t.id),before);
 assert.ok(result[0].title.localeCompare(result.at(-1).title)<=0);
});
