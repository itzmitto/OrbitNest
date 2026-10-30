import type { PlanetNode } from './planet-system';

const vertexShader = `#version 300 es
precision highp float;
in vec3 aPosition;
uniform vec2 uViewport;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uSpin;
uniform float uTilt;
out vec3 vSurface;
out vec3 vNormal;
void main() {
  float c = cos(uSpin), s = sin(uSpin);
  vec3 p = vec3(aPosition.x*c + aPosition.z*s, aPosition.y, -aPosition.x*s + aPosition.z*c);
  float t = cos(uTilt), k = sin(uTilt);
  p = vec3(p.x, p.y*t - p.z*k, p.y*k + p.z*t);
  vSurface = aPosition;
  vNormal = p;
  vec2 pixel = uCenter + p.xy * uRadius;
  gl_Position = vec4(pixel.x / uViewport.x * 2.0 - 1.0, 1.0 - pixel.y / uViewport.y * 2.0, -p.z * 0.01, 1.0);
}`;

const fragmentShader = `#version 300 es
precision highp float;
in vec3 vSurface;
in vec3 vNormal;
uniform int uKind;
uniform float uSeed;
uniform float uSelected;
out vec4 colorOut;
float hash(vec3 p) { return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float noise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  f = f*f*(3.0-2.0*f);
  float n000=hash(i), n100=hash(i+vec3(1,0,0)), n010=hash(i+vec3(0,1,0)), n110=hash(i+vec3(1,1,0));
  float n001=hash(i+vec3(0,0,1)), n101=hash(i+vec3(1,0,1)), n011=hash(i+vec3(0,1,1)), n111=hash(i+vec3(1,1,1));
  return mix(mix(mix(n000,n100,f.x),mix(n010,n110,f.x),f.y),mix(mix(n001,n101,f.x),mix(n011,n111,f.x),f.y),f.z);
}
float fbm(vec3 p) {
  float value=0.0, amplitude=0.52;
  for(int i=0;i<4;i++){ value+=amplitude*noise(p);p=p*2.07+vec3(2.3);amplitude*=0.5; }
  return value;
}
void main() {
  vec3 p = vSurface;
  float n=fbm(p*4.8+uSeed*12.0);
  float detail=fbm(p*13.0+uSeed*8.0);
  vec3 base;
  if(uKind==0){
    // Deep ocean, cloud banks and emergent landmasses.
    float continents=smoothstep(0.48,0.62,n);
    base=mix(vec3(0.018,0.15,0.36),vec3(0.07,0.45,0.57),smoothstep(0.33,0.56,n));
    base=mix(base,mix(vec3(0.09,0.37,0.27),vec3(0.39,0.64,0.37),detail),continents);
    base=mix(base,vec3(0.76,0.92,0.97),smoothstep(0.68,0.83,detail)*0.58);
  } else if(uKind==1){
    // Warm gas giant with rotating atmospheric bands.
    float band=sin(p.y*32.0+sin(p.x*8.0)*0.9+n*3.2);
    base=mix(vec3(0.42,0.18,0.23),vec3(0.98,0.74,0.43),smoothstep(-0.7,0.85,band));
    base=mix(base,vec3(1.0,0.89,0.69),smoothstep(0.71,0.94,detail)*0.32);
  } else if(uKind==2){
    // Molten volcanic surface and lava cracks.
    float fissure=abs(sin((n*5.0+detail*0.9)*20.0));
    base=mix(vec3(0.085,0.065,0.11),vec3(0.29,0.085,0.11),n);
    base+=vec3(1.0,0.22,0.012)*pow(1.0-fissure,9.0)*2.4;
  } else if(uKind==3){
    // Icy cyan world.
    base=mix(vec3(0.16,0.42,0.62),vec3(0.83,0.95,1.0),smoothstep(0.31,0.73,n));
    base+=vec3(0.15,0.2,0.25)*smoothstep(0.74,0.95,detail);
  } else if(uKind==4){
    // Ochre desert with dunes and dust.
    float dunes=sin(p.y*38.0+n*9.0);
    base=mix(vec3(0.43,0.18,0.10),vec3(0.98,0.68,0.31),smoothstep(-0.9,0.9,dunes)*0.62+0.16*n);
  } else if(uKind==5){
    // Verdant atmospheric forest planet.
    base=mix(vec3(0.017,0.18,0.17),vec3(0.10,0.74,0.50),smoothstep(0.31,0.66,n));
    base=mix(base,vec3(0.57,0.93,0.76),smoothstep(0.77,0.95,detail)*0.26);
  } else {
    // Violet crystalline atmosphere.
    float lattice=abs(sin(p.x*28.0+p.z*16.0+n*5.0));
    base=mix(vec3(0.20,0.12,0.47),vec3(0.82,0.50,0.96),smoothstep(0.34,0.73,n));
    base+=vec3(0.18,0.12,0.23)*pow(lattice,18.0);
  }
  vec3 normal=normalize(vNormal);
  vec3 lightDir=normalize(vec3(-0.55,0.67,1.0));
  float lit=max(dot(normal,lightDir),0.0);
  float ambient=0.24+lit*0.85;
  float softShadow=pow(1.0-lit,2.1)*0.14;
  float rim=pow(1.0-max(dot(normal,vec3(0,0,1)),0.0),3.0);
  vec3 glow=(uKind==2?vec3(1.0,0.18,0.05):vec3(0.22,0.65,1.0));
  vec3 shaded=base*(ambient-softShadow)+glow*rim*0.46;
  shaded+=vec3(1.0)*pow(max(dot(reflect(-lightDir,normal),vec3(0,0,1)),0.0),28.0)*0.17;
  shaded+=vec3(0.13,0.19,0.3)*uSelected*0.42;
  colorOut=vec4(shaded,1.0);
}`;

const ringVertex = `#version 300 es
precision highp float;
in vec3 aRing;
uniform vec2 uViewport;
uniform vec2 uCenter;
uniform float uRadius;
out float vAngle;
out float vRadial;
void main() {
  float angle=aRing.x;
  vAngle=sin(angle);
  vRadial=aRing.y;
  float radius=mix(1.42,2.24,aRing.y)*uRadius;
  vec2 position=vec2(cos(angle)*radius,sin(angle)*radius*0.34);
  float ca=cos(-0.30),sa=sin(-0.30);
  position=vec2(position.x*ca-position.y*sa,position.x*sa+position.y*ca);
  vec2 pixel=uCenter+position;
  gl_Position=vec4(pixel.x/uViewport.x*2.0-1.0,1.0-pixel.y/uViewport.y*2.0,0.0,1.0);
}`;
const ringFragment = `#version 300 es
precision highp float;
in float vAngle;
in float vRadial;
uniform float uFront;
uniform float uHue;
out vec4 colorOut;
void main() {
  if(uFront<0.5 && vAngle>=0.0) discard;
  if(uFront>=0.5 && vAngle<0.0) discard;
  float bands=pow(abs(sin(vRadial*24.0)),2.0);
  float envelope=smoothstep(0.0,0.2,vRadial)*(1.0-smoothstep(0.78,1.0,vRadial));
  vec3 tint=mix(vec3(0.46,0.57,0.94),vec3(0.97,0.81,0.57),uHue);
  colorOut=vec4(tint*(0.58+bands*0.5),envelope*(0.18+bands*0.53));
}`;

type Uniforms = { viewport: WebGLUniformLocation | null; center: WebGLUniformLocation | null; radius: WebGLUniformLocation | null };
function compile(gl: WebGL2RenderingContext, stage: number, source: string): WebGLShader {
  const shader=gl.createShader(stage);
  if(!shader) throw new Error('WebGL shader allocation failed');
  gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) {
    const message=gl.getShaderInfoLog(shader) || 'Unknown shader error';
    gl.deleteShader(shader);throw new Error(message);
  }
  return shader;
}
function makeProgram(gl: WebGL2RenderingContext, vertex: string, fragment: string): WebGLProgram {
  const vs=compile(gl,gl.VERTEX_SHADER,vertex),fs=compile(gl,gl.FRAGMENT_SHADER,fragment);
  const program=gl.createProgram();if(!program)throw new Error('WebGL program allocation failed');
  gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  gl.deleteShader(vs);gl.deleteShader(fs);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){
    const message=gl.getProgramInfoLog(program) || 'Unknown shader link error';
    gl.deleteProgram(program);throw new Error(message);
  }
  return program;
}
function sphereGeometry(latitude=20, longitude=28): { vertices: Float32Array; indices: Uint16Array } {
  const vertices:number[]=[],indices:number[]=[];
  for(let y=0;y<=latitude;y++){
    const theta=Math.PI*y/latitude;
    for(let x=0;x<=longitude;x++){
      const phi=2*Math.PI*x/longitude;
      vertices.push(Math.sin(theta)*Math.cos(phi),Math.cos(theta),Math.sin(theta)*Math.sin(phi));
    }
  }
  for(let y=0;y<latitude;y++)for(let x=0;x<longitude;x++){
    const a=y*(longitude+1)+x,b=a+longitude+1;
    indices.push(a,b,a+1,b,b+1,a+1);
  }
  return {vertices:new Float32Array(vertices),indices:new Uint16Array(indices)};
}
function ringGeometry(segments=100): Float32Array {
  const vertices:number[]=[];
  for(let i=0;i<=segments;i++){
    const angle=i/segments*Math.PI*2;
    vertices.push(angle,0,0,angle,1,0);
  }
  return new Float32Array(vertices);
}

export class PlanetRenderer {
  private gl:WebGL2RenderingContext;
  private planetProgram:WebGLProgram;
  private ringProgram:WebGLProgram;
  private sphereBuffer:WebGLBuffer;
  private elementBuffer:WebGLBuffer;
  private ringBuffer:WebGLBuffer;
  private sphereCount:number;
  private ringCount:number;
  private planetUniforms:Uniforms;
  private ringUniforms:Uniforms;

  constructor(canvas:HTMLCanvasElement) {
    const gl=canvas.getContext('webgl2',{alpha:true,antialias:true,premultipliedAlpha:false,powerPreference:'low-power'});
    if(!gl)throw new Error('WebGL2 unavailable');
    this.gl=gl;
    this.planetProgram=makeProgram(gl,vertexShader,fragmentShader);
    this.ringProgram=makeProgram(gl,ringVertex,ringFragment);
    const sphere=sphereGeometry();const ring=ringGeometry();
    const sb=gl.createBuffer(),eb=gl.createBuffer(),rb=gl.createBuffer();
    if(!sb||!eb||!rb)throw new Error('WebGL buffer allocation failed');
    this.sphereBuffer=sb;this.elementBuffer=eb;this.ringBuffer=rb;
    gl.bindBuffer(gl.ARRAY_BUFFER,sb);gl.bufferData(gl.ARRAY_BUFFER,sphere.vertices,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,eb);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,sphere.indices,gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER,rb);gl.bufferData(gl.ARRAY_BUFFER,ring,gl.STATIC_DRAW);
    this.sphereCount=sphere.indices.length;this.ringCount=ring.length/3;
    const uniforms=(program:WebGLProgram):Uniforms=>({viewport:gl.getUniformLocation(program,'uViewport'),center:gl.getUniformLocation(program,'uCenter'),radius:gl.getUniformLocation(program,'uRadius')});
    this.planetUniforms=uniforms(this.planetProgram);this.ringUniforms=uniforms(this.ringProgram);
    gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.DEPTH_TEST);gl.clearColor(0,0,0,0);
  }

  render(nodes:readonly PlanetNode[],width:number,height:number,elapsed:number,selected:number|null):void {
    const gl=this.gl;
    gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const setCommon=(locations:Uniforms,node:PlanetNode)=>{
      gl.uniform2f(locations.viewport,width,height);
      gl.uniform2f(locations.center,node.x,node.y);
      gl.uniform1f(locations.radius,node.r);
    };
    const drawRing=(node:PlanetNode,front:boolean)=>{
      gl.disable(gl.DEPTH_TEST);gl.depthMask(false);
      gl.useProgram(this.ringProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER,this.ringBuffer);
      const position=gl.getAttribLocation(this.ringProgram,'aRing');
      gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,3,gl.FLOAT,false,0,0);
      setCommon(this.ringUniforms,node);
      gl.uniform1f(gl.getUniformLocation(this.ringProgram,'uFront'),front?1:0);
      gl.uniform1f(gl.getUniformLocation(this.ringProgram,'uHue'),node.kindIndex===1?1:0);
      gl.drawArrays(gl.TRIANGLE_STRIP,0,this.ringCount);
      gl.disableVertexAttribArray(position);
      gl.depthMask(true);gl.enable(gl.DEPTH_TEST);
    };
    for(const node of nodes){
      if(node.x<-120||node.y<-120||node.x>width+120||node.y>height+120)continue;
      if(node.ringed && nodes.length<100)drawRing(node,false);
      gl.useProgram(this.planetProgram);
      gl.bindBuffer(gl.ARRAY_BUFFER,this.sphereBuffer);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.elementBuffer);
      const position=gl.getAttribLocation(this.planetProgram,'aPosition');
      gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,3,gl.FLOAT,false,0,0);
      setCommon(this.planetUniforms,node);
      gl.uniform1f(gl.getUniformLocation(this.planetProgram,'uSpin'),node.phase+elapsed*node.speed);
      gl.uniform1f(gl.getUniformLocation(this.planetProgram,'uTilt'),0.21+node.seed*0.6);
      gl.uniform1i(gl.getUniformLocation(this.planetProgram,'uKind'),node.kindIndex);
      gl.uniform1f(gl.getUniformLocation(this.planetProgram,'uSeed'),node.seed);
      gl.uniform1f(gl.getUniformLocation(this.planetProgram,'uSelected'),selected===node.id?1:0);
      gl.drawElements(gl.TRIANGLES,this.sphereCount,gl.UNSIGNED_SHORT,0);
      gl.disableVertexAttribArray(position);
      if(node.ringed && nodes.length<100)drawRing(node,true);
    }
  }
  dispose():void {
    const gl=this.gl;
    gl.deleteBuffer(this.sphereBuffer);gl.deleteBuffer(this.elementBuffer);gl.deleteBuffer(this.ringBuffer);
    gl.deleteProgram(this.planetProgram);gl.deleteProgram(this.ringProgram);
  }
}
