import type { GraphEdge, GraphPoint } from './types.ts';

/** Bounded force pass for small graphs, deterministic fallback for very large tab collections. */
export function relaxGraph(input: readonly GraphPoint[], edges: readonly GraphEdge[], iterations = 16): GraphPoint[] {
  if (input.length > 350 || iterations <= 0) return input.map(point => ({ ...point }));
  const nodes = input.map(point => ({ ...point }));
  const lookup = new Map(nodes.map((point, index) => [point.id, index]));
  const n = nodes.length;
  const vx = new Float64Array(n), vy = new Float64Array(n);
  const count = Math.min(32, Math.max(0, Math.trunc(iterations)));
  for (let step = 0; step < count; step++) {
    vx.fill(0); vy.fill(0);
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      let dx = nodes[j].x - nodes[i].x, dy = nodes[j].y - nodes[i].y;
      const distance = Math.max(15, Math.hypot(dx, dy));
      const repulsion = 500 / (distance * distance);
      dx /= distance; dy /= distance;
      vx[i] -= dx * repulsion; vy[i] -= dy * repulsion;
      vx[j] += dx * repulsion; vy[j] += dy * repulsion;
    }
    for (const edge of edges) {
      const ia = lookup.get(edge.source), ib = lookup.get(edge.target);
      if (ia === undefined || ib === undefined) continue;
      const a = nodes[ia], b = nodes[ib];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.max(1, Math.hypot(dx, dy));
      const spring = Math.max(-1.6, Math.min(1.6, (d - (edge.kind === 'group' ? 64 : 200)) * 0.012));
      vx[ia] += dx / d * spring; vy[ia] += dy / d * spring;
      vx[ib] -= dx / d * spring; vy[ib] -= dy / d * spring;
    }
    for (let i = 0; i < n; i++) {
      nodes[i] = { ...nodes[i], x: nodes[i].x + Math.max(-3,Math.min(3,vx[i])), y: nodes[i].y + Math.max(-3,Math.min(3,vy[i])) };
    }
  }
  return nodes;
}
