import test from 'node:test';import assert from 'node:assert/strict';import {novaPanels} from '../../src/nova/features/registry.ts';
test('atlas panel is registered as a useful live view',()=>{
 assert.equal(novaPanels.find(p=>p.id==='systems')?.title,'Your star systems');
});
