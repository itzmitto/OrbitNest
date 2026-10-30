import { useState } from 'react';
const KEY='orbitnest:favorites:v1';
function readFavorites(): number[] {try{const raw=JSON.parse(localStorage.getItem(KEY)??'[]');return Array.isArray(raw)?raw.filter((n):n is number=>Number.isInteger(n)):[];}catch{return [];}}
export function useFavorites() {
  const [favorites,setFavorites]=useState<number[]>(readFavorites);
  const toggle=(id:number)=>setFavorites(current=>{const next=current.includes(id)?current.filter(x=>x!==id):[...current,id];try{localStorage.setItem(KEY,JSON.stringify(next));}catch{/* Storage may be disabled. */}return next;});
  return { favorites, toggle };
}
