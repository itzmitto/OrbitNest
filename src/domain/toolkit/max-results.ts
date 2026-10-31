export function maxResults<T>(items:readonly T[],requested=100):T[]{
  const limit=Number.isFinite(requested)?Math.max(0,Math.min(500,Math.floor(requested))):100;
  return items.slice(0,limit);
}
