import test from 'node:test';import assert from 'node:assert/strict';
import {filterGraph} from '../src/network/filters.ts';
const point=(id,title,pinned)=>({id,groupKey:'a',tab:{title,domain:'test.dev',pinned,audible:false,active:false}});
test('filter removes dangling edges and preserves tab identities',()=>{const graph={points:[point(1,'React Tutorial',true),point(2,'Music',false)],edges:[{source:1,target:2}],groupNames:['a']};const filtered=filterGraph(graph,'react','pinned');assert.equal(filtered.points.length,1);assert.equal(filtered.edges.length,0);assert.equal(graph.points.length,2);});
