/** Minimal extension API surface for the launch-only milestone. */
declare const chrome: {
  action: { onClicked: { addListener(listener: () => void): void } };
  runtime: { getURL(path: string): string };
  tabs: { create(properties: { url: string; active: boolean }): Promise<unknown> };
};

const DASHBOARD_PATH = 'index.html';

chrome.action.onClicked.addListener(() => {
  const url = chrome.runtime.getURL(DASHBOARD_PATH);

  void chrome.tabs.create({ url, active: true }).catch((error: unknown) => {
    console.error('[OrbitNest] Could not open the dashboard.', error);
  });
});
