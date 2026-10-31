import test from 'node:test';
import assert from 'node:assert/strict';
import { hostFamily } from '../src/domain/toolkit/host-family.ts';

test('feat: group related subdomains in tab reports', () => {
  assert.equal(hostFamily('docs.github.com'), 'github.com');
  assert.equal(hostFamily('site.example.co.uk'), 'example.co.uk');
  assert.equal(hostFamily('localhost'), 'localhost');
});
