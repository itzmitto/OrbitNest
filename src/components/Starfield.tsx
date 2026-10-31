import { useMemo } from 'react';
import { createStarfield } from '../graph/starfield';
export function Starfield({ density = 100 }: { density?: number }) {
  const stars = useMemo(() => createStarfield(density), [density]);
  return <div className="orbit-starfield" aria-hidden="true">{stars.map(star =>
    <i key={star.id} className="orbit-star" style={{left:`${star.x}%`,top:`${star.y}%`,width:star.size,height:star.size,opacity:star.opacity,animationDelay:`${star.delay}s`}} />
  )}</div>;
}
