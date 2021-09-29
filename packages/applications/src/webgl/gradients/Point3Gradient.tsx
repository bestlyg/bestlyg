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
uniform mat3 u_Color;
uniform mat3 u_Point;

vec4 colors[3];
vec2 points[3];
float pi2 = radians( 360.0 );

void load(){
  for( int i=0 ; i<3 ; i++){
    colors[i] = vec4(u_Color[i],1) ;
    points[i] = vec2( u_Point[i] ) ;
  }
}

vec4 getColor(vec4 color1,vec4 color2,float ratio){
  return color1 + (color2 - color1) * ratio;
}
float getRad (vec2 vec){
  float rad = atan( vec.y , vec.x );
  if ( rad < 0.0 ) { rad += pi2 ; }
  return rad;
}
void main(){
  load();
  vec4 color = vec4(0);
  vec2 v31 = points[0] - points[2] ;
  vec2 v32 = points[1] - points[2] ;
  vec2 v12 = points[1] - points[0] ;
  vec2 v3c = gl_FragCoord.xy - points[2] ;
  vec2 v1c = gl_FragCoord.xy - points[0] ;
  float rad31 = getRad(v31);
  float rad32 = getRad(v32);
  float rad3c = getRad(v3c);
  float z = cross( vec3(v12,0) , vec3(v1c,0) ).z;
  if( rad3c >= rad31 && rad3c <= rad32 && z >= 0.0 ){
    float ratio_3c_21 = ( rad3c - rad31 ) / ( rad32 - rad31 );
    vec2 point4 = v12 * ratio_3c_21 + points[0] ;
    vec4 color4 = getColor(
      colors[0] ,
      colors[1] ,
      ratio_3c_21
    );
    float len34 = length( point4 - points[2] );
    float len3c = length( v3c );
    float ratio_3c_34 = len3c / len34;
    color = getColor(
      colors[2] ,
      color4 ,
      ratio_3c_34
    );
  }
  gl_FragColor = color;
}
`;
/** 画布宽高 */
const CANVAS_SIZE = 300;
export default function Point3Gradient() {
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
      ['TRIANGLE_STRIP'],
      [{ name: 'a_Position', size: 2 }],
      [
        {
          name: 'u_Color',
          method: 'uniformMatrix3fv',
          data: [
            ...new Color('#1e9600').toArray(),
            ...new Color('#fff200').toArray(),
            ...new Color('#ff0000').toArray(),
          ],
        },
        {
          name: 'u_Point',
          method: 'uniformMatrix3fv',
          data: [
            200, 280, 0 /**                                                                     */,
            40, 150, 0 /**                                                                    */,
            150, 40, 0,
          ],
        },
      ],
      []
    );
    polyRef.current.draw();
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}
