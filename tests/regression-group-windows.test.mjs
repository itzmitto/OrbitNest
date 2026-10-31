import test from 'node:test';
import assert from 'node:assert/strict';
import { groupTabs } from '../src/domain/group.ts';

test('test: represent separate browser windows independently',()=>{
  const rows=[{id:1,domain:'a.test',windowId:1},{id:2,domain:'a.test',windowId:2}];
  assert.deepEqual(groupTabs(rows,'window').map(g=>g.key),['1','2']);
  assert.equal(groupTabs(rows,'none')[0].tabs.length,2);
});
