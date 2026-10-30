export type TabRecord = {
  id: number;
  windowId: number;
  title: string;
  url: string | null;
  domain: string;
  favIconUrl: string | null;
  active: boolean;
  pinned: boolean;
  muted: boolean;
  audible: boolean;
  index: number;
};
export type GroupMode = 'none' | 'window' | 'domain';
export type SortMode = 'window' | 'title' | 'domain';
export type ViewMode = 'universe' | 'list';
export type TabGroup = { key: string; name: string; tabs: TabRecord[] };
