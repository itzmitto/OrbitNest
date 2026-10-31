import { useEffect, useState } from 'react';
import { parseAnimationSpeed, type AnimationSpeed } from '../domain/animation-speed';
const KEY='orbitnest:rotation-speed:v1';
export function useAnimationSpeed(){
  const [speed,setSpeed]=useState<AnimationSpeed>(()=>{
    try{return parseAnimationSpeed(localStorage.getItem(KEY));}catch{return 'normal';}
  });
  useEffect(()=>{try{localStorage.setItem(KEY,speed);}catch{/* storage optional */}},[speed]);
  return {speed,setSpeed};
}
