import type {BrowserTab,CameraState,Planet} from '../core/types';
import {buildPlanets} from '../core/scene';
import {clamp} from '../core/math';
import {project,multiply,lookAt,perspective} from '../engine/matrices';
import {PlanetGPU} from '../engine/webgl';
interface ControlOptions{onSelect:(planet:Planet|null)=>void;onFrame?:(fps:number)=>void;}
export class UniverseScene{
 private gpu:PlanetGPU|null=null;private scene:Planet[]=[];
 private selection:string|null=null;private raf=0;private playing=true;private last=0;private frames=0;private started=0;
 readonly camera:CameraState={yaw:-.35,pitch:.23,distance:24,targetX:0,targetY:0};
 private drag:{x:number;y:number;distance:number}|null=null;
 private fallback:HTMLElement|null=null;
 private onPointerDown=(e:PointerEvent)=>{this.drag={x:e.clientX,y:e.clientY,distance:0};this.canvas.setPointerCapture(e.pointerId);};
 private onPointerMove=(e:PointerEvent)=>{if(!this.drag)return;const dx=e.clientX-this.drag.x,dy=e.clientY-this.drag.y;
 this.drag.distance+=Math.abs(dx)+Math.abs(dy);this.drag.x=e.clientX;this.drag.y=e.clientY;
 this.camera.yaw-=dx*.006;this.camera.pitch=clamp(this.camera.pitch+dy*.006,-1.35,1.35);};
 private onPointerUp=(e:PointerEvent)=>{if(this.drag&&this.drag.distance<8)this.pick(e);this.drag=null;};
 private onWheel=(e:WheelEvent)=>{e.preventDefault();this.zoom(e.deltaY>0?1.1:.9);};
 private onContextLost=(e:Event)=>{e.preventDefault();this.setFallback('WebGL context lost. Reload the page to restart rendering.');this.stop();};
 constructor(private canvas:HTMLCanvasElement,private options:ControlOptions){
  try{this.gpu=new PlanetGPU(canvas);}catch(error){this.setFallback(`3D graphics unavailable: ${String(error)}`);}
  canvas.addEventListener('pointerdown',this.onPointerDown);canvas.addEventListener('pointermove',this.onPointerMove);
  canvas.addEventListener('pointerup',this.onPointerUp);canvas.addEventListener('pointercancel',this.onPointerUp);
  canvas.addEventListener('wheel',this.onWheel,{passive:false});canvas.addEventListener('webglcontextlost',this.onContextLost);
  if(this.gpu)this.start();
 }
 private setFallback(message:string){this.fallback=document.createElement('div');this.fallback.className='z-empty';this.fallback.textContent=message;this.canvas.parentElement?.append(this.fallback);}
 private pick(e:PointerEvent):void{
  const rect=this.canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
  const yaw=this.camera.yaw,pitch=this.camera.pitch,distance=this.camera.distance;
  const eye:[number,number,number]=[Math.sin(yaw)*Math.cos(pitch)*distance+this.camera.targetX,Math.sin(pitch)*distance+this.camera.targetY,Math.cos(yaw)*Math.cos(pitch)*distance];
  const vp=multiply(perspective(Math.PI/3,rect.width/rect.height,.05,250),lookAt(eye,[this.camera.targetX,this.camera.targetY,0]));
  const x=(e.clientX-rect.left)/rect.width*2-1,y=1-(e.clientY-rect.top)/rect.height*2;
  let best:Planet|null=null,dist=Number.POSITIVE_INFINITY;
  for(const planet of this.scene){const p=project([planet.x,planet.y,planet.z],vp);
   const difference=Math.hypot((p[0]-x)*rect.width/2,(p[1]-y)*rect.height/2);
   const limit=Math.max(13,planet.radius*rect.height/this.camera.distance);
   if(difference<limit&&difference<dist){dist=difference;best=planet;}}
  this.selection=best?.id||null;this.options.onSelect(best);
 }
 setTabs(tabs:BrowserTab[],preset?:import('../core/types').OrbitPreset){this.scene=buildPlanets(tabs,preset);this.fit();}
 setSelection(id:string|null){this.selection=id;}
 getPlanets():Planet[]{return this.scene;}
 fit(){if(!this.scene.length){this.camera.distance=22;return;}
  const extent=Math.max(...this.scene.map(p=>Math.hypot(p.x,p.y,p.z)+p.radius));this.camera.distance=clamp(extent*2.3,17,94);
  this.camera.targetX=0;this.camera.targetY=0;}
 zoom(factor:number){this.camera.distance=clamp(this.camera.distance*factor,7,130);}
 pause(){this.playing=!this.playing;return this.playing;}
 private tick=(now:number)=>{
  this.raf=requestAnimationFrame(this.tick);if(document.hidden)return;
  if(this.gpu){this.gpu.render(this.scene,this.camera,this.playing?now/1000:this.last/1000,this.selection,this.playing);}
  if(this.playing)this.last=now;
  this.frames++;if(now-this.started>1000){this.options.onFrame?.(this.frames*1000/(now-this.started));this.frames=0;this.started=now;}
 };
 start(){if(!this.raf){this.started=performance.now();this.raf=requestAnimationFrame(this.tick);}}
 stop(){if(this.raf)cancelAnimationFrame(this.raf);this.raf=0;}
 dispose(){this.stop();this.canvas.removeEventListener('pointerdown',this.onPointerDown);this.canvas.removeEventListener('pointermove',this.onPointerMove);
  this.canvas.removeEventListener('pointerup',this.onPointerUp);this.canvas.removeEventListener('pointercancel',this.onPointerUp);
  this.canvas.removeEventListener('wheel',this.onWheel);this.canvas.removeEventListener('webglcontextlost',this.onContextLost);
  this.gpu?.dispose();this.fallback?.remove();}
}
