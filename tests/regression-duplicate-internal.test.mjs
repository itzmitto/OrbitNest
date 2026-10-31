import test from 'node:test';
import assert from 'node:assert/strict';
import { duplicateTabIds } from '../src/domain/duplicates.ts';

test('test: exclude browser-internal URLs from duplicate detection',()=>{
  const rows=[{id:1,url:'chrome://settings'},{id:2,url:'chrome://settings'},{id:3,url:null}];
  assert.equal(duplicateTabIds(rows).size,0);
});
