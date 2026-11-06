import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const page=readFileSync(new URL('../../src/nova/features/duplicates.ts',import.meta.url),'utf8');
test('duplicate cleanup is a separate consent-based action',()=>{
 assert.match(page,/window\.confirm/);assert.match(page,/hasLiveTabs/);assert.match(page,/applyTabAction\(tab.id,'close'\)/);
});
