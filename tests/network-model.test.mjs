import test from 'node:test';import assert from 'node:assert/strict';
import {buildGraph} from '../src/network/model.ts';
const tab=(id,domain,windowId=1)=>({id,title:`Tab ${id}`,domain,windowId,pinned:false,audible:false,active:id===1,index:id,url:null,favIconUrl:null,muted:false});
test('domain graphs keep separate tabs as separate nodes',()=>{const g=buildGraph([tab(1,'a'),tab(2,'a'),tab(3,'b')]);assert.equal(g.points.length,3);assert.equal(g.groupNames.length,2);assert.ok(g.edges.some(e=>e.kind==='group'));});
test('no invented hyperlink edges between two unrelated domains',()=>{const g=buildGraph([tab(1,'a'),tab(2,'b')]);assert.equal(g.edges.length,0);});
test('duplicate browser tab id is ignored, without mutating input',()=>{const input=[tab(1,'a'),tab(1,'a'),tab(2,'b')];assert.equal(buildGraph(input).points.length,2);assert.equal(input.length,3);});
