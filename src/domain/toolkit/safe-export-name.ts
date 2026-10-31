/** Avoid path traversal and Windows forbidden filename characters. */
export function safeExportName(name:unknown):string{
  const raw=typeof name==='string'?name:'orbitnest-session';
  const clean=raw.trim().replace(/[<>:"/\\|?*\u0000-\u001f]/g,'-').replace(/\.+$/g,'').replace(/\s+/g,'-');
  return (clean.slice(0,60)||'orbitnest-session')+'.json';
}
