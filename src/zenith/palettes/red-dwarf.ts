import type {Palette} from '../core/types.ts';
/** An offline palette for the Red Dwarf atmosphere, applied by the theme selector. */
export const paletteRedDwarf:Palette={
 id:'red-dwarf',name:'Red Dwarf',background:'#200c18',accent:'#fe6c7b',second:'#e9ad6b'
};
export function paletteRedDwarfContrast():number{
 const hex=paletteRedDwarf.accent.slice(1);
 const rgb=[0,2,4].map(offset=>parseInt(hex.slice(offset,offset+2),16)/255);
 const luminance=rgb.map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return .2126*luminance[0]+.7152*luminance[1]+.0722*luminance[2];
}
