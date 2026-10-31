import test from 'node:test';
import assert from 'node:assert/strict';
import { searchTabs } from '../src/domain/search.ts';

test('test: verify multi-word tab searches match all terms',()=>{
  const tabs=[{title:'GitHub Action Logs',domain:'github.com',url:'https://github.com'},{title:'GitHub',domain:'github.com',url:'https://github.com'}];
  assert.deepEqual(searchTabs(tabs,' github LOGS ').map(t=>t.title),['GitHub Action Logs']);
  assert.equal(searchTabs(tabs,'gitlab logs').length,0);
});
