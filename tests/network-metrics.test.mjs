import test from 'node:test';import assert from 'node:assert/strict';
import {graphStats} from '../src/network/metrics.ts';
test('graph stats measure only existing metadata',()=>{const model={points:[{id:1,windowId:1,tab:{pinned:true}},{id:2,windowId:2,tab:{pinned:false}}],edges:[{source:1,target:2}],groupNames:['one','two']};assert.deepEqual(graphStats(model),{planets:2,links:1,groups:2,windows:2,pinned:1});});
