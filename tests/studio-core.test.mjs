import test from 'node:test';import assert from 'node:assert/strict';
import {makeNodes,makeEdges} from '../src/studio/graph.ts';
import {layoutPresets} from '../src/studio/layouts/index.ts';
import {skyPalettes} from '../src/studio/palettes/index.ts';
import {tabLenses} from '../src/studio/lenses/index.ts';
const tab=(id,domain)=>({id,domain,title:domain,windowId:1,url:`https://${domain}`,active:false,pinned:false,audible:false,muted:false,loading:false,discarded:false});
test('the primary layout retains independently open tabs',()=>{const tabs=[tab(1,'github.com'),tab(2,'github.com'),tab(3,'example.com')];const nodes=makeNodes(tabs,layoutPresets[0]);assert.equal(nodes.length,3);assert.deepEqual(nodes.map(n=>n.id),[1,2,3]);assert.ok(makeEdges(nodes).some(e=>e.kind==='domain'));});
test('base palette and lens are safe',()=>{assert.equal(skyPalettes[0].id,'deep');assert.equal(tabLenses[0].filter([tab(1,'example.com')]).length,1);});
