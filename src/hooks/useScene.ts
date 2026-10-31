import { useEffect, useState } from 'react';
import { parseScene, type ScenePreset } from '../domain/scene';
const KEY = 'orbitnest:scene:v1';
export function useScene() {
  const [scene, setScene] = useState<ScenePreset>(() => {
    try { return parseScene(localStorage.getItem(KEY)); } catch { return 'deep-space'; }
  });
  useEffect(() => { try { localStorage.setItem(KEY, scene); } catch { /* private storage may be unavailable */ } }, [scene]);
  return { scene, setScene };
}
