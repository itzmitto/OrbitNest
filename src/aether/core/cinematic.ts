import {clamp} from './helpers.ts';
import type {CameraState,Planet} from '../../zenith/core/types.ts';
export interface CameraKeyframe{at:number;yaw:number;pitch:number;distance:number;x:number;y:number;}
export const easeInOut=(t:number):number=>{const v=clamp(t,0,1);return v*v*(3-2*v);};
export function interpolateCamera(from:CameraState,to:CameraState,t:number):CameraState{
 const u=easeInOut(t);
 return {yaw:from.yaw+(to.yaw-from.yaw)*u,pitch:from.pitch+(to.pitch-from.pitch)*u,
  distance:from.distance+(to.distance-from.distance)*u,targetX:from.targetX+(to.targetX-from.targetX)*u,
  targetY:from.targetY+(to.targetY-from.targetY)*u};
}
export function orbitingCamera(planets:Planet[],time:number):CameraState{
 const phase=time*.00016;
 const extent=planets.length?Math.max(...planets.map(p=>Math.hypot(p.x,p.y,p.z)+p.radius)):12;
 return {yaw:phase,pitch:.15+.22*Math.sin(phase*.55),distance:clamp(extent*2.1,18,72),targetX:0,targetY:0};
}
export function makeCameraTour(planets:Planet[],duration=36000):CameraKeyframe[]{
 const n=Math.min(planets.length,8);const result:CameraKeyframe[]=[];
 for(let i=0;i<n;i++){const item=planets[i];result.push({at:(duration/n)*i,
  yaw:-.5+i*.35,pitch:.15+.13*Math.sin(i),distance:clamp(12+item.radius*2,12,26),x:item.x,y:item.y});}
 return result;
}
export function currentTourFrame(frames:CameraKeyframe[],elapsed:number):CameraState|null{
 if(!frames.length)return null;
 const total=frames[frames.length-1].at+4500,time=((elapsed%total)+total)%total;
 const next=frames.findIndex(f=>f.at>time),left=next<0?frames[frames.length-1]:frames[(next-1+frames.length)%frames.length];
 const right=next<0?frames[0]:frames[next];const end=next<0?total:right.at;
 const t=easeInOut((time-left.at)/Math.max(1,end-left.at));
 return {yaw:left.yaw+(right.yaw-left.yaw)*t,pitch:left.pitch+(right.pitch-left.pitch)*t,
  distance:left.distance+(right.distance-left.distance)*t,targetX:left.x+(right.x-left.x)*t,targetY:left.y+(right.y-left.y)*t};
}
