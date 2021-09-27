import { WEBGL } from '@bestlyg/shared';
import { InputNumber, Space } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
const vertexShaderSource = `
attribute vec4 a_Position;
void main(){
  gl_Position=a_Position;
}
`;
const fragmentShaderSource = `
precision mediump float;
uniform vec2 u_Center ;
float random(vec2 fragCoord){
  vec2 modelVec = vec2(0.123,0.234);
  float randVal = dot( fragCoord , modelVec );
  return fract( sin(randVal) * 10000.0 );
}
void main(){
    vec2 curVec = gl_FragCoord.xy - u_Center;
    float rad = atan(curVec.y,curVec.x) * 10.0;
    float color = random( vec2( int(rad) , 0.0 ) );
    gl_FragColor = vec4( color , color , color , 1.0) ;
}
`;
const CANVAS_SIZE = 300;
export default function RadiationTexture() {
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
        {
          name: 'u_Center',
          method: 'uniform2fv',
          data: [CANVAS_SIZE / 2, CANVAS_SIZE / 2],
        },
      ]
    );
    polyRef.current.draw();
  }, []);
  return <canvas ref={canvasRef} />;
}
