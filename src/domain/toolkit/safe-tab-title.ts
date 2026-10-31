/** Normalize whitespace without losing meaningful page headings. */
export function safeTabTitle(raw: unknown, max = 120): string {
  if (typeof raw !== 'string') return 'Untitled tab';
  const clean = raw.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  const limit = Number.isFinite(max) ? Math.max(8, Math.floor(max)) : 120;
  return clean.length > limit ? clean.slice(0, limit - 1).trimEnd() + '…' : (clean || 'Untitled tab');
}
