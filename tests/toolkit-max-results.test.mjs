import test from 'node:test';
import assert from 'node:assert/strict';
import { maxResults } from '../src/domain/toolkit/max-results.ts';

test('feat: cap search result lists for responsiveness', () => {
  const input=[1,2,3,4];
  assert.deepEqual(maxResults(input,2),[1,2]);
  assert.deepEqual(maxResults(input,-1),[]);
  assert.deepEqual(input,[1,2,3,4]);
});
