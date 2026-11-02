import test from 'node:test';import assert from 'node:assert/strict';
import {graphToScreen,graphToWorld,graphZoomAt,graphFit} from '../src/network/camera.ts';
test('screen coordinates invert world coordinates',()=>{const view={x:13,y:-21,zoom:1.6},s=graphToScreen(200,100,800,600,view),w=graphToWorld(s.x,s.y,800,600,view);assert.ok(Math.abs(w.x-200)<.00001&&Math.abs(w.y-100)<.00001);});
test('zoom stays anchored to the same world position',()=>{const view={x:7,y:9,zoom:1},a=graphToWorld(100,150,800,600,view),next=graphZoomAt(view,-120,100,150,800,600),b=graphToWorld(100,150,800,600,next);assert.ok(Math.abs(a.x-b.x)<.001&&Math.abs(a.y-b.y)<.001);});
test('empty graphs get a default camera',()=>{assert.equal(graphFit([],800,600).zoom,1);});
