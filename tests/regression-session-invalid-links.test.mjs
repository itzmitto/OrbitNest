import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSession } from '../src/domain/session.ts';

test('test: reject script URLs and huge session records',()=>{
  const common={version:1,name:'Test',savedAt:'2026-10-31T12:00:00Z'};
  assert.equal(parseSession({...common,urls:['javascript:alert(1)']}),null);
  assert.equal(parseSession({...common,urls:['a'.repeat(10000)]}),null);
});
