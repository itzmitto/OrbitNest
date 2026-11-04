import test from 'node:test';import assert from 'node:assert/strict';
import {defaults} from '../../src/zenith/core/state.ts';
test('default preferences are accessible and have bounded scale',()=>{
 assert.ok(defaults.planetScale>=.6&&defaults.planetScale<=1.6);
 assert.equal(defaults.showLabels,true);
});
