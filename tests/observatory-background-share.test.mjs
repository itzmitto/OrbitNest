import test from 'node:test';
import assert from 'node:assert/strict';
import { observeBackgroundShare } from '../src/observatory/signals/background-share.ts';
const tabs = [
 {id:1,windowId:7,title:'GitHub',url:'https://github.com/a',domain:'github.com',favIconUrl:'data:icon',active:true,pinned:true,muted:false,audible:false,index:0},
 {id:2,windowId:7,title:'Music',url:'https://spotify.com',domain:'spotify.com',favIconUrl:null,active:false,pinned:false,muted:true,audible:true,index:1},
 {id:3,windowId:8,title:'Help',url:null,domain:'',favIconUrl:null,active:false,pinned:false,muted:false,audible:false,index:0},
];
test('background-share: useful aggregate without exposing addresses', () => {
 const result = observeBackgroundShare(tabs);
 assert.equal(result.id, 'background-share');
 assert.equal(result.value, "67%");
 assert.equal('url' in result, false);
});
test('background-share: stays defined for an empty galaxy', () => {
 const result = observeBackgroundShare([]);
 assert.equal(typeof result.value, 'string');
 assert.ok(result.value.length > 0);
});
