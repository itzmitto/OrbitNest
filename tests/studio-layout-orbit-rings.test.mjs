import test from 'node:test';import assert from 'node:assert/strict';
import { layoutOrbitRings } from '../src/studio/layouts/orbit-rings.ts';
const tabs=Array.from({length:40},(_,i)=>({id:i+1,domain:i%3?'github.com':'example.org',windowId:i%4,title:'Tab '+i,active:i===0,pinned:i===1,audible:false,muted:false,loading:false,discarded:false,url:'https://github.com'}));
test('Orbital Rings maps 40 independent tab identities to finite, repeatable positions',()=>{const first=layoutOrbitRings.place(tabs);assert.equal(first.length,40);assert.equal(new Set(first.map(x=>x.id)).size,40);assert.deepEqual(layoutOrbitRings.place(tabs),first);assert.ok(first.every(n=>Number.isFinite(n.x)&&Number.isFinite(n.y)));assert.equal(layoutOrbitRings.place([]).length,0);});
