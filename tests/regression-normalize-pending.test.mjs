import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTab } from '../src/domain/normalize.ts';

test('test: support pending navigation URL while a tab loads',()=>{
  const tab=normalizeTab({id:3,windowId:2,pendingUrl:'https://docs.example.net/start',active:true,pinned:false,index:0});
  assert.equal(tab.domain,'docs.example.net');
  assert.equal(tab.url,'https://docs.example.net/start');
});
