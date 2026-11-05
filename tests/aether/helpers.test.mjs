import test from 'node:test';import assert from 'node:assert/strict';
import {host,normalizedUrl,countBy,topEntries,byWindow,readableDuration,safeHttp} from '../../src/aether/core/helpers.ts';
const tabs=[{id:1,windowId:7},{id:2,windowId:7},{id:3,windowId:8}];
test('normalize safe web links without stripping meaningful query',()=>{
 assert.equal(normalizedUrl('https://WWW.Example.com/test/#anchor'),'https://www.example.com/test');
 assert.equal(normalizedUrl('https://example.com/p?search=cat#x'),'https://example.com/p?search=cat');
 assert.equal(normalizedUrl('chrome://settings'),'chrome://settings');
});
test('count and rank groups deterministically',()=>{
 assert.deepEqual(topEntries(countBy(['x','y','x'],s=>s)),[['x',2],['y',1]]);
 assert.equal(byWindow(tabs).get(7).length,2);
});
test('hostnames, URL safety and readable clock',()=>{
 assert.equal(host('https://www.example.com/a'),'example.com');
 assert.equal(host('chrome://newtab/'),'Local page');
 assert.equal(safeHttp('javascript:alert(1)'),false);
 assert.equal(readableDuration(3679),'1h 01m');
});
