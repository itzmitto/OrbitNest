/** Chrome tab IDs are finite nonnegative integers, never arbitrary strings. */
export function safeTabId(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 0) return null;
  return value;
}
