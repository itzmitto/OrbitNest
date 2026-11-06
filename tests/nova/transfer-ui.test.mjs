import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const ui=readFileSync(new URL('../../src/nova/components/transfer.ts',import.meta.url),'utf8');
test('user selects import file and explicitly approves storage changes',()=>{
 assert.match(ui,/picker\.files/);assert.match(ui,/window\.confirm/);assert.match(ui,/saveOrbits/);
 assert.match(ui,/URL\.revokeObjectURL/);
});
