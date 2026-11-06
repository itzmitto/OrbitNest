import test from 'node:test';import assert from 'node:assert/strict';
import {profileDomain,suggestSystemLinks,searchSystems} from '../../src/nova/core/systems.ts';
const tabs=[{id:1,windowId:1,url:'https://example.org',title:'Docs',active:true,pinned:false},
 {id:2,windowId:1,url:'https://news.site',title:'Today',active:false,pinned:true},
 {id:3,windowId:2,url:'https://example.org/help',title:'Help',active:false,pinned:false}];
test('system profiles reflect active and pinned browser state',()=>{
 const profile=profileDomain(tabs,'example.org');assert.equal(profile.total,2);assert.equal(profile.windows,2);assert.equal(profile.active,1);
});
test('shared window links derive from existing metadata',()=>{
 const links=suggestSystemLinks(tabs);assert.equal(links.length,1);assert.equal(links[0].sharedWindows,1);
});
test('search includes tab titles without fuzzy false positives',()=>{
 assert.equal(searchSystems(tabs,'Today')[0].domain,'news.site');assert.deepEqual(searchSystems(tabs,'not-there'),[]);
});
