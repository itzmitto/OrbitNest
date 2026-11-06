import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const panel=readFileSync(new URL('../../src/nova/features/commands.ts',import.meta.url),'utf8');
const app=readFileSync(new URL('../../src/nova/main.ts',import.meta.url),'utf8');
test('command palette has keyboard access and removes its listeners on dispose',()=>{
 assert.match(app,/event\.metaKey/);assert.match(app,/event\.ctrlKey/);assert.match(app,/removeEventListener\('keydown'/);
 assert.match(panel,/context\.go/);assert.match(panel,/aria-label/);
});
