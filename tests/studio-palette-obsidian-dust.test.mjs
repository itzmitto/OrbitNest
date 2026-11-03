import test from 'node:test';import assert from 'node:assert/strict';
import { paletteObsidianDust } from '../src/studio/palettes/obsidian-dust.ts';
test('Obsidian Dust has complete valid colors and bounded star count',()=>{const p=paletteObsidianDust;assert.equal(p.id,'obsidian-dust');for(const k of ['back','center','accent','planet','link'])assert.match(p[k],/^#[0-9a-f]{6}$/i);assert.ok(p.starDensity>=100&&p.starDensity<=350);});
