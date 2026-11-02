import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../src/network/draw.ts',import.meta.url),'utf8');
test('network renderer includes gradients, lines and planet depth cues',()=>{assert.match(source,/createRadialGradient/);assert.match(source,/ctx\.ellipse/);assert.match(source,/edge\.kind/);});
