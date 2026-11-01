import type { Observation } from './types';
/** Produce a user-initiated, URL-free plain-text report. */
export function exportMissionReport(observations: readonly Observation[]): string {
  const lines = ['OrbitNest Mission Observatory', 'Aggregated locally. No tab URLs included.', ''];
  for (const entry of observations) {
    lines.push(`${entry.label}: ${entry.value} (${entry.category})`);
  }
  return lines.join('\n');
}
