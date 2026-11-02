import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const text=readFileSync(new URL('../src/network/constellations.ts',import.meta.url),'utf8');
test('cluster halos only render for meaningful group size',()=>{assert.match(text,/members\.length < 3/);assert.match(text,/createRadialGradient/);});
