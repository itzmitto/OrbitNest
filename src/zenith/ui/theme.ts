import type {ThemeName} from '../core/types.ts';
export const themeOptions:Partial<Record<ThemeName,{name:string;light:string;ring:string}>>={
 nebula:{name:'Nebula Violet',light:'#b5a0ff',ring:'#7dcaff'},
 eclipse:{name:'Black Eclipse',light:'#e1e4f5',ring:'#b6bbcb'},
 aurora:{name:'Arctic Aurora',light:'#7cf2cb',ring:'#59c0d6'},
 solar:{name:'Solar Flare',light:'#ffc77f',ring:'#eb815e'}
};
export function applyTheme(name:ThemeName):void{document.documentElement.dataset.theme=name;}
