import test from 'node:test';import assert from 'node:assert/strict';import { duplicateTabIds } from '../src/domain/duplicates.ts';
test('duplicate detection does not collapse independent tabs',()=>{const make=(id,url)=>({id,url});assert.deepEqual([...duplicateTabIds([make(1,'https://a.com/#top'),make(2,'https://a.com/#end')])],[1,2]);});
