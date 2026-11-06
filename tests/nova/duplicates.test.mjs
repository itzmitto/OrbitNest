import test from 'node:test';import assert from 'node:assert/strict';
import {findDuplicateGroups,previewDuplicateCleanup} from '../../src/nova/core/duplicates.ts';
const make=(id,extra={})=>({id,index:id,windowId:1,url:'https://a.test/a#part',title:'Tab',active:false,pinned:false,...extra});
test('never proposes closing a pinned or active duplicate',()=>{
 const groups=findDuplicateGroups([make(1,{active:true}),make(2,{pinned:true}),make(3)]);
 assert.equal(groups[0].keep.id,1);assert.deepEqual(groups[0].extras.map(t=>t.id),[3]);
 assert.equal(previewDuplicateCleanup([make(1),make(2)]).eligible,1);
});
test('ignores unsupported URL schemes',()=>assert.equal(findDuplicateGroups([make(1,{url:'chrome://x'}),make(2,{url:'chrome://x'})]).length,0));
