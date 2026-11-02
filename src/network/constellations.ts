import type { GraphPoint } from './types';
import { graphColor } from './palette.ts';
import type { GraphTheme, GraphViewport } from './types';
import { graphToScreen } from './camera.ts';

/** Soft cluster silhouettes make groups perceptible without reading any webpage content. */
export function drawConstellations(ctx: CanvasRenderingContext2D, points: readonly GraphPoint[], view: GraphViewport, width: number, height: number, theme: GraphTheme) {
  const groups = new Map<string, GraphPoint[]>();
  for (const point of points) {
    const members = groups.get(point.groupKey) ?? [];
    members.push(point); groups.set(point.groupKey, members);
  }
  for (const members of groups.values()) {
    if (members.length < 3) continue;
    const mx = members.reduce((sum,p)=>sum+p.x,0)/members.length;
    const my = members.reduce((sum,p)=>sum+p.y,0)/members.length;
    const outer = Math.max(70, ...members.map(p=>Math.hypot(p.x-mx,p.y-my)+p.radius+18));
    const center = graphToScreen(mx,my,width,height,view);
    const r = outer * view.zoom;
    if (r < 8 || center.x + r < 0 || center.x-r > width || center.y+r < 0 || center.y-r > height)continue;
    const color = graphColor(members[0].colorIndex,theme);
    const gradient = ctx.createRadialGradient(center.x,center.y,0,center.x,center.y,r);
    gradient.addColorStop(0,color+'14');gradient.addColorStop(1,color+'00');
    ctx.beginPath();ctx.arc(center.x,center.y,r,0,2*Math.PI);ctx.fillStyle=gradient;ctx.fill();
    ctx.beginPath();ctx.arc(center.x,center.y,r*.94,0,2*Math.PI);ctx.strokeStyle=color+'16';ctx.lineWidth=.8;ctx.stroke();
  }
}
