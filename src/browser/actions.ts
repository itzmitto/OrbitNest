import { hasBrowserTabs } from './api';
export async function focusBrowserTab(tabId: number, windowId: number): Promise<boolean> {
  if (!hasBrowserTabs()) return false;
  try {
    await chrome.tabs.update(tabId, { active: true });
    await chrome.windows.update(windowId, { focused: true });
    return true;
  } catch { return false; }
}
