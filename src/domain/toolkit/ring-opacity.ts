export function ringOpacity(planetCount: number, isSelected: boolean): number {
  const count=Math.max(0,Number.isFinite(planetCount)?planetCount:0);
  const density=Math.min(1,count/180);
  return Math.round((isSelected? .43:.26)*(1-density*.55)*1000)/1000;
}
