import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const controller=readFileSync(new URL('../../src/nova/main.ts',import.meta.url),'utf8');
test('Nova controller cleans up the WebGL renderer and feature event subscriptions',()=>{
 assert.match(controller,/scene\?\.dispose/);assert.match(controller,/panelDispose\?\.\(\)/);
 assert.match(controller,/scene\.update\(tabs\)/);assert.match(controller,/createShell/);
});
test('live browser actions only run when tab permissions exist',()=>{
 assert.match(controller,/if\(!hasLiveTabs\(\)\)/);assert.match(controller,/applyTabAction/);
});
