import test from 'node:test'; import assert from 'node:assert/strict';
import {parseGalaxyPalette} from '../src/domain/galaxy-palette.ts';
test('palette values reject arbitrary and unsafe input',()=>{
 assert.equal(parseGalaxyPalette('aurora'),'aurora');
 assert.equal(parseGalaxyPalette('ember'),'ember');
 assert.equal(parseGalaxyPalette('script'),'midnight');
 assert.equal(parseGalaxyPalette(null),'midnight');
});
