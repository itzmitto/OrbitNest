export type ClusterPoint={x:number;y:number};
export function clusterCenter(points: readonly ClusterPoint[]): ClusterPoint|null {
  const valid=points.filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y));
  if(!valid.length) return null;
  const sum=valid.reduce((acc,p)=>({x:acc.x+p.x,y:acc.y+p.y}),{x:0,y:0});
  return {x:sum.x/valid.length,y:sum.y/valid.length};
}
