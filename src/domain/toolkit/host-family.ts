/** Reduce a hostname to a simple display grouping while retaining local hosts. */
export function hostFamily(host: string): string {
  const pieces = host.toLowerCase().replace(/\.+$/, '').split('.').filter(Boolean);
  if (pieces.length <= 2) return pieces.join('.') || 'unknown';
  const countrySuffix = new Set(['co.uk','com.au','co.nz']);
  const suffix = pieces.slice(-2).join('.');
  return pieces.slice(countrySuffix.has(suffix) ? -3 : -2).join('.');
}
