import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../../../../src/aether/instruments/domain-systems/view.ts',import.meta.url),'utf8');
test('signal view uses accessible shared chart and local data',()=>{
 assert.match(source,/createSignalChart/);assert.match(source,/segmentDomainSystems/);
 assert.match(source,/\.textContent/);assert.match(source,/dataset\.instrument/);
});
