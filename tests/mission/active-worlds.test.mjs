import test from 'node:test';
import assert from 'node:assert/strict';
import { feature } from '../../src/mission/features/active-worlds.ts';
const base = (id, domain, extra={}) => ({id, windowId:1, title:`${domain} page`, domain, url:`https://${domain}/page`, active:false,pinned:false,audible:false,muted:false,discarded:false,loading:false, ...extra});
test('active-worlds: reports a valid metadata-only insight',()=>{
  const tabs=[base(1,'github.com',{active:true,pinned:true}),base(2,'github.com',{windowId:2,audible:true}),base(3,'example.org')];
  const result=feature.evaluate({tabs,query:'github',selectedId:1});
  assert.equal(typeof result.value,'string');assert.ok(result.value.length>0);
  assert.equal(typeof result.description,'string');assert.ok(Array.isArray(result.focus));
  for(const id of result.focus)assert.ok(tabs.some(tab=>tab.id===id),'focus IDs refer to existing tabs');
});
test('active-worlds: empty state does not crash',()=>{
  const result=feature.evaluate({tabs:[],query:'',selectedId:null});
  assert.equal(typeof result.value,'string');assert.deepEqual(result.focus,[]);
});
