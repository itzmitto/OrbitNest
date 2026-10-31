import test from 'node:test';
import assert from 'node:assert/strict';
import { makeTabMap } from '../src/domain/tab-map.ts';
import { sampleTabs } from '../src/domain/sample.ts';

test('tab map exports grouped titles without leaking URLs', () => {
  const map = makeTabMap(sampleTabs);
  assert.match(map, /# OrbitNest tab map/);
  assert.match(map, /Window \d+/);
  assert.ok(map.includes(sampleTabs[0].title));
  for (const item of sampleTabs) {
    if (item.url) assert.ok(!map.includes(item.url));
  }
});

test('tab map removes untrusted title line breaks', () => {
  const item = { ...sampleTabs[0], title: 'Hello\n## injected heading\rMore', url: 'https://secret.example.org/?token=top-secret' };
  const map = makeTabMap([item]);
  assert.ok(!map.includes('\n## injected'));
  assert.ok(!map.includes('top-secret'));
  assert.ok(map.includes('Hello ## injected heading More'));
});
