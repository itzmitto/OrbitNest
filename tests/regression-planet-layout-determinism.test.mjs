import test from 'node:test';
import assert from 'node:assert/strict';
import { createPlanetNodes } from '../src/graph/planet-system.ts';

test('test: keep planetary coordinates stable when tabs repeat',()=>{
  const tabs=[{id:4,domain:'github.com'},{id:7,domain:'react.dev'}];
  const first=createPlanetNodes(tabs,900,600);
  const second=createPlanetNodes(tabs,900,600);
  assert.deepEqual(first.map(n=>[n.id,n.x,n.y,n.kind]),second.map(n=>[n.id,n.x,n.y,n.kind]));
});
