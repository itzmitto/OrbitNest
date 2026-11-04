export interface Geometry{positions:Float32Array;normals:Float32Array;uvs:Float32Array;indices:Uint16Array;}
export function sphere(segments=48,rings=32):Geometry {
 const positions:number[]=[],normals:number[]=[],uvs:number[]=[],indices:number[]=[];
 for(let y=0;y<=rings;y++)for(let x=0;x<=segments;x++){
  const phi=y/rings*Math.PI,theta=x/segments*Math.PI*2;
  const nx=Math.sin(phi)*Math.cos(theta),ny=Math.cos(phi),nz=Math.sin(phi)*Math.sin(theta);
  positions.push(nx,ny,nz);normals.push(nx,ny,nz);uvs.push(x/segments,y/rings);
 }
 for(let y=0;y<rings;y++)for(let x=0;x<segments;x++){
  const a=y*(segments+1)+x,b=a+segments+1;indices.push(a,b,a+1,b,b+1,a+1);
 }return {positions:new Float32Array(positions),normals:new Float32Array(normals),uvs:new Float32Array(uvs),indices:new Uint16Array(indices)};
}
export function ring(inner=1.18,outer=1.86,segments=96):Geometry {
 const positions:number[]=[],normals:number[]=[],uvs:number[]=[],indices:number[]=[];
 for(let i=0;i<=segments;i++){const a=i/segments*Math.PI*2,c=Math.cos(a),s=Math.sin(a);
  positions.push(c*inner,0,s*inner,c*outer,0,s*outer);normals.push(0,1,0,0,1,0);uvs.push(0,i/segments,1,i/segments);
  if(i<segments){const n=i*2;indices.push(n,n+2,n+1,n+1,n+2,n+3);}
 }return {positions:new Float32Array(positions),normals:new Float32Array(normals),uvs:new Float32Array(uvs),indices:new Uint16Array(indices)};
}
