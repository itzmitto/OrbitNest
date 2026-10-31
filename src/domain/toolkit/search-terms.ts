/** Normalize case and repeated whitespace; cap user-entered search length. */
export function searchTerms(query: unknown): string[] {
  if (typeof query !== 'string') return [];
  return query.trim().slice(0,300).toLocaleLowerCase().split(/\s+/).filter(Boolean);
}
