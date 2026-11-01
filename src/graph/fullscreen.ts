/** Fullscreen is always initiated by a real click, with graceful browser fallback. */
export async function toggleGalaxyFullscreen(element: HTMLElement, documentRef: Document = document): Promise<boolean> {
  try {
    if (documentRef.fullscreenElement) {
      if (!documentRef.exitFullscreen) return false;
      await documentRef.exitFullscreen();
      return true;
    }
    if (!element.requestFullscreen) return false;
    await element.requestFullscreen();
    return true;
  } catch { return false; }
}
