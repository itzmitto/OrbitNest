import test from 'node:test';
import assert from 'node:assert/strict';
import { tabCountLabel } from '../src/domain/toolkit/tab-count-label.ts';

test('feat: produce accessible tab-count announcements', () => {
  assert.equal(tabCountLabel(1,1),'1 tab available');
  assert.equal(tabCountLabel(3,12),'3 of 12 tabs visible');
  assert.equal(tabCountLabel(-2,0),'0 tabs available');
});
