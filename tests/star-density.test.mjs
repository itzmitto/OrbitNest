import test from 'node:test';import assert from 'node:assert/strict';
import {parseStarDensity,STAR_COUNTS} from '../src/domain/star-density.ts';
import {createStarfield} from '../src/graph/starfield.ts';
test('star density settings are bounded and validated',()=>{
 assert.equal(parseStarDensity('oops'),'classic');
 assert.equal(parseStarDensity('cinematic'),'cinematic');
 for(const count of Object.values(STAR_COUNTS))assert.equal(createStarfield(count).length,count);
});
