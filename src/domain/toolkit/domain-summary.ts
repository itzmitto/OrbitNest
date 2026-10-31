import type { TabRecord } from '../tab';
/** A predictable, alphabetically sorted count of individual tabs per domain. */
export function domainSummary(tabs: readonly TabRecord[]): { domain: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const tab of tabs) {
    const domain = tab.domain.trim().toLowerCase() || 'unknown';
    counts.set(domain, (counts.get(domain) ?? 0) + 1);
  }
  return [...counts].map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count || a.domain.localeCompare(b.domain));
}
