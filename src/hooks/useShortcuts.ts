import { useEffect } from 'react';
export function useShortcuts(onSearch:()=>void,onList:()=>void,onGraph:()=>void) {
 useEffect(()=>{
  const listener=(event:KeyboardEvent)=>{
   if(event.ctrlKey||event.altKey||event.metaKey)return;
   const element=event.target as HTMLElement|null;
   if(element?.matches('input,textarea,select,[contenteditable="true"]'))return;
   if(event.key==='/'){event.preventDefault();onSearch();}
   if(event.key.toLowerCase()==='l'){onList();}
   if(event.key.toLowerCase()==='g'){onGraph();}
  };
  document.addEventListener('keydown',listener);return()=>document.removeEventListener('keydown',listener);
 },[onSearch,onList,onGraph]);
}
