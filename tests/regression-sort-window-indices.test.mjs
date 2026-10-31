import test from 'node:test';
import assert from 'node:assert/strict';
import { sortTabs } from '../src/domain/sort.ts';

test('test: keep browser window tab ordering stable',()=>{
  const rows=[{id:3,windowId:2,index:0,title:'Z',domain:'z'},{id:1,windowId:1,index:1,title:'A',domain:'a'},{id:2,windowId:1,index:0,title:'B',domain:'b'}];
  assert.deepEqual(sortTabs(rows,'window').map(x=>x.id),[2,1,3]);
  assert.equal(rows[0].id,3);
});
