export type Star = { id: number; x: number; y: number; size: number; opacity: number; delay: number };
/** Deterministic pseudo-random positions; no Math.random on every React render. */
export function createStarfield(count: number, seed = 42): Star[] {
  const n = Number.isFinite(count) ? Math.max(0,Math.min(240,Math.floor(count))) : 0;
  let value = seed >>> 0;
  const next = () => { value = (Math.imul(value, 1664525) + 1013904223) >>> 0; return value / 4294967296; };
  return Array.from({length:n},(_,id)=>({id,x:next()*100,y:next()*100,size:0.7+next()*1.8,opacity:0.27+next()*0.67,delay:next()*-7}));
}
