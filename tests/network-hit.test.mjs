import test from 'node:test';import assert from 'node:assert/strict';
import {pickGraphPoint} from '../src/network/hit.ts';
test('hit test selects a graph planet by screen position',()=>{const p={id:5,x:0,y:0,radius:7},view={x:0,y:0,zoom:1};assert.equal(pickGraphPoint([p],400,300,800,600,view)?.id,5);});
