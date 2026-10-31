import test from 'node:test';
import assert from 'node:assert/strict';
import { duplicateTabIds } from '../src/domain/duplicates.ts';

test('test: ignore URL fragments when checking tab duplicates',()=>{
  const rows=[{id:1,url:'https://example.com/a#intro'},{id:2,url:'https://example.com/a#end'},{id:3,url:'https://example.com/b'}];
  assert.deepEqual([...duplicateTabIds(rows)].sort(),[1,2]);
});
