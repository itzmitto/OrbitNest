import test from 'node:test';import assert from 'node:assert/strict';
import {exportSessionBundle,importSessionBundle,mergeSessionBundles} from '../../src/nova/core/transfer.ts';
const item={id:'a',name:'My work',createdAt:'',tabs:[{title:'Site',url:'https://safe.org',pinned:true}]};
test('session archives round-trip via versioned JSON',()=>{
 assert.deepEqual(importSessionBundle(exportSessionBundle([item])),[item]);
});
test('untrusted archive formats and executable URLs are rejected',()=>{
 assert.throws(()=>importSessionBundle('{"version":99,"sessions":[]}'),/supported/);
 const result=importSessionBundle('{"format":"orbitnest.nova.sessions","version":1,"sessions":[{"id":"x","name":"import","tabs":[{"url":"javascript:alert(1)"}]}]}');
 assert.equal(result[0].tabs.length,0);
});
test('merges skip duplicate session content',()=>assert.equal(mergeSessionBundles([item],[item]).length,1));
