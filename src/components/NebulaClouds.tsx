import {useMemo} from 'react';
import {generateNebulaClouds} from '../graph/nebula-clouds';
export function NebulaClouds(){
  const clouds=useMemo(()=>generateNebulaClouds(),[]);
  return <div className="nebula-clouds" aria-hidden="true">{clouds.map(cloud=><i key={cloud.id} style={{left:`${cloud.x}%`,top:`${cloud.y}%`,transform:`translate(-50%, -50%) scale(${cloud.scale})`,background:`radial-gradient(ellipse,hsla(${cloud.hue},90%,58%,.24),transparent 70%)`,animationDelay:`${cloud.delay}s`}}/>)}</div>;
}
