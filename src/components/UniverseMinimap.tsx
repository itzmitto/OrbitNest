import {useMemo} from 'react';
import type {PlanetNode} from '../graph/planet-system';
import {createMinimap} from '../graph/minimap';
export function UniverseMinimap({nodes,selected,onFocus}:{nodes:readonly PlanetNode[];selected:number|null;onFocus:(id:number)=>void}){
 const points=useMemo(()=>createMinimap(nodes,selected),[nodes,selected]);
 if(!points.length)return null;
 return <div className="universe-minimap" aria-label="Galaxy overview map"><span className="universe-minimap-title">SECTOR MAP</span><div className="universe-minimap-field">{points.map(point=><button key={point.id} type="button" aria-label={`Focus planet ${point.id}`} aria-pressed={point.active} className={'universe-minimap-dot'+(point.active?' active':'')} style={{left:`${point.x}%`,top:`${point.y}%`}} title="Focus planet" onClick={()=>onFocus(point.id)}/>)}</div></div>;
}
