import test from 'node:test';
import assert from 'node:assert/strict';
import { observeDeveloperDomainCount } from '../src/observatory/signals/developer-domain-count.ts';
const tabs = [
 {id:1,windowId:7,title:'GitHub',url:'https://github.com/a',domain:'github.com',favIconUrl:'data:icon',active:true,pinned:true,muted:false,audible:false,index:0},
 {id:2,windowId:7,title:'Music',url:'https://spotify.com',domain:'spotify.com',favIconUrl:null,active:false,pinned:false,muted:true,audible:true,index:1},
 {id:3,windowId:8,title:'Help',url:null,domain:'',favIconUrl:null,active:false,pinned:false,muted:false,audible:false,index:0},
];
test('developer-domain-count: useful aggregate without exposing addresses', () => {
 const result = observeDeveloperDomainCount(tabs);
 assert.equal(result.id, 'developer-domain-count');
 assert.equal(result.value, "1");
 assert.equal('url' in result, false);
});
test('developer-domain-count: stays defined for an empty galaxy', () => {
 const result = observeDeveloperDomainCount([]);
 assert.equal(typeof result.value, 'string');
 assert.ok(result.value.length > 0);
});
