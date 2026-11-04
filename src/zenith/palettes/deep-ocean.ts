import type {Palette} from '../core/types.ts';
/** An offline palette for the Deep Ocean atmosphere, applied by the theme selector. */
export const paletteDeepOcean:Palette={
 id:'deep-ocean',name:'Deep Ocean',background:'#060e20',accent:'#1c3e81',second:'#41c8d8'
};
export function paletteDeepOceanContrast():number{
 const hex=paletteDeepOcean.accent.slice(1);
 const rgb=[0,2,4].map(offset=>parseInt(hex.slice(offset,offset+2),16)/255);
 const luminance=rgb.map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return .2126*luminance[0]+.7152*luminance[1]+.0722*luminance[2];
}
