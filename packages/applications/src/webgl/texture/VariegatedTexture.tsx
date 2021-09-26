import { WEBGL, angleToRad } from '@bestlyg/shared';
import React, { useEffect, useRef } from 'react';
const vertexShaderSource = `
attribute vec4 a_Position;
void main(){
  gl_Position=a_Position;
}
`;
const fragmentShaderSource = `
precision mediump float;
float random(){
    // 倍数 ， 取sin的后面位数 ， 增加随机性
    float multiple = 10000.0 ;
    // 模型向量 ， 与当前片元点积 ， 增加随机性
    vec2 modelVec = vec2( 0.123 , 0.456 ) ;
    float randVal = dot( gl_FragCoord.xy , modelVec );
    return fract( sin( randVal ) * multiple );
}
void main(){
    float color = random() ;
    gl_FragColor = vec4( color , color , color ,1) ;
}
`;
const CANVAS_SIZE = 300;
export default function VariegatedTexture() {
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
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      'TRIANGLE_STRIP',
      [{ name: 'a_Position', size: 2, index: 0, byteIndex: 0 }],
      []
    );
    polyRef.current.draw();
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}
