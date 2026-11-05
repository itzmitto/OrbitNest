import {UniverseScene} from '../../zenith/ui/scene.ts';
import {Starfield} from '../../zenith/ui/stars.ts';
import type {BrowserTab,Planet} from '../../zenith/core/types.ts';
import {formations} from '../../zenith/core/data.ts';
import {clamp} from '../core/helpers.ts';
export interface CockpitOptions {onSelect:(planet:Planet|null)=>void;onFrame:(fps:number)=>void;}
export class AetherCockpit {
 readonly scene:UniverseScene;
 readonly stars:Starfield;
 private readonly onResize:()=>void;
 private activeTabs:BrowserTab[]=[];
 private presetIndex=0;
 private selected:string|null=null;
 constructor(container:HTMLElement,options:CockpitOptions){
  const starCanvas=document.createElement('canvas');starCanvas.className='aether-stars';starCanvas.setAttribute('aria-hidden','true');
  const planetCanvas=document.createElement('canvas');planetCanvas.className='aether-planets';planetCanvas.setAttribute('aria-label','3D view of open browser tabs');planetCanvas.tabIndex=0;
  container.append(starCanvas,planetCanvas);
  this.scene=new UniverseScene(planetCanvas,{onSelect:planet=>{this.selected=planet?.id||null;options.onSelect(planet);},onFrame:options.onFrame});
  this.stars=new Starfield(starCanvas);this.stars.start();
  this.onResize=()=>{this.scene.camera.distance=clamp(this.scene.camera.distance,8,130);};window.addEventListener('resize',this.onResize);
 }
 update(tabs:BrowserTab[]){this.activeTabs=tabs;this.scene.setTabs(tabs,formations[this.presetIndex]);if(this.selected)this.scene.setSelection(this.selected);}
 setFormation(index:number){this.presetIndex=((index%formations.length)+formations.length)%formations.length;this.update(this.activeTabs);}
 getFormation(){return formations[this.presetIndex];}
 focus(id:number){const planet=this.scene.getPlanets().find(p=>p.tab.id===id);if(!planet)return;
  this.selected=planet.id;this.scene.setSelection(planet.id);this.scene.camera.targetX=planet.x;this.scene.camera.targetY=planet.y;this.scene.camera.distance=clamp(planet.radius*8,8,22);}
 reset(){this.scene.fit();this.scene.setSelection(null);this.selected=null;}
 dispose(){window.removeEventListener('resize',this.onResize);this.stars.stop();this.scene.dispose();}
}
