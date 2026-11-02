import type { GraphNode, GraphEdge } from './model';
export type Camera = {x:number;y:number;scale:number};
export function worldToScreen(x:number,y:number,camera:Camera,w:number,h:number) {return {x:w/2+(x+camera.x)*camera.scale,y:h/2+(y+camera.y)*camera.scale};}
export function screenToWorld(x:number,y:number,camera:Camera,w:number,h:number) {return {x:(x-w/2)/camera.scale-camera.x,y:(y-h/2)/camera.scale-camera.y};}
export function hitTest(nodes:GraphNode[],x:number,y:number,camera:Camera,w:number,h:number):number|null {
  for(let i=nodes.length-1;i>=0;i--){const n=nodes[i];const p=worldToScreen(n.x,n.y,camera,w,h);if(Math.hypot(p.x-x,p.y-y)<=Math.max(13,n.radius*camera.scale+5))return n.id;}return null;
}
const colors=['#7ee6f4','#e9a6ff','#ffcc83','#8ef0bb','#8facff','#ff8e9e','#c1bcff'];
export function domainColor(domain:string){let hash=0;for(let i=0;i<domain.length;i++)hash=(hash*31+domain.charCodeAt(i))>>>0;return colors[hash%colors.length];}
export function paint(ctx:CanvasRenderingContext2D,nodes:GraphNode[],edges:GraphEdge[],camera:Camera,focus:Set<number>,selected:number|null,hover:number|null,time:number,mode:'network'|'planet',stars:boolean,w:number,h:number){
  ctx.clearRect(0,0,w,h);
  const bg=ctx.createRadialGradient(w*.46,h*.44,15,w*.5,h*.6,Math.max(w,h)*.8);bg.addColorStop(0,'#141f3f');bg.addColorStop(.55,'#090f25');bg.addColorStop(1,'#050914');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  if(stars){for(let i=0;i<220;i++){let x=((i*173.62+13)%w),y=((i*359.83+73)%h),r=.35+(i%6)*.16;ctx.fillStyle=`rgba(206,226,255,${.15+.20*(1+Math.sin(time*.0004+i))})`;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}}
  const lookup=new Map(nodes.map(n=>[n.id,n]));ctx.lineWidth=1;
  for(const edge of edges){const a=lookup.get(edge.from),b=lookup.get(edge.to);if(!a||!b)continue;const p=worldToScreen(a.x,a.y,camera,w,h),q=worldToScreen(b.x,b.y,camera,w,h);ctx.strokeStyle=edge.kind==='domain'?'rgba(129,209,249,.31)':'rgba(167,142,224,.14)';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
  for(const n of nodes){const p=worldToScreen(n.x,n.y,camera,w,h),r=Math.max(4,n.radius*camera.scale),selectedNode=selected===n.id || hover===n.id,filtered=focus.size>0&&!focus.has(n.id);if(p.x<-100||p.x>w+100||p.y<-100||p.y>h+100)continue;
    const c=domainColor(n.tab.domain);ctx.globalAlpha=filtered?.17:1;
    if(mode==='planet') {const halo=ctx.createRadialGradient(p.x,p.y,r*.2,p.x,p.y,r*3);halo.addColorStop(0,c+'77');halo.addColorStop(1,'transparent');ctx.fillStyle=halo;ctx.beginPath();ctx.arc(p.x,p.y,r*3,0,Math.PI*2);ctx.fill();}
    const sphere=ctx.createRadialGradient(p.x-r*.35,p.y-r*.42,1,p.x,p.y,r*1.2);sphere.addColorStop(0,'#ffffff');sphere.addColorStop(.2,c);sphere.addColorStop(.72,c+'aa');sphere.addColorStop(1,'#13192b');ctx.fillStyle=sphere;ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();
    if(mode==='planet'&&n.id%4===0){ctx.strokeStyle='#d4e3ff77';ctx.lineWidth=Math.max(1,r*.22);ctx.beginPath();ctx.ellipse(p.x,p.y,r*1.9,r*.6,-.35,0,Math.PI*2);ctx.stroke();ctx.lineWidth=1;}
    if(selectedNode){ctx.strokeStyle='#ffffff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y,r+5+Math.sin(time*.003)*2,0,Math.PI*2);ctx.stroke();ctx.lineWidth=1;}
    if(selectedNode||n.tab.active){ctx.fillStyle='#e6f4ff';ctx.font='12px system-ui,sans-serif';ctx.textAlign='center';ctx.fillText(n.tab.domain,p.x,p.y+r+19);}ctx.globalAlpha=1;
  }
}
