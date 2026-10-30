import test from 'node:test';import assert from 'node:assert/strict';
import { hitPlanet } from '../src/graph/hit.ts';
test('hit testing selects topmost planet',()=>{const points=[{id:1,x:10,y:10,r:8},{id:2,x:10,y:10,r:8}];assert.equal(hitPlanet(points,10,10)?.id,2);assert.equal(hitPlanet(points,100,100),undefined);});
