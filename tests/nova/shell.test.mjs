import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const shell=readFileSync(new URL('../../src/nova/components/shell.ts',import.meta.url),'utf8');
test('Nova shell provides navigable, accessible landmarks',()=>{
 for (const id of ['nova-root','nova-inspector','nova-stage','nova-stats','nova-content']) assert.ok(shell.includes(id));
 assert.match(shell,/aria-label/);assert.match(shell,/createShell/);assert.match(shell,/renderStats/);
});
