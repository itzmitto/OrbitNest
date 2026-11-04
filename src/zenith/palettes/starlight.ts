import type {Palette} from '../core/types.ts';
/** An offline palette for the Starlight atmosphere, applied by the theme selector. */
export const paletteStarlight:Palette={
 id:'starlight',name:'Starlight',background:'#0b1429',accent:'#b4c7f6',second:'#cad5fb'
};
export function paletteStarlightContrast():number{
 const hex=paletteStarlight.accent.slice(1);
 const rgb=[0,2,4].map(offset=>parseInt(hex.slice(offset,offset+2),16)/255);
 const luminance=rgb.map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return .2126*luminance[0]+.7152*luminance[1]+.0722*luminance[2];
}
