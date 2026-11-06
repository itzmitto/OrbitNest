import test from 'node:test';import assert from 'node:assert/strict';
import {displayDiagnostics,qualityLabel} from '../../src/nova/core/diagnostics.ts';
test('diagnostic display caps expensive high DPI rendering values',()=>{
 const value=displayDiagnostics({devicePixelRatio:4,reducedMotion:false,webgl:true});
 assert.equal(value.pixelRatio,2);assert.match(qualityLabel(value),/WEBGL2/);
});
test('missing WebGL2 provides explicit fallback guidance',()=>{
 const value=displayDiagnostics({devicePixelRatio:1,reducedMotion:true,webgl:false});
 assert.equal(value.mode,'fallback');assert.match(qualityLabel(value),/NO WEBGL2/);
});
