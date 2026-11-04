import {readStored,writeStored} from './state.ts';
export interface Collection {id:string;name:string;domains:string[];createdAt:string;}
export function getCollections():Collection[]{const v=readStored<unknown>('collections',[]);
 if(!Array.isArray(v))return [];return v.filter((c):c is Collection=>Boolean(c&&typeof c==='object'&&typeof c.id==='string'&&typeof c.name==='string'&&Array.isArray(c.domains))).slice(0,50);}
export function addCollection(name:string,domains:string[]):Collection{
 const collection:Collection={id:`collection-${Date.now()}`,name:name.trim().slice(0,60)||'Untitled cluster',domains:[...new Set(domains)].slice(0,100),createdAt:new Date().toISOString()};
 writeStored('collections',[collection,...getCollections()].slice(0,50));return collection;}
export function removeCollection(id:string):void{writeStored('collections',getCollections().filter(c=>c.id!==id));}
export function matchingDomains(collection:Collection,domain:string):boolean{return collection.domains.includes(domain);}
