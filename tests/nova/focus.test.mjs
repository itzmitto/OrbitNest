import test from 'node:test';import assert from 'node:assert/strict';
import {proposeFocus,focusSummary,focusChecklist} from '../../src/nova/core/focus.ts';
const make=(id,extra={})=>({id,index:id,windowId:1,title:'',url:'https://site.test',active:false,pinned:false,audible:false,muted:false,discarded:false,...extra});
test('active and pinned planets outrank noisy background tabs',()=>{
 const items=proposeFocus([make(1,{active:true}),make(2,{audible:true}),make(3,{pinned:true})]);
 assert.equal(items[0].tab.id,1);assert.equal(items.at(-1).recommended,'mute');
});
test('quiet focus checklist never makes an unrequested destructive change',()=>{
 assert.equal(focusSummary([make(1,{muted:true})]).quiet,1);
 assert.match(focusChecklist([make(1)])[0],/calm/);
});
