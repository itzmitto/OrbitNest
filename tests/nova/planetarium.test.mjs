import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../../src/nova/components/planetarium.ts',import.meta.url),'utf8');
test('Nova uses the existing real WebGL cockpit instead of a fake planet placeholder',()=>{
 assert.match(source,/new AetherCockpit/);assert.match(source,/onSelect:/);assert.match(source,/renderer\.focus/);
 assert.match(source,/renderer\.startTour/);assert.match(source,/renderer\.dispose/);
});
