import test from 'node:test';import assert from 'node:assert/strict';
import {activePlanet,focusNext} from '../../src/zenith/core/focus.ts';
import {buildPlanets} from '../../src/zenith/core/scene.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('planet focus wraps across all available worlds',()=>{
 const planets=buildPlanets(demoTabs);assert.equal(activePlanet(planets)?.tab.id,demoTabs[0].id);
 assert.equal(focusNext(planets,planets.at(-1).id).planet?.id,planets[0].id);
 assert.equal(focusNext([],null).planet,null);
});
