import test from 'node:test';import assert from 'node:assert/strict';
import {formations,lenses,getFormation,getLens} from '../../src/zenith/core/data.ts';
test('registry defaults are accessible',()=>{assert.ok(formations.length>=1);assert.ok(lenses.length>=1);
 assert.equal(getLens('not-a-lens').id,'all');assert.ok(getFormation('unknown').id);});
