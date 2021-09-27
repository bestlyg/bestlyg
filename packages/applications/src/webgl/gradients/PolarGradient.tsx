import { WEBGL } from '@bestlyg/shared';
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
uniform mat4 u_Data1;
uniform mat4 u_Data2;
const int Count = 8 ;
vec4 color[Count];
float ratio[Count];
float pi2 = radians( 360.0 );
void load(){
  for(int i = 0 ; i < Count / 2 ; i++ ){
    color[i] = vec4( vec3( u_Data1[i] ) , 1 );
    ratio[i] = u_Data1[i][3];
  }
  for(int i = 0 ; i < Count / 2 ; i++ ){
    color[ 4 + i] = vec4( vec3( u_Data2[i] ) , 1 );
    ratio[ 4 + i] = u_Data2[i][3];
  }
}
vec4 compColor(vec4 color1,vec4 color2,float ratio){
  return color1 + (color2 - color1) * ratio;
}
void main(){
  load();
  vec4 curColor = color[3];
  vec2 curVec = vec2( gl_FragCoord ) - u_Center;
  float curRad = atan( curVec.y , curVec.x );
  if ( curRad < 0.0 ) { curRad += pi2 ; }
  float curRatio = curRad / pi2 ;
  for(int i = 1 ; i < Count ; i++ ){
    if( ratio[i-1] <= curRatio && ratio[i] >= curRatio){
        curColor = compColor(
            color[i-1] ,
            color[i] ,
            (curRatio - ratio[i-1]) / (ratio[i] - ratio[i-1])
        );
        break;
    }
  }
  gl_FragColor = curColor ;

}
`;
/** 画布宽高 */
const CANVAS_SIZE = 300;
export default function PolarGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WEBGL.Webgl>();
  const polyRef = useRef<WEBGL.Poly>();
  useEffect(() => {
    webglRef.current = new WEBGL.Webgl({
      canvas: canvasRef.current!,
      vertexShaderSource,
      fragmentShaderSource,
      canvasSize: [CANVAS_SIZE, CANVAS_SIZE],
    });
    polyRef.current = new WEBGL.Poly(
      webglRef.current,
      [-1, 1, -1, -1, 1, 1, 1, -1],
      'TRIANGLE_STRIP',
      [{ name: 'a_Position', size: 2, index: 0, byteIndex: 0 }],
      [
        { name: 'u_Center', data: [150, 150], method: 'uniform2fv' },
        {
          name: 'u_Data1',
          data: [
            ...new Color('#d71345').toArray(),
            0,
            ...new Color('#f47920').toArray(),
            0.16,
            ...new Color('#a3cf62').toArray(),
            0.32,
            ...new Color('#007947').toArray(),
            0.48,
          ],
          method: 'uniformMatrix4fv',
        },
        {
          name: 'u_Data2',
          data: [
            ...new Color('#009ad6').toArray(),
            0.64,
            ...new Color('#33a3dc').toArray(),
            0.8,
            ...new Color('#8552a1').toArray(),
            0.96,
            ...new Color('#d71345').toArray(),
            1,
          ],
          method: 'uniformMatrix4fv',
        },
      ]
    );
    polyRef.current.draw();
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}
