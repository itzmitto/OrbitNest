/** Extract only a hostname; never expose query strings, user info or fragments. */
export function safeDomain(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return url.hostname.toLowerCase() || null;
  } catch { return null; }
}
