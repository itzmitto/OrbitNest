import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const app=readFileSync(new URL('../../src/aether/main.ts',import.meta.url),'utf8');
test('application exposes planetarium, mission instruments, observatory and preferences',()=>{
 for(const view of ['planetarium','instruments','observatory','preferences'])assert.ok(app.includes(`'${view}'`));
 assert.match(app,/function disposeScene/);assert.match(app,/document\.createElement/);
 assert.match(app,/hasLiveTabs\(\)/);assert.match(app,/renderReport/);
});
