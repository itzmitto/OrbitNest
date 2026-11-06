import test from 'node:test';import assert from 'node:assert/strict';import {previewRestore} from '../../src/nova/core/restore.ts';
const orbit={id:'1',name:'Work',createdAt:'',tabs:[
 {title:'Safe',url:'https://site.test',pinned:false},{title:'Repeat',url:'https://site.test',pinned:true},
 {title:'Bad',url:'javascript:alert(1)',pinned:false},{title:'Already open',url:'https://open.test',pinned:false}]};
test('restore preview rejects non-web URLs and deduplicates requested tabs',()=>{
 const result=previewRestore(orbit,['https://open.test']);assert.equal(result.requests,1);assert.equal(result.rejected,1);assert.equal(result.alreadyOpen,1);
});
