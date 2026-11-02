import {readdir} from 'node:fs/promises';
const folder=new URL('./mission/',import.meta.url);
for(const name of (await readdir(folder)).filter(n=>n.endsWith('.test.mjs')))await import(new URL(name,folder));
