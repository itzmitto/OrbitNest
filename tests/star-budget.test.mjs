import test from 'node:test'; import assert from 'node:assert/strict';
import { adaptiveStarBudget } from '../src/domain/star-budget.ts';
test('star budget protects high density maps and reduced motion',()=>{
 assert.equal(adaptiveStarBudget(220,160,'auto',false),52);
 assert.equal(adaptiveStarBudget(220,10,'battery',false),38);
 assert.equal(adaptiveStarBudget(220,10,'cinematic',true),30);
 assert.equal(adaptiveStarBudget(NaN,10,'auto',false),0);
 assert.equal(adaptiveStarBudget(12,5,'auto',false),12);
});
