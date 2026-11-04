export type Mat4 = Float32Array;
export type Vec3 = [number,number,number];
export const identity=():Mat4=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
export function multiply(a:Mat4,b:Mat4):Mat4 {
 const out=new Float32Array(16);for(let col=0;col<4;col++)for(let row=0;row<4;row++){
  for(let k=0;k<4;k++)out[col*4+row]+=a[k*4+row]*b[col*4+k];
 }return out;
}
export function translation(x:number,y:number,z:number):Mat4 {const out=identity();out[12]=x;out[13]=y;out[14]=z;return out;}
export function scale(s:number):Mat4{const out=identity();out[0]=s;out[5]=s;out[10]=s;return out;}
export function rotationY(angle:number):Mat4{const m=identity(),c=Math.cos(angle),s=Math.sin(angle);m[0]=c;m[2]=-s;m[8]=s;m[10]=c;return m;}
export function perspective(fov:number,aspect:number,near:number,far:number):Mat4 {
 const f=1/Math.tan(fov/2),out=new Float32Array(16);out[0]=f/aspect;out[5]=f;out[10]=(far+near)/(near-far);
 out[11]=-1;out[14]=2*far*near/(near-far);return out;
}
export function lookAt(eye:Vec3,target:Vec3,up:Vec3=[0,1,0]):Mat4{
 const norm=(v:Vec3):Vec3=>{const d=Math.hypot(...v)||1;return [v[0]/d,v[1]/d,v[2]/d];};
 const cross=(a:Vec3,b:Vec3):Vec3=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
 const z=norm([eye[0]-target[0],eye[1]-target[1],eye[2]-target[2]]),x=norm(cross(up,z)),y=cross(z,x);
 return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-(x[0]*eye[0]+x[1]*eye[1]+x[2]*eye[2]),-(y[0]*eye[0]+y[1]*eye[1]+y[2]*eye[2]),-(z[0]*eye[0]+z[1]*eye[1]+z[2]*eye[2]),1]);
}
export function project(point:Vec3,viewProjection:Mat4):[number,number,number] {
 const [x,y,z]=point, m=viewProjection,w=m[3]*x+m[7]*y+m[11]*z+m[15];
 if(Math.abs(w)<1e-6)return [0,0,-1];return [(m[0]*x+m[4]*y+m[8]*z+m[12])/w,(m[1]*x+m[5]*y+m[9]*z+m[13])/w,(m[2]*x+m[6]*y+m[10]*z+m[14])/w];
}
