import test from 'node:test';
import assert from 'node:assert/strict';
import { quickSwitchResults } from '../src/domain/quick-switch.ts';

test('test: cap keyboard quick-switch candidate counts',()=>{
  const tabs=Array.from({length:12},(_,id)=>({id,title:`Tab ${id}`,domain:'example.com',active:false,pinned:false}));
  assert.equal(quickSwitchResults(tabs,'',3).length,3);
  assert.equal(quickSwitchResults(tabs,'',-1).length,0);
});
