import type { TabRecord } from '../tab';
export function tabFlags(tab: Pick<TabRecord, 'active' | 'pinned' | 'muted' | 'audible'>): string[] {
  const labels: string[] = [];
  if (tab.active) labels.push('Current tab');
  if (tab.pinned) labels.push('Pinned');
  if (tab.muted) labels.push('Muted');
  else if (tab.audible) labels.push('Playing audio');
  return labels;
}
