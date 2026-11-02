import test from 'node:test';import assert from 'node:assert/strict';
import {inspectGraphPoint} from '../src/network/inspector.ts';
test('inspector omits URL and webpage content',()=>{const data=inspectGraphPoint({id:1,windowId:1,tab:{title:'My tab',domain:'example.com',url:'https://example.com/secret?token=abc',active:false,pinned:false,audible:false}});assert.ok(data);assert.equal(Object.hasOwn(data,'url'),false);assert.equal(JSON.stringify(data).includes('token'),false);});
