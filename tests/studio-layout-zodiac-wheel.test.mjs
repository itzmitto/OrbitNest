import test from 'node:test';import assert from 'node:assert/strict';
import { layoutZodiacWheel } from '../src/studio/layouts/zodiac-wheel.ts';
const tabs=Array.from({length:40},(_,i)=>({id:i+1,domain:i%3?'github.com':'example.org',windowId:i%4,title:'Tab '+i,active:i===0,pinned:i===1,audible:false,muted:false,loading:false,discarded:false,url:'https://github.com'}));
test('Zodiac Wheel maps 40 independent tab identities to finite, repeatable positions',()=>{const first=layoutZodiacWheel.place(tabs);assert.equal(first.length,40);assert.equal(new Set(first.map(x=>x.id)).size,40);assert.deepEqual(layoutZodiacWheel.place(tabs),first);assert.ok(first.every(n=>Number.isFinite(n.x)&&Number.isFinite(n.y)));assert.equal(layoutZodiacWheel.place([]).length,0);});
