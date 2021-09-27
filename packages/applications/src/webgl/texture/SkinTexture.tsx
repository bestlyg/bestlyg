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
// 倍数 ， 取sin的后面位数 ， 增加随机性
uniform float u_Multiple;
// 模型向量 ， 与当前片元点积 ， 增加随机性
uniform vec2 u_ModelVec;

float random(){
    float randVal = dot( gl_FragCoord.xy , u_ModelVec );
    return fract( sin(randVal) * u_Multiple );
}
void main(){
    float color = random() ;
    gl_FragColor = vec4( color , color , color ,1) ;
}
`;
const CANVAS_SIZE = 300;
export default function SkinTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WEBGL.Webgl>();
  const polyRef = useRef<WEBGL.Poly>();
  const [data, setData] = useState({
    u_Multiple: [100],
    u_ModelVec: [0.123, 0.456],
  });
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
          name: 'u_Multiple',
          method: 'uniform1fv',
          data: data.u_Multiple,
        },
        {
          name: 'u_ModelVec',
          method: 'uniform2fv',
          data: data.u_ModelVec,
        },
      ]
    );
    polyRef.current.draw();
  }, []);
  useEffect(() => {
    if (!polyRef.current) return;
    const uniMap = polyRef.current.uniformMap;
    Object.entries(data).forEach(([k, v]) => {
      uniMap[k].data = v;
    });
    polyRef.current.updateUniforms();
    polyRef.current.draw();
  }, [data]);
  return (
    <Space direction="vertical">
      <Space>
        <div>倍数:</div>
        <div>
          <InputNumber
            value={data.u_Multiple[0]}
            onChange={e => setData({ ...data, u_Multiple: [e] })}
          />
        </div>
      </Space>
      <Space>
        <div>模型向量:</div>
        <div>
          X ：
          <InputNumber
            step={0.01}
            value={data.u_ModelVec[0]}
            onChange={e => {
              const u_ModelVec = data.u_ModelVec;
              u_ModelVec[0] = e;
              setData({ ...data, u_ModelVec });
            }}
          />
        </div>
        <div>
          Y ：
          <InputNumber
            step={0.01}
            value={data.u_ModelVec[1]}
            onChange={e => {
              const u_ModelVec = data.u_ModelVec;
              u_ModelVec[1] = e;
              setData({ ...data, u_ModelVec });
            }}
          />
        </div>
      </Space>
      <canvas ref={canvasRef}></canvas>
    </Space>
  );
}
