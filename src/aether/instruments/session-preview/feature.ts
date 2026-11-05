import type {AetherFeature} from '../../core/types.ts';
import {analyzeSessionPreview,evaluateSessionPreview} from './analysis.ts';
import {adviceSessionPreview} from './advice.ts';
import {renderSessionPreviewView} from './view.ts';
/** Registered instrument combines pure analysis, recommendations and accessible UI. */
export const session_previewFeature:AetherFeature={
 id:"session-preview",label:"Session launch preview",category:"Session management",
 short:"Preview which browser tabs are safe to save in a session.",
 analyze(tabs){
  const report=analyzeSessionPreview(tabs),advice=adviceSessionPreview(tabs,evaluateSessionPreview(tabs));
  return {...report,notes:[...(report.notes||[]),...advice]};
 },
 renderDetail(tabs){return renderSessionPreviewView(tabs);}
};
