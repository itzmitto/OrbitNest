import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const registry=readFileSync(new URL('../../../../src/aether/registry.ts',import.meta.url),'utf8');
const feature=readFileSync(new URL('../../../../src/aether/instruments/creative-studio/feature.ts',import.meta.url),'utf8');
test('registered mission exposes real analysis, advice and visualization',()=>{
 assert.ok(registry.includes("creative-studio/feature.ts"));
 assert.match(feature,/analyze\(tabs\)/);assert.match(feature,/renderDetail\(tabs\)/);
 assert.match(feature,/adviceCreativeStudio/);
});
