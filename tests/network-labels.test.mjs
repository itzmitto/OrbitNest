import test from 'node:test';import assert from 'node:assert/strict';
import {chooseGraphLabels} from '../src/network/labels.ts';
test('labels do not overlap when worlds are adjacent',()=>{const p=(id,x)=>({id,x,y:0,radius:8,domain:'github.com',tab:{pinned:false,active:false}});assert.equal(chooseGraphLabels([p(1,0),p(2,2),p(3,300)],1).length,2);});
