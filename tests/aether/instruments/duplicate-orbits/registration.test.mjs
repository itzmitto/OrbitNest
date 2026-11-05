import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const registry=readFileSync(new URL('../../../../src/aether/registry.ts',import.meta.url),'utf8');
const feature=readFileSync(new URL('../../../../src/aether/instruments/duplicate-orbits/feature.ts',import.meta.url),'utf8');
test('registered mission exposes real analysis, advice and visualization',()=>{
 assert.ok(registry.includes("duplicate-orbits/feature.ts"));
 assert.match(feature,/analyze\(tabs\)/);assert.match(feature,/renderDetail\(tabs\)/);
 assert.match(feature,/adviceDuplicateOrbits/);
});
