import test from 'node:test';
import assert from 'node:assert/strict';
import { tabState } from '../src/domain/toolkit/tab-state.ts';

test('feat: derive readable browser tab states', () => {
  assert.equal(tabState({active:true,audible:true,muted:false,pinned:true}), 'active');
  assert.equal(tabState({active:false,audible:true,muted:true,pinned:false}), 'muted');
  assert.equal(tabState({active:false,audible:false,muted:false,pinned:false}), 'idle');
});
