import {paletteInterstellar} from './interstellar.ts';
import {paletteStarlight} from './starlight.ts';
import {paletteRedDwarf} from './red-dwarf.ts';
import {palettePinkNebula} from './pink-nebula.ts';
import {paletteDeepOcean} from './deep-ocean.ts';
import type {Palette} from '../core/types.ts';
export const palettes:Palette[]=[paletteInterstellar,paletteStarlight,paletteRedDwarf,palettePinkNebula,paletteDeepOcean,{id:'nebula',name:'Nebula',background:'#090c20',accent:'#9c92ff',second:'#58d8ee'}];
