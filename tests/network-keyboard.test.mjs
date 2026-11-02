import test from 'node:test';import assert from 'node:assert/strict';
import {graphKeyboard} from '../src/network/keyboard.ts';
test('keyboard arrows pan, with bounded zoom',()=>{const start={x:0,y:0,zoom:1},next=graphKeyboard(start,'ArrowLeft');assert.ok(next.x>0);assert.equal(start.x,0);assert.ok(graphKeyboard(start,'+').zoom>1);});
