/** Lightweight deterministic palette hashing without network calls or third-party APIs. */
export function stableColor(domain: string): string {
  const palette=['#6b9cff','#b69bff','#73dbcf','#ffc18d','#f38dad','#91c995','#eedb82'];
  let hash=0;
  for (const char of domain.toLowerCase()) hash=(Math.imul(hash,31)+char.charCodeAt(0))|0;
  return palette[(hash>>>0)%palette.length];
}
