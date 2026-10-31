import test from 'node:test';
import assert from 'node:assert/strict';
import { tabFlags } from '../src/domain/toolkit/tab-flags.ts';

test('feat: expose compact tab status flags', () => {
  assert.deepEqual(tabFlags({active:true,pinned:true,muted:false,audible:true}), ['Current tab','Pinned','Playing audio']);
  assert.deepEqual(tabFlags({active:false,pinned:false,muted:true,audible:true}), ['Muted']);
});
