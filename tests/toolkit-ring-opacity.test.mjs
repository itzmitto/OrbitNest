import test from 'node:test';
import assert from 'node:assert/strict';
import { ringOpacity } from '../src/domain/toolkit/ring-opacity.ts';

test('feat: tune orbit visibility for dense galaxies', () => {
  assert.ok(ringOpacity(15,true)>ringOpacity(15,false));
  assert.ok(ringOpacity(200,false)<ringOpacity(10,false));
});
