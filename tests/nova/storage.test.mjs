import test from 'node:test';import assert from 'node:assert/strict';
import {parseOrbits,loadOrbits,saveOrbits,loadSettings,safeBookmarks} from '../../src/nova/core/storage.ts';
const mem=new Map();const storage={getItem:key=>mem.get(key)??null,setItem:(key,v)=>mem.set(key,v)};
test('invalid or non-web session URLs are not retained',()=>{
 const parsed=parseOrbits([{id:'a',name:'test',tabs:[{url:'javascript:alert(1)'},{url:'https://example.com',title:'Good',pinned:true}]}]);
 assert.equal(parsed[0].tabs.length,1); assert.equal(parsed[0].tabs[0].url,'https://example.com');
});
test('storage gracefully handles missing and invalid data',()=>{
 assert.deepEqual(loadOrbits(storage),[]);assert.equal(saveOrbits([{id:'a',name:'Mars',createdAt:'today',tabs:[]}],storage),true);
 assert.equal(loadOrbits(storage)[0].name,'Mars');assert.equal(loadSettings(storage).theme,'void');
});
test('session snapshots do not include internal browser pages',()=>{
 assert.equal(safeBookmarks([{url:'chrome://extensions',title:'Extensions',pinned:false},{url:'https://safe.test',title:'Site',pinned:false}]).length,1);
});
