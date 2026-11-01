import test from 'node:test';import assert from 'node:assert/strict';
import {filterByWindow,parseWindowSelection} from '../src/domain/window-filter.ts';
import {sampleTabs} from '../src/domain/sample.ts';
test('window filter keeps only the intended window',()=>{
 assert.deepEqual(filterByWindow(sampleTabs,2).map(x=>x.windowId),[2,2]);
 assert.equal(parseWindowSelection('2',[1,2]),2);
 assert.equal(parseWindowSelection('3',[1,2]),null);
 assert.deepEqual(filterByWindow(sampleTabs,null),sampleTabs);
});
