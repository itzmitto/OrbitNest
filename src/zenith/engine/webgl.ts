import {sphere,ring,type Geometry} from './geometry.ts';
import {vertexShader,fragmentShader} from './shaders.ts';
import {translation,rotationY,scale,multiply,perspective,lookAt,type Mat4} from './matrices.ts';
import type {Planet,CameraState} from '../core/types.ts';
interface GPUObject{vao:WebGLVertexArrayObject;count:number;}
function compile(gl:WebGL2RenderingContext,type:number,source:string):WebGLShader{
 const shader=gl.createShader(type);if(!shader)throw Error('Could not create shader');
 gl.shaderSource(shader,source);gl.compileShader(shader);
 if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){const error=gl.getShaderInfoLog(shader);gl.deleteShader(shader);throw Error(error||'GLSL compilation failed');}
 return shader;
}
function prepare(gl:WebGL2RenderingContext,geometry:Geometry):GPUObject{
 const vao=gl.createVertexArray();if(!vao)throw Error('Vertex array unavailable');gl.bindVertexArray(vao);
 const attrs:[Float32Array,number,number][]=[[geometry.positions,0,3],[geometry.normals,1,3],[geometry.uvs,2,2]];
 for(const [data,location,size] of attrs){const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
  gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,size,gl.FLOAT,false,0,0);}
 const ibo=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,geometry.indices,gl.STATIC_DRAW);
 gl.bindVertexArray(null);return {vao,count:geometry.indices.length};
}
export class PlanetGPU {
 private gl:WebGL2RenderingContext;
 private program:WebGLProgram;
 private sphere:GPUObject;private ring:GPUObject;
 private uniforms:Record<string,WebGLUniformLocation|null>={};
 constructor(private canvas:HTMLCanvasElement){
  const gl=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'high-performance'});if(!gl)throw Error('WebGL2 is not available');this.gl=gl;
  const vertex=compile(gl,gl.VERTEX_SHADER,vertexShader),fragment=compile(gl,gl.FRAGMENT_SHADER,fragmentShader);
  const program=gl.createProgram();if(!program)throw Error('WebGL program unavailable');gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program)||'Shader link failure');
  gl.deleteShader(vertex);gl.deleteShader(fragment);this.program=program;
  for(const key of ['uProjection','uView','uModel','uTime','uHue','uMaterial','uFocus','uRing','uLight'])this.uniforms[key]=gl.getUniformLocation(program,key);
  this.sphere=prepare(gl,sphere(56,36));this.ring=prepare(gl,ring());gl.enable(gl.DEPTH_TEST);
 }
 render(planets:Planet[],camera:CameraState,time:number,selectedId:string|null,spin:boolean):void{
  const gl=this.gl,ratio=Math.min(2,window.devicePixelRatio||1),w=Math.round(this.canvas.clientWidth*ratio),h=Math.round(this.canvas.clientHeight*ratio);
  if(!w||!h)return;if(this.canvas.width!==w||this.canvas.height!==h){this.canvas.width=w;this.canvas.height=h;}
  gl.viewport(0,0,w,h);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(this.program);
  const pitch=camera.pitch,yaw=camera.yaw,distance=camera.distance;
  const eye:[number,number,number]=[Math.sin(yaw)*Math.cos(pitch)*distance+camera.targetX,Math.sin(pitch)*distance+camera.targetY,Math.cos(yaw)*Math.cos(pitch)*distance];
  const view=lookAt(eye,[camera.targetX,camera.targetY,0]),proj=perspective(Math.PI/3,w/h,.05,250);
  gl.uniformMatrix4fv(this.uniforms.uView,false,view);gl.uniformMatrix4fv(this.uniforms.uProjection,false,proj);
  gl.uniform3f(this.uniforms.uLight,-8,14,18);gl.uniform1f(this.uniforms.uTime,time);
  for(const planet of planets){const position=translation(planet.x,planet.y,planet.z);
   const rotation=rotationY(spin?time*.09+(planet.id.length*.4):0);
   const model=multiply(position,multiply(rotation,scale(planet.radius)));
   gl.uniformMatrix4fv(this.uniforms.uModel,false,model);gl.uniform1f(this.uniforms.uHue,planet.hue);
   gl.uniform1f(this.uniforms.uMaterial,planet.material);gl.uniform1f(this.uniforms.uFocus,planet.id===selectedId?1:0);
   gl.uniform1f(this.uniforms.uRing,0);gl.bindVertexArray(this.sphere.vao);gl.drawElements(gl.TRIANGLES,this.sphere.count,gl.UNSIGNED_SHORT,0);
   if(planet.moonCount>=2){const ringModel=multiply(position,multiply(rotation,scale(planet.radius)));
    gl.uniformMatrix4fv(this.uniforms.uModel,false,ringModel);gl.uniform1f(this.uniforms.uRing,1);
    gl.disable(gl.CULL_FACE);gl.bindVertexArray(this.ring.vao);gl.drawElements(gl.TRIANGLES,this.ring.count,gl.UNSIGNED_SHORT,0);}
  }gl.bindVertexArray(null);
 }
 dispose():void{this.gl.deleteVertexArray(this.sphere.vao);this.gl.deleteVertexArray(this.ring.vao);this.gl.deleteProgram(this.program);}
}
