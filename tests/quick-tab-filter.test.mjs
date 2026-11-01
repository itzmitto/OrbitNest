import test from 'node:test';import assert from 'node:assert/strict';
import {parseQuickTabFilter,filterByTabState} from '../src/domain/quick-tab-filter.ts';
import {sampleTabs} from '../src/domain/sample.ts';
test('quick filters preserve independent tabs and do not mutate input',()=>{
 const snapshot=JSON.stringify(sampleTabs);
 assert.deepEqual(filterByTabState(sampleTabs,'pinned').map(x=>x.id),sampleTabs.filter(x=>x.pinned).map(x=>x.id));
 assert.deepEqual(filterByTabState(sampleTabs,'all'),sampleTabs);
 assert.equal(parseQuickTabFilter('unknown'),'all');
 assert.equal(JSON.stringify(sampleTabs),snapshot);
});
