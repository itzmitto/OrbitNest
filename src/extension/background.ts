/** OrbitNest toolbar launcher; uses the shared Chrome API declaration. */

const DASHBOARD_PATH = 'index.html';

chrome.action.onClicked.addListener(() => {
  const url = chrome.runtime.getURL(DASHBOARD_PATH);

  void chrome.tabs.create({ url, active: true }).catch((error: unknown) => {
    console.error('[OrbitNest] Could not open the dashboard.', error);
  });
});
