import test from 'node:test';
import assert from 'node:assert/strict';
import { stableColor } from '../src/domain/toolkit/stable-color.ts';

test('feat: select repeatable colors per domain', () => {
  assert.equal(stableColor('GitHub.com'),stableColor('github.com'));
  assert.match(stableColor('example.net'),/^#[a-f0-9]{6}$/);
});
