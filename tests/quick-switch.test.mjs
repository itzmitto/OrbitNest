import test from 'node:test';
import assert from 'node:assert/strict';
import { quickSwitchResults } from '../src/domain/quick-switch.ts';
import { sampleTabs } from '../src/domain/sample.ts';
test('quick switch respects relevance and is limited', () => {
  const chosen = quickSwitchResults(sampleTabs,'',2);
  assert.equal(chosen.length,2);
  assert.equal(quickSwitchResults(sampleTabs,'no matching planet').length,0);
  assert.deepEqual(sampleTabs.map(tab=>tab.id),sampleTabs.map(tab=>tab.id));
});
