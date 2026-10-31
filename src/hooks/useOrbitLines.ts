import { useEffect, useState } from 'react';
import { readOrbitPreference } from '../domain/orbit-preference';
const KEY = 'orbitnest:orbit-lines:v1';
export function useOrbitLines() {
  const [showOrbits, setShowOrbits] = useState(() => {
    try { return readOrbitPreference(localStorage.getItem(KEY)); } catch { return true; }
  });
  useEffect(() => { try { localStorage.setItem(KEY, String(showOrbits)); } catch { /* storage optional */ } }, [showOrbits]);
  return { showOrbits, setShowOrbits };
}
