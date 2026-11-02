import test from 'node:test';import assert from 'node:assert/strict';
import {buildGraph} from '../src/network/model.ts';import {layoutGraph} from '../src/network/layout.ts';import {relaxGraph} from '../src/network/forces.ts';
const tabs=Array.from({length:20},(_,id)=>({id,title:`Tab ${id}`,domain:`site${id%3}.example`,windowId:1,pinned:false,audible:false,active:false,index:id,url:null,favIconUrl:null,muted:false}));
test('layout is stable across repeated evaluations',()=>{const g=buildGraph(tabs);assert.deepEqual(layoutGraph(g),layoutGraph(g));});
test('bounded force pass is finite and does not mutate initial nodes',()=>{const g=buildGraph(tabs),before=layoutGraph(g),after=relaxGraph(before,g.edges);assert.notEqual(before[0],after[0]);assert.ok(after.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));});
