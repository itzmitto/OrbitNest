export function UniverseHelp() {
  return <details className="universe-help">
    <summary>Keyboard & navigation guide <span aria-hidden="true">?</span></summary>
    <div className="universe-help-grid">
      <span><kbd>Drag</kbd> Pan across space</span>
      <span><kbd>Wheel</kbd> Zoom toward cursor</span>
      <span><kbd>← ↑ → ↓</kbd> Move camera</span>
      <span><kbd>[</kbd> <kbd>]</kbd> Choose a planet</span>
      <span><kbd>Enter</kbd> Open focused tab</span>
      <span><kbd>Esc</kbd> Clear keyboard focus</span>
      <span><kbd>0</kbd> Reset zoom & position</span>
      <span><kbd>Ctrl K</kbd> Open tab switcher</span>
    </div>
    <p>OrbitNest only reads browser tab metadata. Planet types are visual categories, not website content.</p>
  </details>;
}
