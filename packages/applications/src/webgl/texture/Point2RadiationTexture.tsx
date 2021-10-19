import { Poly, WebglProgram } from '@bestlyg/webgl';
import React, { useEffect, useRef } from 'react';
const vertexShaderSource = `
attribute vec4 a_Position;
void main(){
  gl_Position=a_Position;
}
`;
const fragmentShaderSource = `
precision mediump float;
uniform vec2 u_Center ;
uniform float u_Time ;

vec2 p1 = u_Center * 1.5 ;
vec2 p2 = u_Center * 0.5 ;

float rad1 = u_Time * 0.0008;
float sin1 = sin(rad1);
float cos1 = cos(rad1);
mat2 modelMat1 = mat2(
      cos1  , sin1 ,
      -sin1 , cos1
);

float rad2 = u_Time * 0.00042;
float sin2 = sin(rad2);
float cos2 = cos(rad2);
mat2 modelMat2 = mat2(
      cos2  , sin2 ,
      -sin2 , cos2
);
float random(vec2 fragCoord){
  vec2 modelVec = vec2(0.123,0.234);
  float randVal = dot( fragCoord , modelVec );
  return fract( sin(randVal) * 10000.0 );
}
float getLight(vec2 vec){
  vec = vec + modelMat1 * (vec - u_Center);
  vec2 p = modelMat2 * ( gl_FragCoord.xy - vec ) ;
  float rad = atan( p.y,p.x ) * 20.0;
  float light = random( vec2( int(rad) , 0.0 ) );
  return light;
}

void main(){
  float l1 = getLight(p1);
  float l2 = getLight(p2);
  float sum = l1 + l2 ;
  if ( sum>1.0 ) { sum = l1*l2; }
  gl_FragColor = vec4( sum , sum , sum , 1.0) ;
}
`;
const CANVAS_SIZE = 300;
export default function RadiationTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WebglProgram>();
  const polyRef = useRef<Poly>();
  useEffect(() => {
    webglRef.current = new WebglProgram({
      canvas: canvasRef.current!,
      vertexShaderSource,
      fragmentShaderSource,
      canvasSize: [CANVAS_SIZE, CANVAS_SIZE],
    });
    polyRef.current = new Poly(
      webglRef.current,
      [-1, 1, -1, -1, 1, 1, 1, -1],
      ['TRIANGLE_STRIP'],
      [{ name: 'a_Position', size: 2 }],
      [
        {
          name: 'u_Time',
          method: 'uniform1fv',
          data: [10124],
        },
        {
          name: 'u_Center',
          method: 'uniform2fv',
          data: [CANVAS_SIZE / 2, CANVAS_SIZE / 2],
        },
      ],
      []
    );
    polyRef.current.draw();
    function ani(time: number) {
      polyRef.current!.uniformMap.u_Time.data = [time];
      polyRef.current!.updateUniforms();
      polyRef.current!.draw();
      requestAnimationFrame(ani);
    }
    requestAnimationFrame(ani);
  }, []);
  return <canvas ref={canvasRef} />;
}
