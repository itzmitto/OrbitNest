import test from 'node:test';
import assert from 'node:assert/strict';
import { retainedSelection } from '../src/domain/toolkit/selected-tab.ts';

test('feat: preserve selection across live tab updates', () => {
  const tabs=[{id:1,active:false},{id:2,active:true}];
  assert.equal(retainedSelection(tabs,1),1);
  assert.equal(retainedSelection(tabs,42),2);
  assert.equal(retainedSelection([],42),null);
});
