import test from 'node:test';
import assert from 'node:assert/strict';
import { observeAverageWindowLoad } from '../src/observatory/signals/average-window-load.ts';
const tabs = [
 {id:1,windowId:7,title:'GitHub',url:'https://github.com/a',domain:'github.com',favIconUrl:'data:icon',active:true,pinned:true,muted:false,audible:false,index:0},
 {id:2,windowId:7,title:'Music',url:'https://spotify.com',domain:'spotify.com',favIconUrl:null,active:false,pinned:false,muted:true,audible:true,index:1},
 {id:3,windowId:8,title:'Help',url:null,domain:'',favIconUrl:null,active:false,pinned:false,muted:false,audible:false,index:0},
];
test('average-window-load: useful aggregate without exposing addresses', () => {
 const result = observeAverageWindowLoad(tabs);
 assert.equal(result.id, 'average-window-load');
 assert.equal(result.value, "1.5");
 assert.equal('url' in result, false);
});
test('average-window-load: stays defined for an empty galaxy', () => {
 const result = observeAverageWindowLoad([]);
 assert.equal(typeof result.value, 'string');
 assert.ok(result.value.length > 0);
});
