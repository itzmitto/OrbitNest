import test from 'node:test';
import assert from 'node:assert/strict';
import { searchTabs } from '../src/domain/search.ts';

test('test: normalize unicode-compatible search queries',()=>{
  const tabs=[{title:'FULLWIDTH',domain:'sample.test',url:null},{title:'Another tab',domain:'example.com',url:null}];
  assert.equal(searchTabs(tabs,'ＦＵＬＬＷＩＤＴＨ')[0].title,'FULLWIDTH');
  assert.deepEqual(searchTabs(tabs,'   '),tabs);
});
