import test from 'node:test';
import assert from 'node:assert/strict';
import { readOrbitPreference } from '../src/domain/orbit-preference.ts';
test('orbit lines default to visible and can be disabled explicitly', () => {
  assert.equal(readOrbitPreference(null),true);
  assert.equal(readOrbitPreference('true'),true);
  assert.equal(readOrbitPreference('false'),false);
});
