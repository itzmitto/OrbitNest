/** Pixel-density budgets keep visual depth on laptops without overwhelming mobile GPUs. */
export type RenderTier='low'|'balanced'|'ultra';
export interface RenderBudget{pixelRatio:number;geometrySegments:number;starCount:number;labelLimit:number;}
export function chooseRenderBudget(width:number,devicePixelRatio:number,tier:RenderTier='balanced'):RenderBudget{
 const size=Math.max(0,width),dpr=Math.max(1,Math.min(3,devicePixelRatio||1));
 if(tier==='low'||size<480)return {pixelRatio:1,geometrySegments:26,starCount:95,labelLimit:12};
 if(tier==='ultra'&&size>=900)return {pixelRatio:Math.min(2,dpr),geometrySegments:64,starCount:320,labelLimit:60};
 return {pixelRatio:Math.min(1.5,dpr),geometrySegments:42,starCount:size<800?155:220,labelLimit:36};
}
export function pixelCost(width:number,height:number,ratio:number):number{return Math.round(Math.max(0,width)*Math.max(0,height)*ratio*ratio);}
export function tierFromFps(fps:number,current:RenderTier):RenderTier{
 if(!Number.isFinite(fps))return current;
 if(fps<23)return 'low';if(fps>55&&current==='low')return 'balanced';return current;
}
