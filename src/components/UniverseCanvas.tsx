import { useEffect, useMemo, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import type { TabRecord } from '../domain/tab';
import { createPlanetNodes, findPlanet, type PlanetNode } from '../graph/planet-system';
import { PlanetRenderer } from '../graph/planet-webgl';
import { drawUniverse } from '../graph/draw';
import { layoutPlanets } from '../graph/layout';

type Props = { tabs: TabRecord[]; selected: number | null; onOpen: (tab: TabRecord) => void };
type DragState = { x: number; y: number; originX: number; originY: number; moved: boolean };
const INITIAL_VIEWPORT = { width: 960, height: 590 };

export function UniverseCanvas({ tabs, selected, onOpen }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<PlanetRenderer | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const motionRef = useRef(0);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [webglFallback, setWebglFallback] = useState(false);
  const nodes = useMemo(() => createPlanetNodes(tabs, viewport.width, viewport.height, zoom, offset), [tabs, viewport, zoom, offset]);
  const hovered = nodes.find(node => node.id === hoveredId);
  const active = nodes.find(node => node.id === selected);
  const motionStopped = paused || reducedMotion;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const { width, height } = container.getBoundingClientRect();
      setViewport(previous => Math.abs(previous.width - width) < 1 && Math.abs(previous.height - height) < 1 ? previous : { width: Math.max(1, width), height: Math.max(1, height) });
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    update();
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(media.matches);
    media.addEventListener('change', onChange);
    return () => { observer.disconnect(); media.removeEventListener('change', onChange); };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || webglFallback) return;
    try {
      rendererRef.current = new PlanetRenderer(canvas);
    } catch (error) {
      console.warn('[OrbitNest] Switching to 2D planet fallback:', error);
      rendererRef.current = null;
      setWebglFallback(true);
    }
    return () => { rendererRef.current?.dispose(); rendererRef.current = null; };
  }, [webglFallback]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(viewport.width * dpr);
    canvas.height = Math.round(viewport.height * dpr);
    let frameId = 0;
    let previousTime = 0;
    let lastPaint = 0;
    const drawFrame = (now: number) => {
      const step = previousTime ? Math.min((now - previousTime) / 1000, 0.06) : 0;
      previousTime = now;
      if (!motionStopped) motionRef.current += step;
      if (now - lastPaint > (nodes.length > 70 ? 33 : 15) || motionStopped) {
        lastPaint = now;
        if (rendererRef.current && !webglFallback) {
          rendererRef.current.render(nodes, viewport.width, viewport.height, motionRef.current, selected);
        } else {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const fallbackPoints = layoutPlanets(tabs, viewport.width, viewport.height).map(point => {
              const n = nodes.find(node => node.id === point.id);
              return n ? { ...point, x: n.x, y: n.y, r: n.r } : point;
            });
            drawUniverse(ctx, viewport.width, viewport.height, fallbackPoints, selected);
          }
        }
      }
      if (!motionStopped) frameId = window.requestAnimationFrame(drawFrame);
    };
    frameId = window.requestAnimationFrame(drawFrame);
    return () => window.cancelAnimationFrame(frameId);
  }, [tabs, nodes, selected, viewport, motionStopped, webglFallback]);

  const changeZoom = (delta: number) => setZoom(previous => Math.max(0.55, Math.min(2.25, Math.round((previous + delta) * 100) / 100)));
  const pickNode = (event: PointerEvent<HTMLCanvasElement>): PlanetNode | undefined => {
    const rect = event.currentTarget.getBoundingClientRect();
    return findPlanet(nodes, event.clientX - rect.left, event.clientY - rect.top);
  };
  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (event.button !== 0) return;
    dragRef.current = { x: event.clientX, y: event.clientY, originX: offset.x, originY: offset.y, moved: false };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    if (drag) {
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (Math.hypot(dx, dy) > 5) drag.moved = true;
      if (drag.moved) setOffset({ x: drag.originX + dx, y: drag.originY + dy });
      return;
    }
    const nextId = pickNode(event)?.id ?? null;
    setHoveredId(previous => previous === nextId ? previous : nextId);
  };
  const onPointerUp = (event: PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag || drag.moved) return;
    const node = pickNode(event);
    if (node) onOpen(node.tab);
  };
  const ringCount = Math.min(8, Math.max(2, Math.ceil(Math.sqrt(tabs.length / 3.5))));
  const rings = Array.from({ length: ringCount }, (_, index) => {
    const scale = (index + 1) / ringCount;
    return { rx: viewport.width * 0.435 * scale * zoom, ry: viewport.height * 0.405 * scale * zoom };
  });
  return (
    <div className="planetarium-shell">
      <div className="planetarium-header">
        <div className="planetarium-brand"><span className="planetarium-live-dot" /> <strong>THE ORBITNEST SYSTEM</strong><span>{tabs.length} celestial tabs</span></div>
        <div className="planetarium-legend"><span>● Terrestrial</span><span>● Gas giant</span><span>● Exotic</span></div>
      </div>
      <div className="planetarium-stage" ref={containerRef}>
        <div className="planetarium-nebula" aria-hidden="true" />
        <svg className="planetarium-orbits" viewBox={`0 0 ${viewport.width} ${viewport.height}`} aria-hidden="true">
          <defs><linearGradient id="orbitGlow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#78c6fe" stopOpacity="0.1" /><stop offset="0.55" stopColor="#7c85dc" stopOpacity="0.3" /><stop offset="1" stopColor="#83fcda" stopOpacity="0.09" /></linearGradient></defs>
          {rings.map((ring, index) => <ellipse key={index} cx={viewport.width / 2 + offset.x} cy={viewport.height / 2 + offset.y} rx={ring.rx} ry={ring.ry} fill="none" stroke="url(#orbitGlow)" strokeWidth="1" strokeDasharray={index % 2 ? '3 7' : undefined} />)}
        </svg>
        <div className="planetarium-core" aria-hidden="true" style={{ left: viewport.width / 2 + offset.x, top: viewport.height / 2 + offset.y }}><span /></div>
        <canvas key={webglFallback ? 'canvas-2d' : 'canvas-3d'} ref={canvasRef} className="planetarium-webgl" aria-label={`${tabs.length} rotating planet representations of open tabs. Choose Galaxy List for keyboard navigation.`} role="img"
          onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
          onPointerCancel={() => { dragRef.current = null; }} onPointerLeave={() => setHoveredId(null)} />
        <div className="planetarium-label-layer" aria-hidden="true">
          {nodes.length <= 80 && nodes.map(node => (
            <div key={node.id} className={`planetarium-planet-label${selected === node.id ? ' selected' : ''}${hoveredId === node.id ? ' hovered' : ''}`}
              style={{ left: node.x, top: node.y + node.r + 12 }}>
              <strong>{node.tab.domain}</strong>
              {(selected === node.id || hoveredId === node.id) && <small>{node.tab.title}</small>}
            </div>
          ))}
        </div>
        <div className="planetarium-hud">
          <span className="planetarium-hud-title">UNIVERSE CONTROLS <em>{webglFallback ? '2D FALLBACK' : 'LIVE 3D'}</em></span>
          <div className="planetarium-zoom-actions" role="group" aria-label="Universe controls">
            <button type="button" aria-label="Zoom out" onClick={() => changeZoom(-0.2)}>−</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button type="button" aria-label="Zoom in" onClick={() => changeZoom(0.2)}>+</button>
            <button type="button" onClick={() => { setOffset({ x: 0, y: 0 }); setZoom(1); }}>Reset</button>
            <button type="button" aria-pressed={motionStopped} onClick={() => setPaused(previous => !previous)} disabled={reducedMotion} title={reducedMotion ? 'Reduced motion is enabled in your system settings' : undefined}>{motionStopped ? '▶ Play' : 'Ⅱ Pause'}</button>
          </div>
        </div>
        {(hovered || active) && <div className="planetarium-inspector" role="status"><span>{(hovered || active)?.kind.toUpperCase()} PLANET</span><strong>{(hovered || active)?.tab.title}</strong><small>{(hovered || active)?.tab.domain} · Click planet to switch tab</small></div>}
        {tabs.length === 0 && <div className="planetarium-empty">No planets in this sector. Open a tab or change your filters.</div>}
        <div className="planetarium-navigation-hint">DRAG TO PAN <i /> USE + / − TO ZOOM <i /> SELECT A PLANET TO OPEN ITS TAB</div>
      </div>
      <div className="planetarium-footer"><span>ORBITAL MAP / LIVE TAB NETWORK</span><span>PRIVATE BY DESIGN · YOUR TABS STAY IN YOUR BROWSER</span></div>
    </div>
  );
}
