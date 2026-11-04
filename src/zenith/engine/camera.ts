import type {CameraState} from '../core/types.ts';
import {clamp} from '../core/math.ts';
export type CameraPreset='isometric'|'top'|'front'|'close'|'cinematic';
export const presets:{id:CameraPreset;label:string;description:string}[]=[
 {id:'isometric',label:'Isometric',description:'A clear elevated perspective over the entire galaxy'},
 {id:'top',label:'Top-down',description:'View orbit paths and clusters from above'},
 {id:'front',label:'Front view',description:'Inspect planets along the celestial horizon'},
 {id:'close',label:'Close encounter',description:'Discover large nearby spherical worlds'},
 {id:'cinematic',label:'Cinematic',description:'Tilted wide-angle view of the starfield'}];
export function cameraPreset(current:CameraState,id:CameraPreset):CameraState{
 switch(id){case 'isometric':return {...current,yaw:-.48,pitch:.46,distance:27};
 case 'top':return {...current,yaw:0,pitch:1.27,distance:28};
 case 'front':return {...current,yaw:0,pitch:0,distance:24};
 case 'close':return {...current,yaw:-.18,pitch:.12,distance:clamp(current.distance*.57,7,24)};
 case 'cinematic':return {...current,yaw:.66,pitch:-.26,distance:34};}}
