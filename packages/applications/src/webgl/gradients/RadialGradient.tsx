import { Poly, Webgl } from '@bestlyg/webgl';
import React, { useEffect, useRef } from 'react';
import { Color } from 'three';

const vertexShaderSource = `
attribute vec4 a_Position;
void main(){
  gl_Position=a_Position;
}
`;
const fragmentShaderSource = `
precision mediump float;
uniform vec2 u_Center;
uniform float u_Radius;
uniform mat4 u_Data;
vec4 color[4];
float ratio[4];
void load(){
  for(int i = 0 ; i < 4 ; i++ ){
    color[i] = vec4( vec3( u_Data[i] ) , 1 );
    ratio[i] = u_Data[i][3];
  }
}
vec4 compColor(vec4 color1,vec4 color2,float ratio){
  return color1 + (color2 - color1) * ratio;
}
vec4 getColor(){
  float curLen = distance( gl_FragCoord.xy , u_Center );
  float curRatio = curLen / u_Radius;
  if(curRatio >= ratio[3] ){
    return color[3];
  }
  vec4 curColor ;
  for(int i = 1 ; i < 4 ;i++){
    if( curRatio >= ratio[i-1] && curRatio <= ratio[i]){
      curColor = compColor(
        color[i-1],
        color[i],
        (curRatio - ratio[ i - 1 ]) / (ratio[i] - ratio[ i - 1 ])
      );
      break;
    }
  }
  return curColor;
}
void main(){
  load();
  gl_FragColor = getColor();
}
`;
export default function RadialGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<Webgl>();
  const polyRef = useRef<Poly>();
  useEffect(() => {
    webglRef.current = new Webgl({ canvas: canvasRef.current!, size: [300, 300] });
    polyRef.current = new Poly({
      webgl: webglRef.current,
      vertexShaderSource,
      fragmentShaderSource,
      data: [-1, 1, -1, -1, 1, 1, 1, -1],
      drawTypes: ['TRIANGLE_STRIP'],
      attributes: [{ name: 'a_Position', size: 2 }],
      uniforms: [
        { name: 'u_Center', data: [150, 150], method: 'uniform2fv' },
        { name: 'u_Radius', data: [150], method: 'uniform1fv' },
        {
          name: 'u_Data',
          data: [
            ...new Color('#00DBDE').toArray(),
            0,
            ...new Color('#537DE8').toArray(),
            0.33,
            ...new Color('#FC00FF').toArray(),
            0.66,
            ...new Color('#00DBDE').toArray(),
            1,
          ],
          method: 'uniformMatrix4fv',
        },
      ],
    });
    polyRef.current.draw();
  }, []);
  return <canvas ref={canvasRef} />;
}
