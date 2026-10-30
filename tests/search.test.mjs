import test from 'node:test';import assert from 'node:assert/strict';
import { searchTabs } from '../src/domain/search.ts';
import { sampleTabs } from '../src/domain/sample.ts';
test('search matches title or domain case-insensitively', () => {
  assert.equal(searchTabs(sampleTabs,'GITHUB').length,2);
  assert.equal(searchTabs(sampleTabs,'notfound').length,0);
  assert.equal(searchTabs(sampleTabs,'   ').length,sampleTabs.length);
});
