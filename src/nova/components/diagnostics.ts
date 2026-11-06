import {displayDiagnostics,qualityLabel} from '../core/diagnostics.ts';
import {el} from './dom.ts';
export function attachDiagnostics(stage:HTMLElement,toolbar:HTMLElement):void{
 const canvas=stage.querySelector<HTMLCanvasElement>('.aether-planets');
 const context=canvas?.getContext('webgl2')||null;
 const diagnostics=displayDiagnostics({devicePixelRatio:window.devicePixelRatio||1,
  reducedMotion:window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  webgl:Boolean(context)});
 const status=el('div','nova-quality',qualityLabel(diagnostics));status.role='status';
 status.setAttribute('aria-label','3D rendering quality and motion status');toolbar.append(status);
 if(!diagnostics.webgl){const warning=el('p','nova-webgl-warning',
  '3D graphics could not start. Enable hardware acceleration in the browser or try a WebGL2-capable device.');
  stage.append(warning);
 }
}
