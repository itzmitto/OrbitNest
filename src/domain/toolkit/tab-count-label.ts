/** Screen-reader-friendly result count announcements. */
export function tabCountLabel(visible: number,total: number):string {
  const count=Number.isFinite(visible)?Math.max(0,Math.floor(visible)):0;
  const all=Number.isFinite(total)?Math.max(count,Math.floor(total)):count;
  return count===all ? `${count} ${count===1?'tab':'tabs'} available` :
    `${count} of ${all} ${all===1?'tab':'tabs'} visible`;
}
