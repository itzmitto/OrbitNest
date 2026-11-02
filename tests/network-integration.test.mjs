import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';
const app=readFileSync(new URL('../src/App.tsx',import.meta.url),'utf8');
const graph=readFileSync(new URL('../src/components/NetworkGraph.tsx',import.meta.url),'utf8');
test('OrbitNest exposes the network as a real view alongside the 3D universe',()=>{assert.match(app,/view === 'network'/);assert.match(app,/NetworkGraph tabs=\{visibleTabs\}/);});
test('graph styling is loaded with the component, and keyboard access exists',()=>{assert.match(graph,/network\.css/);assert.match(graph,/tabIndex=\{0\}/);});
