import test from 'node:test';
import assert from 'node:assert/strict';
import { keyboardCameraOffset } from '../src/graph/keyboard-navigation.ts';
test('arrow keys pan viewport independently and Home resets', () => {
  const start = {x:10,y:20};
  assert.deepEqual(keyboardCameraOffset('ArrowUp',start), {x:10,y:66});
  assert.deepEqual(keyboardCameraOffset('ArrowRight',start), {x:-36,y:20});
  assert.deepEqual(keyboardCameraOffset('Home',start), {x:0,y:0});
  assert.deepEqual(start,{x:10,y:20});
});
