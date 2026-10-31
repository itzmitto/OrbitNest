import test from 'node:test';
import assert from 'node:assert/strict';
import { searchTerms } from '../src/domain/toolkit/search-terms.ts';

test('feat: tokenize multi-word tab searches consistently', () => {
  assert.deepEqual(searchTerms('  Open   Source  '),['open','source']);
  assert.deepEqual(searchTerms('   '),[]);
  assert.deepEqual(searchTerms(null),[]);
});
