import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCameraPreference, DEFAULT_CAMERA } from '../src/domain/camera-preferences.ts';
test('camera restores a valid local preference', () => {
  assert.deepEqual(parseCameraPreference(JSON.stringify({zoom:1.4,offset:{x:42,y:-85}})),{zoom:1.4,offset:{x:42,y:-85}});
});
test('camera rejects malformed storage and absurd coordinates', () => {
  assert.deepEqual(parseCameraPreference('{bad json'),DEFAULT_CAMERA);
  assert.deepEqual(parseCameraPreference(JSON.stringify({zoom:90,offset:{x:Infinity,y:0}})),DEFAULT_CAMERA);
  assert.deepEqual(parseCameraPreference(JSON.stringify({zoom:1,offset:{x:90000,y:0}})),DEFAULT_CAMERA);
});
