import test from 'node:test';
import assert from 'node:assert/strict';
import { parseSession } from '../src/domain/session.ts';

test('test: enforce safe upper bounds for restored session size',()=>{
  const normal={version:1,name:'Test',savedAt:'2026-10-31T12:00:00Z',urls:['https://example.com']};
  assert.equal(parseSession(normal).urls.length,1);
  assert.equal(parseSession({...normal,urls:Array(301).fill('https://example.com')}),null);
});
