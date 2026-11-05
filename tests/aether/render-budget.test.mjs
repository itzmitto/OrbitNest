import test from 'node:test';import assert from 'node:assert/strict';
import {chooseRenderBudget,pixelCost,tierFromFps} from '../../src/aether/core/render-budget.ts';
test('mobile pixel ratio is bounded',()=>{assert.equal(chooseRenderBudget(320,3).pixelRatio,1);assert.ok(pixelCost(200,200,2)>pixelCost(200,200,1));});
test('render tiers respond to measured FPS without jumping unnecessarily',()=>{
 assert.equal(tierFromFps(19,'ultra'),'low');assert.equal(tierFromFps(58,'low'),'balanced');
 assert.equal(tierFromFps(35,'balanced'),'balanced');
});
