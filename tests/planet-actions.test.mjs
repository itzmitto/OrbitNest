import test from 'node:test'; import assert from 'node:assert/strict';
import {allowedPlanetActions} from '../src/domain/planet-actions.ts';
import {sampleTabs} from '../src/domain/sample.ts';
test('planet controls never modify demo content',()=>{
 assert.equal(allowedPlanetActions(sampleTabs[0],true).canModify,false);
 assert.equal(allowedPlanetActions(undefined,false).canClose,false);
 assert.equal(allowedPlanetActions(sampleTabs[0],false).canClose,true);
});
