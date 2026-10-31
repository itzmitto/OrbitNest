import test from 'node:test';
import assert from 'node:assert/strict';
import { validWebLink } from '../src/domain/toolkit/valid-web-link.ts';

test('feat: reject unsafe session restoration protocols', () => {
  assert.equal(validWebLink('https://github.com'),true);
  assert.equal(validWebLink('javascript:alert(1)'),false);
  assert.equal(validWebLink('https://user:pass@example.com'),false);
});
