export type LabelBox={x:number;y:number;width:number;height:number};
export function labelsOverlap(a: LabelBox,b: LabelBox,margin=0): boolean {
  if (![a.x,a.y,a.width,a.height,b.x,b.y,b.width,b.height].every(Number.isFinite)) return false;
  const pad=Math.max(0,margin);
  return a.x < b.x+b.width+pad && a.x+a.width+pad>b.x && a.y<b.y+b.height+pad && a.y+a.height+pad>b.y;
}
