import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const registry=readFileSync(new URL('../../../../src/aether/registry.ts',import.meta.url),'utf8');
const feature=readFileSync(new URL('../../../../src/aether/instruments/domain-relay/feature.ts',import.meta.url),'utf8');
test('registered mission exposes real analysis, advice and visualization',()=>{
 assert.ok(registry.includes("domain-relay/feature.ts"));
 assert.match(feature,/analyze\(tabs\)/);assert.match(feature,/renderDetail\(tabs\)/);
 assert.match(feature,/adviceDomainRelay/);
});
