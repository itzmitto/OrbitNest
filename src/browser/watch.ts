import { hasBrowserTabs } from './api';
export function watchBrowserTabs(onChange: () => void): () => void {
  if (!hasBrowserTabs()) return () => {};
  const refresh = () => onChange();
  chrome.tabs.onCreated.addListener(refresh);
  chrome.tabs.onRemoved.addListener(refresh);
  chrome.tabs.onUpdated.addListener(refresh);
  chrome.tabs.onActivated.addListener(refresh);
  chrome.tabs.onMoved.addListener(refresh);
  chrome.windows.onFocusChanged.addListener(refresh);
  return () => {
    chrome.tabs.onCreated.removeListener(refresh);
    chrome.tabs.onRemoved.removeListener(refresh);
    chrome.tabs.onUpdated.removeListener(refresh);
    chrome.tabs.onActivated.removeListener(refresh);
    chrome.tabs.onMoved.removeListener(refresh);
    chrome.windows.onFocusChanged.removeListener(refresh);
  };
}
