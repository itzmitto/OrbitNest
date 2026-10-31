import test from 'node:test';
import assert from 'node:assert/strict';
import { safeDomain } from '../src/domain/toolkit/safe-domain.ts';

test('feat: read domains without leaking URL secrets', () => {
  assert.equal(safeDomain('https://user:pass@GitHub.com:443/a?token=x'), 'github.com');
  assert.equal(safeDomain('chrome://settings'), null);
  assert.equal(safeDomain('not a url'), null);
});
