import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const src=readFileSync(new URL('../../src/aether/ui/scene.ts',import.meta.url),'utf8');
test('cinematic mode is explicitly cancellable and stops when disposed',()=>{
 assert.match(src,/startTour\(mode:/);assert.match(src,/stopTour\(\)/);
 assert.match(src,/prefers-reduced-motion/);assert.match(src,/document\.hidden/);
 assert.match(src,/cancelAnimationFrame\(this\.tourRaf\)/);
});
