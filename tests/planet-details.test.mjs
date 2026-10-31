import test from 'node:test';
import assert from 'node:assert/strict';
import { describePlanetTab } from '../src/domain/planet-details.ts';
import { sampleTabs } from '../src/domain/sample.ts';
test('details use existing tab metadata but do not expose the URL', () => {
  const desc = describePlanetTab(sampleTabs[0]);
  assert.ok(desc.title && desc.domain && desc.state && desc.windowLabel);
  assert.equal(JSON.stringify(desc).includes('https://'),false);
});
