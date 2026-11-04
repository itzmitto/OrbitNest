import test from 'node:test';import assert from 'node:assert/strict';
import {matchingDomains} from '../../src/zenith/core/collections.ts';
test('collections only match their explicitly saved star systems',()=>{
 const collection={id:'a',name:'Work',createdAt:'2026-11-04',domains:['github.com','figma.com']};
 assert.equal(matchingDomains(collection,'github.com'),true);
 assert.equal(matchingDomains(collection,'youtube.com'),false);
});
