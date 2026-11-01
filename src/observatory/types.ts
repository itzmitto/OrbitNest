import type { TabRecord } from '../domain/tab';

/** One aggregate measurement; tab titles and URLs are never exported. */
export type Observation = Readonly<{
  id: string;
  label: string;
  category: string;
  value: string;
  detail: string;
}>;
export type Observer = (tabs: readonly TabRecord[]) => Observation;
export function formatCount(value: number): string {
  return Math.max(0, Math.trunc(Number.isFinite(value) ? value : 0)).toLocaleString('en-US');
}
export function formatPercent(value: number): string {
  return `${Math.max(0,Math.min(100, Math.round(Number.isFinite(value) ? value : 0)))}%`;
}
