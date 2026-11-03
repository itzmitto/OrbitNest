import test from 'node:test';import assert from 'node:assert/strict';
import { lensMuted } from '../src/studio/lenses/muted.ts';
const sample=[
{id:1,url:'https://github.com/x#one',title:'First',domain:'github.com',windowId:1,active:true,pinned:true,audible:false,muted:false,loading:false,discarded:false},
{id:2,url:'https://github.com/x#two',title:'Second',domain:'github.com',windowId:1,active:false,pinned:false,audible:true,muted:false,loading:true,discarded:false},
{id:3,url:'http://example.org',title:'Third',domain:'example.org',windowId:2,active:false,pinned:false,audible:false,muted:true,loading:false,discarded:true}];
test('Muted stations lens preserves tab identities and never mutates input',()=>{const copy=structuredClone(sample);const result=lensMuted.filter(sample);assert.ok(result.every(t=>sample.includes(t)));assert.equal(new Set(result.map(t=>t.id)).size,result.length);assert.deepEqual(sample,copy);assert.deepEqual(lensMuted.filter([]),[]);});
