import test from 'node:test';
import assert from 'node:assert/strict';
import { groupTabs } from '../src/domain/group.ts';

test('test: keep duplicate URLs as separate grouped tab records',()=>{
  const rows=[{id:1,domain:'github.com',windowId:1},{id:2,domain:'github.com',windowId:2}];
  const groups=groupTabs(rows,'domain');
  assert.equal(groups.length,1);
  assert.deepEqual(groups[0].tabs.map(t=>t.id),[1,2]);
});
