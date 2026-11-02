import type { GraphEdge, GraphPoint, GraphTheme, GraphViewport } from './types.ts';
import { graphToScreen } from './camera.ts';
import { graphColor } from './palette.ts';
import { chooseGraphLabels } from './labels.ts';

export type DrawOptions = Readonly<{ theme: GraphTheme; showLinks: boolean; highlight: number | null; time: number; glow: boolean }>;

function atmosphere(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, bright: boolean) {
  ctx.save();
  const halo = ctx.createRadialGradient(x, y, radius * 0.7, x, y, radius * (bright ? 4.1 : 2.4));
  halo.addColorStop(0,color + '66'); halo.addColorStop(1,'#00000000');
  ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(x,y,radius * (bright ? 4.1 : 2.4),0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function planet(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string, active: boolean, t: number) {
  const r = Math.max(2,radius);
  atmosphere(ctx,x,y,r,color,active);
  const fill = ctx.createRadialGradient(x-r*.36, y-r*.43, r*.08, x,y,r);
  fill.addColorStop(0,'#ffffff'); fill.addColorStop(.19,color); fill.addColorStop(.68,color); fill.addColorStop(1,'#080e25');
  ctx.fillStyle = fill;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle = active ? '#ffffff' : '#ffffff40'; ctx.lineWidth = active ? 2.1 : .6;ctx.stroke();
  // A delicate spinning ring makes the node read like a tiny world rather than a flat dot.
  if (r > 7) {
    ctx.save();ctx.translate(x,y);ctx.rotate(-0.25+Math.sin(t*.00028)*.10);
    ctx.strokeStyle = active ? '#dcf8ffcc' : color+'75';ctx.lineWidth = active ? 2 : .9;
    ctx.beginPath();ctx.ellipse(0,0,r*1.55,r*.52,0,0,Math.PI*2);ctx.stroke();ctx.restore();
  }
}
export function paintNetwork(ctx: CanvasRenderingContext2D, points: readonly GraphPoint[], edges: readonly GraphEdge[], camera: GraphViewport,
  width: number, height: number, options: DrawOptions) {
  ctx.clearRect(0,0,width,height);
  // Stars are reproducible without saving any browser data or using a networking service.
  for (let i = 0; i < 170; i++) {
    const px = (i * 239.35 + 74) % width, py = (i * 137.71 + 26) % height;
    const alpha = options.glow ? .10 + Math.abs(Math.sin(i * 4.7 + options.time * .00018)) * .26 : .14;
    ctx.fillStyle = `rgba(165,189,245,${alpha})`;
    ctx.fillRect(px,py, i % 23 === 0 ? 2 : 1, i % 23 === 0 ? 2 : 1);
  }
  const indexed = new Map(points.map(point => [point.id,point]));
  if (options.showLinks) {
    for (const edge of edges) {
      const first = indexed.get(edge.source), second = indexed.get(edge.target);
      if (!first || !second) continue;
      const a=graphToScreen(first.x,first.y,width,height,camera), b=graphToScreen(second.x,second.y,width,height,camera);
      if ((a.x < -50 && b.x < -50) || (a.x > width+50 && b.x > width+50) || (a.y < -50 && b.y < -50) || (a.y > height+50 && b.y > height+50)) continue;
      const emphasized = options.highlight !== null && (edge.source===options.highlight || edge.target===options.highlight);
      ctx.beginPath(); ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
      ctx.strokeStyle = emphasized ? '#b1d9ffb3' : edge.kind === 'group' ? '#9cafd638' : '#9a9cc51d';
      ctx.lineWidth = emphasized ? 1.7 : edge.kind === 'group' ? 0.85 : 0.55;ctx.stroke();
    }
  }
  for (const point of points) {
    const s = graphToScreen(point.x,point.y,width,height,camera);
    if (s.x < -70 || s.x > width+70 || s.y < -70 || s.y > height+70) continue;
    planet(ctx,s.x,s.y, Math.max(3.4,point.radius*camera.zoom),graphColor(point.colorIndex,options.theme),point.id===options.highlight || point.tab.active,options.time);
  }
  if (points.length < 190 && camera.zoom >= 0.6) {
    ctx.textAlign='center';ctx.textBaseline='top';ctx.font='500 11px system-ui';
    for (const label of chooseGraphLabels(points,camera.zoom,24)) {
      const screen=graphToScreen(label.x,label.y,width,height,camera);
      if (screen.x < 25 || screen.x > width-25 || screen.y<10 || screen.y>height-22) continue;
      ctx.fillStyle='#bdd0ebbc';ctx.fillText(label.text,screen.x,screen.y,112);
    }
  }
}
