import type {BrowserTab} from '../../zenith/core/types.ts';
export type {BrowserTab};
export interface AetherPoint {x:number;y:number;z:number;}
export interface AetherMetric {label:string;value:string;context?:string;}
export interface AetherRow {id:string;title:string;description:string;accent?:string;tabId?:number;}
export interface AetherReport {
 title:string;description:string;metrics:AetherMetric[];rows:AetherRow[];
 summary:string;emptyMessage:string;notes?:string[];
}
export interface AetherFeature {
 id:string;label:string;category:string;short:string;
 analyze(tabs:BrowserTab[]):AetherReport;
 renderDetail?(tabs:BrowserTab[],report:AetherReport):HTMLElement;
}
export type AetherView='planetarium'|'instruments'|'observatory'|'preferences'|'nova';
export type UiTheme='midnight'|'cosmic'|'amber';
