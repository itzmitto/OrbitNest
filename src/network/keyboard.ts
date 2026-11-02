import type { GraphViewport } from './types.ts';
export function graphKeyboard(view: GraphViewport, key: string): GraphViewport {
  const step = 55 / view.zoom;
  if (key === 'ArrowLeft') return { ...view, x: view.x + step };
  if (key === 'ArrowRight') return { ...view, x: view.x - step };
  if (key === 'ArrowUp') return { ...view, y: view.y + step };
  if (key === 'ArrowDown') return { ...view, y: view.y - step };
  if (key === '+' || key === '=') return { ...view, zoom: Math.min(4, view.zoom * 1.14) };
  if (key === '-') return { ...view, zoom: Math.max(0.25, view.zoom / 1.14) };
  return view;
}
