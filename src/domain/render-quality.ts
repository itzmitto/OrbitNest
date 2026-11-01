export type RenderQuality='auto'|'battery'|'cinematic';
export function parseRenderQuality(value:unknown):RenderQuality {
  return value==='battery'||value==='cinematic'?value:'auto';
}
export function frameInterval(tabCount:number,quality:RenderQuality):number {
  if(quality==='battery')return 45;
  if(quality==='cinematic')return tabCount>120?32:16;
  return tabCount>80?34:tabCount>35?24:16;
}
export function showDetailedRings(tabCount:number,quality:RenderQuality):boolean {
  return quality==='cinematic'?tabCount<160:quality==='battery'?tabCount<40:tabCount<100;
}
