import test from 'node:test';import assert from 'node:assert/strict';
import {layoutGraph,graphHash} from '../src/network/layout.ts';
test('domain color/position hash remains deterministic',()=>{assert.equal(graphHash('github.com'),graphHash('github.com'));});
test('a single cluster is positioned with finite coordinates',()=>{const model={groupNames:['domain:test'],edges:[],points:[{id:1,groupKey:'domain:test',radius:8,domain:'test',windowId:1,tab:{id:1}}]};const result=layoutGraph(model);assert.equal(result.length,1);assert.ok(Number.isFinite(result[0].x)&&Number.isFinite(result[0].y));});
