import test from 'node:test';
import assert from 'node:assert/strict';
import { labelsOverlap } from '../src/domain/toolkit/label-collision.ts';

test('feat: detect overlapping planet label boxes', () => {
  assert.equal(labelsOverlap({x:0,y:0,width:10,height:10},{x:8,y:8,width:10,height:10}),true);
  assert.equal(labelsOverlap({x:0,y:0,width:10,height:10},{x:30,y:30,width:10,height:10}),false);
});
