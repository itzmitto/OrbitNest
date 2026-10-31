import test from 'node:test';
import assert from 'node:assert/strict';
import { playingTabs } from '../src/domain/toolkit/audible-filter.ts';

test('feat: identify unmuted audible tabs', () => {
  const tabs=[{audible:true,muted:false},{audible:true,muted:true},{audible:false,muted:false}];
  assert.deepEqual(playingTabs(tabs),[tabs[0]]);
});
