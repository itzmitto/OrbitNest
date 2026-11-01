export type NebulaCloud = {id:number; x:number; y:number; scale:number; hue:number; delay:number};
/** Static seeded positions; CSS animates atmosphere without per-frame React renders. */
export function generateNebulaClouds(count=6,seed=3481):NebulaCloud[] {
  const total=Number.isFinite(count)?Math.min(9,Math.max(0,Math.floor(count))):0;
  let state=seed>>>0;
  const random=()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296;};
  return Array.from({length:total},(_,id)=>({id,x:random()*100,y:random()*100,scale:0.6+random()*1.4,hue:190+random()*110,delay:-random()*26}));
}
