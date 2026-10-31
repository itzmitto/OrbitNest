import test from 'node:test';
import assert from 'node:assert/strict';
import { orbitCapacity } from '../src/domain/toolkit/orbit-capacity.ts';

test('feat: size orbit rings for visible tabs', () => {
  assert.equal(orbitCapacity(0),5);
  assert.equal(orbitCapacity(2,true),15);
  assert.equal(orbitCapacity(2,false),19);
  assert.equal(orbitCapacity(-1),0);
});
