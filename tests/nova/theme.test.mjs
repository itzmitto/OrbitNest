import test from 'node:test';import assert from 'node:assert/strict';
import {PALETTES,normalizeSettings} from '../../src/nova/core/theme.ts';
test('themes include three accessible contrasting atmospheric palettes',()=>{
 assert.deepEqual(PALETTES.map(x=>x.id),['void','aurora','ember']);
 assert.equal(normalizeSettings({theme:'nonexistent'}).theme,'void');
 assert.equal(normalizeSettings({density:'compact'}).density,'compact');
});
