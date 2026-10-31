import test from 'node:test';
import assert from 'node:assert/strict';
import { rankTab } from '../src/domain/toolkit/tab-ranking.ts';

test('feat: rank tab search matches by relevance', () => {
  const base={title:'React Documentation',domain:'react.dev',active:false,pinned:false};
  assert.equal(rankTab(base,'react.dev'),90);
  assert.equal(rankTab(base,'react'),75);
  assert.equal(rankTab(base,'missing'),0);
});
