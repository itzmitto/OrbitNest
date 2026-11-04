import test from 'node:test';import assert from 'node:assert/strict';
import {groupDomainCounts} from '../../src/zenith/core/scene.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('atlas groups tab worlds by hostname',()=>{
 const twice=[demoTabs[0],demoTabs[0],demoTabs[1]],groups=groupDomainCounts(twice);
 assert.equal(groups[0].count,2);assert.ok(groups[0].name.includes('github.com'));
});
