import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const code=readFileSync(new URL('../../src/nova/features/sessions.ts',import.meta.url),'utf8');
test('session restoration and deletion require human confirmation',()=>{
 assert.match(code,/window\.confirm\(`Open/);assert.match(code,/window\.confirm\(`Delete/);
 assert.match(code,/saveOrbits/);assert.match(code,/previewRestore/);
});
