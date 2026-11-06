export interface DisplayDiagnostics {pixelRatio:number;reducedMotion:boolean;webgl:boolean;mode:'3d'|'fallback'}
export function displayDiagnostics(options:{devicePixelRatio:number;reducedMotion:boolean;webgl:boolean}):DisplayDiagnostics{
 const pixelRatio=Math.max(1,Math.min(2,Number.isFinite(options.devicePixelRatio)?options.devicePixelRatio:1));
 return {...options,pixelRatio,mode:options.webgl?'3d':'fallback'};
}
export function qualityLabel(value:DisplayDiagnostics):string {
 if(!value.webgl)return 'NO WEBGL2 · HARDWARE ACCELERATION MAY BE OFF';
 return `${value.reducedMotion?'REDUCED MOTION':'LIVE MOTION'} · ${value.pixelRatio.toFixed(1)}× DISPLAY · WEBGL2`;
}
