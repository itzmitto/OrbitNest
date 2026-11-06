import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const code=readFileSync(new URL('../../src/nova/features/settings.ts',import.meta.url),'utf8');
test('appearance controls use local browser storage and support motion opt-out',()=>{
 assert.match(code,/updateSettings/);assert.match(code,/motionCheck/);assert.match(code,/densityCheck/);
});
