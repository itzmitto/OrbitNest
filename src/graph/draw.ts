import type { TabRecord } from '../domain/tab';
export type PlanetPoint = { id: number; x: number; y: number; r: number; tab: TabRecord };
export function drawUniverse(ctx: CanvasRenderingContext2D, width: number, height: number, points: PlanetPoint[], selected: number | null) {
  ctx.clearRect(0,0,width,height);
  const centerX=width/2,centerY=height/2;
  ctx.strokeStyle='#667eae33'; ctx.lineWidth=1;
  for(let i=1;i<=3;i++){ctx.beginPath();ctx.ellipse(centerX,centerY,Math.min(width*.45,110*i),Math.min(height*.45,74*i),0,0,Math.PI*2);ctx.stroke();}
  for(const point of points){
    const gradient=ctx.createRadialGradient(point.x-point.r*.3,point.y-point.r*.35,1,point.x,point.y,point.r*1.6);
    gradient.addColorStop(0,point.id===selected?'#d9fff8':'#b8c8ff');gradient.addColorStop(.4,point.id===selected?'#72d7bd':'#667fd5');gradient.addColorStop(1,'#263763');
    ctx.fillStyle=gradient;ctx.shadowBlur=point.id===selected?32:16;ctx.shadowColor='#647bdb77';ctx.beginPath();ctx.arc(point.x,point.y,point.r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  }
}
