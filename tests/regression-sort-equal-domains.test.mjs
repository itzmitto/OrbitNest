import test from 'node:test';
import assert from 'node:assert/strict';
import { sortTabs } from '../src/domain/sort.ts';

test('test: use stable tab identifiers for equal domain sorting',()=>{
  const rows=[{id:9,domain:'same.test',title:'B',windowId:1,index:0},{id:3,domain:'same.test',title:'A',windowId:1,index:1}];
  assert.deepEqual(sortTabs(rows,'domain').map(t=>t.id),[3,9]);
});
