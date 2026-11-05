import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../../src/aether/main.ts',import.meta.url),'utf8');
test('users can start both camera tours and escape using Fit all',()=>{
 assert.match(source,/Cinematic orbit/);assert.match(source,/Planet flyover/);
 assert.match(source,/Fit all/);assert.match(source,/reduced-motion/);
});
