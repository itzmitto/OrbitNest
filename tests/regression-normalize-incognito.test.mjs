import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTabs } from '../src/domain/normalize.ts';

test('test: exclude incognito records from normalized tab metadata',()=>{
  const base={windowId:1,title:'Private',url:'https://example.com',active:false,pinned:false,index:0};
  assert.deepEqual(normalizeTabs([{...base,id:1,incognito:true},{...base,id:2,incognito:false}]).map(x=>x.id),[2]);
});
