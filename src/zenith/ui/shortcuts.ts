export interface Shortcut {key:string;label:string;description:string;run:()=>void;}
function typing(target:EventTarget|null):boolean{const node=target as HTMLElement|null;return Boolean(node?.closest('input,textarea,select,[contenteditable="true"]'));}
export function attachShortcuts(shortcuts:Shortcut[]):()=>void{
 const listener=(event:KeyboardEvent)=>{if(event.altKey||event.ctrlKey||event.metaKey||typing(event.target))return;
 const hit=shortcuts.find(s=>s.key.toLowerCase()===event.key.toLowerCase());if(hit){event.preventDefault();hit.run();}};
 window.addEventListener('keydown',listener);return ()=>window.removeEventListener('keydown',listener);
}
export function shortcutHelp(shortcuts:Shortcut[]):string{return `<details class="z-shortcut-help"><summary>Keyboard shortcuts</summary><div>${shortcuts.map(s=>`<p><kbd>${s.label}</kbd> ${s.description}</p>`).join('')}</div></details>`;}
