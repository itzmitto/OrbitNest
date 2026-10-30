import test from 'node:test';import assert from 'node:assert/strict';
import { sortTabs } from '../src/domain/sort.ts';import { sampleTabs } from '../src/domain/sample.ts';
test('sort does not mutate its input',()=>{const original=sampleTabs.map(t=>t.id);sortTabs(sampleTabs,'title');assert.deepEqual(sampleTabs.map(t=>t.id),original);});
