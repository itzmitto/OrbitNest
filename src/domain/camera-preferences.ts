import type { CameraOffset } from '../graph/camera';
export type CameraPreference = { zoom: number; offset: CameraOffset };
export const DEFAULT_CAMERA: CameraPreference = {zoom:1,offset:{x:0,y:0}};
export function parseCameraPreference(raw: string | null): CameraPreference {
  if (!raw) return DEFAULT_CAMERA;
  try {
    const data: unknown=JSON.parse(raw);
    if(typeof data!=='object'||data===null)return DEFAULT_CAMERA;
    const obj=data as Record<string,unknown>;
    const offset=obj.offset as Record<string,unknown> | undefined;
    if(!offset || typeof obj.zoom!=='number' || !Number.isFinite(obj.zoom) || obj.zoom<0.55 || obj.zoom>2.25 ||
      typeof offset.x!=='number' || typeof offset.y!=='number' || !Number.isFinite(offset.x) || !Number.isFinite(offset.y) ||
      Math.abs(offset.x)>5000 || Math.abs(offset.y)>5000)return DEFAULT_CAMERA;
    return {zoom:obj.zoom,offset:{x:offset.x,y:offset.y}};
  }catch{return DEFAULT_CAMERA;}
}
