import test from 'node:test';
import assert from 'node:assert/strict';
import {cyclePlanetFocus} from '../src/graph/planet-navigation.ts';
const nodes = [7,3,9].map(id=>({id}));
test('keyboard cycles independently and wraps around',()=>{
  assert.equal(cyclePlanetFocus(nodes,null,1),3);
  assert.equal(cyclePlanetFocus(nodes,3,-1),9);
  assert.equal(cyclePlanetFocus(nodes,9,1),3);
  assert.equal(cyclePlanetFocus([],null,1),null);
});
