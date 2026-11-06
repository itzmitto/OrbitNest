import test from 'node:test';import assert from 'node:assert/strict';
import {windowInsights,domainDistribution,tabBalance} from '../../src/nova/core/insights.ts';
const tabs=[{windowId:1,url:'https://docs.example.org',active:true,pinned:false,audible:false,muted:false},
 {windowId:1,url:'https://docs.example.org/help',active:false,pinned:false,audible:false,muted:false},
 {windowId:2,url:'https://youtube.com',active:false,pinned:false,audible:true,muted:false}];
test('domain distribution exposes percentages and deterministic counts',()=>{
 assert.equal(domainDistribution(tabs)[0].count,2);assert.equal(domainDistribution(tabs)[0].percentage,67);
});
test('window summary and balance distinguish active, reading and media',()=>{
 assert.equal(windowInsights(tabs).length,2);assert.equal(tabBalance(tabs).media,1);assert.equal(tabBalance(tabs).reading,1);
});
