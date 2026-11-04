export const TAU = Math.PI * 2;
export const clamp = (value: number, low: number, high: number): number => Math.max(low, Math.min(high, value));
export function hashText(value: string): number {
  let result = 2166136261;
  for (let i=0;i<value.length;i++) { result ^= value.charCodeAt(i); result = Math.imul(result,16777619); }
  return result >>> 0;
}
export function seededRandom(seed: number): number {
  let n=seed+0x6D2B79F5;n=Math.imul(n^(n>>>15),n|1);
  n^=n+Math.imul(n^(n>>>7),n|61);return ((n^(n>>>14))>>>0)/4294967296;
}
export const lerp=(a:number,b:number,t:number):number=>a+(b-a)*clamp(t,0,1);
export function formatHost(url:string):string {
  try { const u=new URL(url);return u.protocol==='http:'||u.protocol==='https:'?u.hostname.replace(/^www\./,''):'Local page'; }
  catch {return 'New tab';}
}
export function formatCount(value:number):string {return new Intl.NumberFormat('en-US').format(value);}
export function escapeHTML(value:string):string {return value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));}
