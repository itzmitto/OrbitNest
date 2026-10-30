import test from 'node:test';
import assert from 'node:assert/strict';
import { extractDomain, normalizeTab } from '../src/domain/normalize.ts';
test('domain extraction is safe for internal URLs', () => {
  assert.equal(extractDomain('https://www.github.com/project'), 'github.com');
  assert.equal(extractDomain('chrome://extensions'), 'chrome page');
  assert.equal(extractDomain('not a url'), 'Unknown page');
});
test('incognito entries and entries without numeric ID are excluded', () => {
  const base = { id: 3, windowId: 1, index: 0, active: false, pinned: false };
  assert.equal(normalizeTab({ ...base, incognito: true }), null);
  assert.equal(normalizeTab({ ...base, id: undefined }), null);
  assert.equal(normalizeTab({ ...base }).title, 'Unknown page');
});
