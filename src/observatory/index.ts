import type { TabRecord } from '../domain/tab';
import type { Observation, Observer } from './types';
const observers: Observer[] = [];
/** Calculations run entirely in the dashboard; no web APIs are called. */
export function collectObservations(tabs: readonly TabRecord[]): Observation[] {
  return observers.map(observe => observe(tabs));
}
