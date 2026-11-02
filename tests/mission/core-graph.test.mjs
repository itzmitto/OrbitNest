import test from 'node:test';
import assert from 'node:assert/strict';
import {makeGraph,normalizeTabs,safeDomain} from '../../src/mission/model.ts';
import {hitTest,worldToScreen} from '../../src/mission/draw.ts';
const raw=[{id:1,windowId:1,title:'Docs',url:'https://docs.example.org',active:true}, {id:2,windowId:1,url:'https://docs.example.org/help'}, {id:3,windowId:2,url:'chrome://settings',incognito:true}];
test('normalization excludes incognito and preserves distinct tabs',()=>{const items=normalizeTabs(raw);assert.equal(items.length,2);assert.notEqual(items[0].id,items[1].id);});
test('graph edges represent real domain grouping',()=>{const result=makeGraph(normalizeTabs(raw));assert.ok(result.edges.some(edge=>edge.kind==='domain'));});
test('safeDomain rejects unsafe schemes',()=>{assert.equal(safeDomain('javascript:alert(1)'),'internal');});
test('hit detection respects graph camera',()=>{const nodes=makeGraph(normalizeTabs(raw)).nodes;const camera={x:0,y:0,scale:1};const p=worldToScreen(nodes[0].x,nodes[0].y,camera,800,500);assert.equal(hitTest(nodes,p.x,p.y,camera,800,500),nodes[0].id);});
