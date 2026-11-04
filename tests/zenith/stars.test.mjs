import test from 'node:test';import assert from 'node:assert/strict';
import {makeStars} from '../../src/zenith/ui/stars.ts';
test('star distribution is reproducible and safely normalized',()=>{
 const stars=makeStars(100);assert.deepEqual(stars,makeStars(100));
 assert.ok(stars.every(s=>s.x>=0&&s.x<1&&s.y>=0&&s.y<1&&s.r>0));
});
