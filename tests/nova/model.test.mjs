import test from 'node:test';
import assert from 'node:assert/strict';
import {clusterTabs, canonicalUrl, tabStats, domainOf, wordHue} from '../../src/nova/core/model.ts';
const tab = (id, url, windowId=1, props={}) => ({id, url, windowId, title:url, pinned:false, audible:false, muted:false, ...props});
test('cluster tab planets using stable domain identity', () => {
  const worlds = clusterTabs([tab(1,'https://www.example.com/a'), tab(2,'https://example.com/b'),tab(3,'chrome://settings')]);
  assert.equal(worlds[0].host, 'example.com'); assert.equal(worlds[0].count, 2);
  assert.equal(worlds[0].hue, wordHue('example.com'));
  assert.equal(domainOf('not a URL'), 'Unknown');
});
test('duplicate counts retain different queries and ignore fragments', () => {
  const tabs=[tab(1,'https://example.com/p#one'),tab(2,'https://example.com/p#two'),tab(3,'https://example.com/p?q=other',2,{pinned:true, audible:true})];
  assert.equal(tabStats(tabs).duplicates,1);assert.equal(tabStats(tabs).windows,2);
  assert.equal(tabStats(tabs).pinned,1);assert.equal(tabStats(tabs).audible,1);
  assert.equal(canonicalUrl('https://example.com/p/#a'),'https://example.com/p');
});
