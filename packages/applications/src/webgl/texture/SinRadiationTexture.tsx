import { Poly, Webgl } from '@bestlyg/webgl';
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
float sinRandom(float rad , float A , float omega , float phi){
    return A * sin( omega * rad + phi ) ;
}
void main(){
    vec2 v = gl_FragCoord.xy - u_Center;
    float rad = atan( v.y , v.x );
    float color = sinRandom( rad , 1.0 , 4.0 , 2.0 ) ;
    gl_FragColor = vec4( color , color , color , 1.0) ;
}
`;
const CANVAS_SIZE = 300;
export default function SinRadiationTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<Webgl>();
  const polyRef = useRef<Poly>();
  useEffect(() => {
    webglRef.current = new Webgl({
      canvas: canvasRef.current!,
      size: [CANVAS_SIZE, CANVAS_SIZE],
    });
    polyRef.current = new Poly({
      webgl: webglRef.current,
      vertexShaderSource,
      fragmentShaderSource,
      data: [-1, 1, -1, -1, 1, 1, 1, -1],
      drawTypes: ['TRIANGLE_STRIP'],
      attributes: [{ name: 'a_Position', size: 2 }],
      uniforms: [
        {
          name: 'u_Center',
          method: 'uniform2fv',
          data: [CANVAS_SIZE / 2, CANVAS_SIZE / 2],
        },
      ],
    });
    polyRef.current.draw();
  }, []);
  return <canvas ref={canvasRef} />;
}
