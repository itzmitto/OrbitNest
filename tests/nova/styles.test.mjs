import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const css=readFileSync(new URL('../../src/nova/styles/main.css',import.meta.url),'utf8');
test('nova design applies isolation, focus, responsive layouts and reduced motion',()=>{
 for(const selector of ['.nova-root','.nova-stage','.nova-sidebar','.nova-inspector-orb',':focus-visible','prefers-reduced-motion','max-width:580px'])assert.ok(css.includes(selector));
 assert.ok(css.includes('grid-template-columns'));assert.ok(css.includes('nova-cloud'));
});
