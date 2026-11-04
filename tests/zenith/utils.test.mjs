import test from 'node:test';import assert from 'node:assert/strict';
import {filterTabs,uniqueDomains,windowsCount,safeTitle} from '../../src/zenith/core/utils.ts';
import {demoTabs} from '../../src/zenith/core/tabs.ts';
test('tab filters select by title and URL without mutating input',()=>{
 const before=demoTabs.length;assert.equal(filterTabs(demoTabs,'GITHUB').length,1);
 assert.equal(filterTabs(demoTabs,'unfindable-123' ).length,0);assert.equal(demoTabs.length,before);
});
test('session counts are based on actual distinct windows and domains',()=>{
 assert.equal(windowsCount(demoTabs),2);assert.equal(uniqueDomains(demoTabs),demoTabs.length);
 assert.ok(safeTitle({...demoTabs[0],title:'<script>'}).includes('&lt;script&gt;'));
});
