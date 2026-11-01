import test from 'node:test';import assert from 'node:assert/strict';
import {generateNebulaClouds} from '../src/graph/nebula-clouds.ts';
test('nebula clouds are bounded, finite and reproducible',()=>{
 const a=generateNebulaClouds(6);assert.deepEqual(a,generateNebulaClouds(6));
 assert.equal(a.length,6);
 assert.ok(a.every(x=>x.x>=0&&x.x<=100&&x.y>=0&&x.y<=100&&x.scale>0));
 assert.equal(generateNebulaClouds(500).length,9);
});
