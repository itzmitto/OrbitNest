import test from 'node:test';
import assert from 'node:assert/strict';
import { planetRadius } from '../src/domain/toolkit/planet-radius.ts';

test('feat: scale planet size for dense constellations', () => {
  assert.ok(planetRadius(4,1200)>planetRadius(100,1200));
  assert.ok(planetRadius(1000,400)>=18);
  assert.equal(planetRadius(5,0),22);
});
