import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const main=readFileSync(new URL('../../src/aether/main.ts',import.meta.url),'utf8');
const types=readFileSync(new URL('../../src/aether/core/types.ts',import.meta.url),'utf8');
test('Aether navigation opens Nova and disposes resources on route changes',()=>{
 assert.match(main,/data-view="nova"/);assert.match(main,/mountNova\(/);assert.match(main,/novaDispose\?\.\(\)/);
 assert.match(types,/\|'nova'/);
});
