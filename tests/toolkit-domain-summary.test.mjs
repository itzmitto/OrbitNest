import test from 'node:test';
import assert from 'node:assert/strict';
import { domainSummary } from '../src/domain/toolkit/domain-summary.ts';

test('feat: summarize tabs by domain safely', () => {
  const tabs = [{ domain: 'GitHub.com' },{ domain: 'github.com' },{ domain: 'react.dev' }];
  assert.deepEqual(domainSummary(tabs).map(x => x.count), [2,1]);
  assert.equal(tabs[0].domain, 'GitHub.com');
});
