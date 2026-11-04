import test from 'node:test';import assert from 'node:assert/strict';
import {clamp,hashText,seededRandom,formatHost,escapeHTML} from '../../src/zenith/core/math.ts';
test('hash and random placement are deterministic',()=>{
 assert.equal(hashText('orbit'),hashText('orbit'));assert.notEqual(hashText('orbit'),hashText('planet'));
 assert.equal(seededRandom(53),seededRandom(53));assert.ok(seededRandom(53)>=0&&seededRandom(53)<1);
});
test('safe text helpers clamp and escape hostile text',()=>{
 assert.equal(clamp(-4,0,1),0);assert.equal(formatHost('https://www.github.com/a'),'github.com');
 assert.equal(escapeHTML('<script>'), '&lt;script&gt;');
});
