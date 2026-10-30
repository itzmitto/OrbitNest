import test from 'node:test';
import assert from 'node:assert/strict';
import { sampleTabs } from '../src/domain/sample.ts';
test('preview contains five independent tab records', () => {
  assert.equal(sampleTabs.length, 5);
  assert.equal(new Set(sampleTabs.map((tab) => tab.id)).size, 5);
});
