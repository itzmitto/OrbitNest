import { useEffect, useState } from 'react';
import { hasBrowserTabs, queryBrowserTabs } from '../browser/api';
import { watchBrowserTabs } from '../browser/watch';
import { normalizeTabs } from '../domain/normalize';
import { sampleTabs } from '../domain/sample';
import type { TabRecord } from '../domain/tab';
export function useBrowserTabs() {
  const [tabs, setTabs] = useState<TabRecord[]>(hasBrowserTabs() ? [] : sampleTabs);
  const [loading, setLoading] = useState(hasBrowserTabs());
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    let requestId = 0;
    const refresh = async () => {
      if (!hasBrowserTabs()) return;
      const thisRequest = ++requestId;
      try {
        const next = normalizeTabs(await queryBrowserTabs());
        if (active && thisRequest === requestId) { setTabs(next); setError(null); }
      } catch {
        if (active && thisRequest === requestId) setError('Unable to read tabs. Reload the extension.');
      } finally { if (active && thisRequest === requestId) setLoading(false); }
    };
    void refresh();
    const unsubscribe = watchBrowserTabs(() => void refresh());
    return () => { active = false; unsubscribe(); };
  }, []);
  return { tabs, loading, error, demo: !hasBrowserTabs() };
}
