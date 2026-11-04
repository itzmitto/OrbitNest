import {seededRandom} from '../core/math.ts';
export interface Star {x:number;y:number;r:number;alpha:number;twinkle:number;}
export function makeStars(count=180,seed=813):Star[]{return Array.from({length:count},(_,i)=>{const id=seed+i*17;
 return {x:seededRandom(id+1),y:seededRandom(id+2),r:.25+seededRandom(id+3)*1.4,alpha:.18+seededRandom(id+4)*.7,twinkle:seededRandom(id+5)*6};});}
export class Starfield {
 private canvas:HTMLCanvasElement;private frame=0;private stars:Star[]=[];private lastW=0;private lastH=0;
 constructor(canvas:HTMLCanvasElement,count=180){this.canvas=canvas;this.stars=makeStars(count);}
 draw(time:number):void{const ctx=this.canvas.getContext('2d');if(!ctx)return;const rect=this.canvas.getBoundingClientRect();const w=rect.width,h=rect.height;
 const dpr=Math.min(2,devicePixelRatio||1);if(this.lastW!==w||this.lastH!==h){this.canvas.width=Math.max(1,Math.floor(w*dpr));this.canvas.height=Math.max(1,Math.floor(h*dpr));this.lastW=w;this.lastH=h;}
 ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);for(const star of this.stars){const pulse=.82+.18*Math.sin(time*.0007+star.twinkle);
 ctx.fillStyle=`rgba(207,220,255,${Math.min(1,star.alpha*pulse)})`;ctx.beginPath();ctx.arc(star.x*w,star.y*h,star.r,0,Math.PI*2);ctx.fill();}}
 start():void{const tick=(time:number)=>{this.frame=requestAnimationFrame(tick);if(!document.hidden)this.draw(time);};this.frame=requestAnimationFrame(tick);}
 stop():void{cancelAnimationFrame(this.frame);this.frame=0;}
}
