import type { StudioNode } from './types';
import { clamp } from './core/math.ts';
export type StudioCamera={x:number;y:number;scale:number};
export function createCamera():StudioCamera{return{x:0,y:0,scale:1};}
export function pointFromEvent(e:{clientX:number;clientY:number},canvas:HTMLCanvasElement){const rect=canvas.getBoundingClientRect();return{x:e.clientX-rect.left,y:e.clientY-rect.top};}
export function zoomAtPointer(cam:StudioCamera,factor:number,px:number,py:number,w:number,h:number){const scale=clamp(cam.scale*factor,.25,3);if(scale===cam.scale)return;const bx=(px-w/2)/cam.scale-cam.x,by=(py-h/2)/cam.scale-cam.y;cam.scale=scale;cam.x=(px-w/2)/scale-bx;cam.y=(py-h/2)/scale-by;}
export function fitCamera(cam:StudioCamera,nodes:StudioNode[],w:number,h:number){if(!nodes.length){Object.assign(cam,createCamera());return;}const xs=nodes.map(n=>n.x),ys=nodes.map(n=>n.y);const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);cam.x=-(minX+maxX)/2;cam.y=-(minY+maxY)/2;cam.scale=clamp(Math.min(w/(maxX-minX+140),h/(maxY-minY+140)),.25,2);}
