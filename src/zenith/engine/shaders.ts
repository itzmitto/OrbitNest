export const vertexShader=`#version 300 es
precision highp float;
layout(location=0) in vec3 position;
layout(location=1) in vec3 normal;
layout(location=2) in vec2 uv;
uniform mat4 uProjection,uView,uModel;
out vec3 vNormal,vWorld;
out vec2 vUv;
void main(){ vec4 world=uModel*vec4(position,1.0);vWorld=world.xyz;
 vNormal=mat3(uModel)*normal;vUv=uv;gl_Position=uProjection*uView*world; }
`;
export const fragmentShader=`#version 300 es
precision highp float;
in vec3 vNormal,vWorld;
in vec2 vUv;
out vec4 fragColor;
uniform float uTime,uHue,uMaterial,uFocus,uRing;
uniform vec3 uLight;
vec3 hueToRgb(float hue){vec3 c=clamp(abs(mod(hue*6.0+vec3(0,4,2),6.0)-3.0)-1.0,0.0,1.0);
 return c*c*(3.0-2.0*c);}
float hash(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);
 return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
 mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
void main(){vec3 n=normalize(vNormal),light=normalize(uLight-vWorld);
 float diff=max(dot(n,light),0.0),rim=pow(1.0-max(dot(n,normalize(vec3(0,0,1))),0.0),2.7);
 float oceans=noise(n*3.8+uTime*.012),details=noise(n*18.0),clouds=noise(n*11.0+uTime*.02);
 float stripes=sin(vUv.y*94.0+noise(n*6.0)*7.0)*.5+.5;
 float lava=pow(max(0.0,noise(n*9.0)-.47)*2.1,2.4);
 float p=mod(uMaterial,6.0);
 float pattern=p<.5?mix(oceans,stripes,.14):p<1.5?stripes:p<2.5?details:p<3.5?lava:p<4.5?clouds:oceanS;
 vec3 base=hueToRgb(fract(uHue));
 if(p>4.5){pattern=oceans;}
 base=mix(base*.17,base*1.42+.16,clamp(pattern*.8+.1,0.0,1.0));
 if(p>2.5&&p<3.5){base=mix(vec3(.11,.07,.08),vec3(1.0,.37,.06),clamp(lava*7.0,0.0,1.0));}
 if(uRing>.5){float bands=sin(length(vWorld.xz)*19.0)*.5+.5;base=mix(base,vec3(.75,.65,.95),bands*.6);}
 float shine=pow(max(dot(reflect(-light,n),normalize(vec3(0,0,1))),0.0),22.0);
 vec3 color=base*(.16+diff*.89)+rim*base*.8+shine*.18;
 color=mix(color,color+vec3(.18,.33,.6),uFocus*.26);
 fragColor=vec4(pow(max(color,vec3(0.0)),vec3(.85)),1.0);
}
`.replace('oceanS','oceans');
