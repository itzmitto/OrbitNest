import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const css=readFileSync(new URL('../../src/aether/styles/main.css',import.meta.url),'utf8');
test('cockpit has responsive layout, reduced motion and visible keyboard focus',()=>{
 assert.match(css,/:focus-visible/);assert.match(css,/prefers-reduced-motion/);assert.match(css,/@media\(max-width:950px\)/);
 assert.match(css,/\.aether-scene/);assert.match(css,/\.aether-planets/);
});
