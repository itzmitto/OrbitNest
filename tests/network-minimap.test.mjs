import test from 'node:test';import assert from 'node:assert/strict';
import {minimapProjection} from '../src/network/minimap.ts';
test('mini-map keeps nodes bounded and retains identifiers',()=>{const result=minimapProjection([{id:10,x:-20,y:0,colorIndex:0},{id:20,x:50,y:700,colorIndex:1}],164,110);assert.deepEqual(result.map(n=>n.id),[10,20]);assert.ok(result.every(p=>p.x>=0&&p.x<=164&&p.y>=0&&p.y<=110));});
