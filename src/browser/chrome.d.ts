interface OrbitNestChromeEvent { addListener(listener: () => void): void; removeListener(listener: () => void): void; }
declare const chrome: {
  action: { onClicked: { addListener(listener: () => void): void } };
  runtime: { getURL(path: string): string };
  tabs: {
    query(query: Record<string, never>): Promise<import('../domain/normalize').BrowserTab[]>;
    update(tabId: number, properties: { active?: boolean; pinned?: boolean; muted?: boolean }): Promise<unknown>;
    remove(tabId: number): Promise<void>;
    create(options: { url: string; active: boolean }): Promise<unknown>;
    onCreated: OrbitNestChromeEvent;
    onRemoved: OrbitNestChromeEvent;
    onUpdated: OrbitNestChromeEvent;
    onActivated: OrbitNestChromeEvent;
    onMoved: OrbitNestChromeEvent;
  };
  windows: {
    update(windowId: number, options: { focused: boolean }): Promise<unknown>;
    onFocusChanged: OrbitNestChromeEvent;
  };
};
