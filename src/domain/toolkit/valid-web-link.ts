export function validWebLink(value:unknown):boolean{
  if(typeof value!=='string'||value.length>8192)return false;
  try{
    const url=new URL(value);
    return (url.protocol==='https:'||url.protocol==='http:')&&Boolean(url.hostname)&&!url.username&&!url.password;
  }catch{return false;}
}
