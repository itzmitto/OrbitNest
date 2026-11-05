import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../../src/aether/ui/scene.ts',import.meta.url),'utf8');
test('3D cockpit reuses the existing WebGL2 UniverseScene',()=>{
 assert.match(source,/new UniverseScene/);assert.match(source,/new Starfield/);
 assert.match(source,/\.dispose\(\)/);assert.match(source,/onSelect/);
});
