import React, { useRef, useEffect, useState } from 'react';
import { WEBGL } from '@bestlyg/shared';
import styles from './styles.less';
import { Color } from 'three';
import { Space, InputNumber } from 'antd';
const vertexShaderSource = `
attribute vec4 a_Position;
void main(){
    gl_Position=a_Position;
}
`;
const fragmentShaderSource = `
precision mediump float;
uniform vec2 u_Start;
uniform vec2 u_End;
uniform float u_Mid;
uniform vec4 u_ColorStart;
uniform vec4 u_ColorMid;
uniform vec4 u_ColorEnd;

vec2 modelVec = u_End - u_Start;
float modelLen = length(modelVec);
vec2 modelVec1 = normalize(modelVec);
float midLen = modelLen * u_Mid;

void main(){
  vec2 curVec = vec2(gl_FragCoord) - u_Start;
  float curLen = clamp( dot(curVec,modelVec1) , 0.0 , modelLen );
  float curRatio = curLen / modelLen;
  vec4 color;
  if(curRatio <= u_Mid){
    float ratio = curRatio / u_Mid;
    color = u_ColorStart + ( u_ColorMid - u_ColorStart ) * ratio ;
  } else {
    float ratio = (curRatio - u_Mid) / (1.0 - u_Mid);
    color = u_ColorMid + ( u_ColorEnd - u_ColorMid ) * ratio ;
  }
  gl_FragColor= color;
}
`;
/** 画布宽高 */
const CANVAS_SIZE = 300;
const colorList = [
  { label: '起点颜色', key: 'u_ColorStart' },
  { label: '中间颜色', key: 'u_ColorMid' },
  { label: '终点颜色', key: 'u_ColorEnd' },
];
const colorItemList = ['红', '绿', '蓝', '透明度'];
const posList = [
  { label: '起点位置', key: 'u_Start' },
  { label: '终点位置', key: 'u_End' },
];
const posItemList = ['X', 'Y'];
export default function LineGradients() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WEBGL.Webgl>();
  const polyRef = useRef<WEBGL.Poly>();
  const [data, setData] = useState<Record<string, number[]>>({
    u_ColorStart: [...new Color('#FAD961').toArray(), 1],
    u_ColorMid: [...new Color('#F76B1C').toArray(), 1],
    u_ColorEnd: [...new Color('#EA3333').toArray(), 1],
    u_Start: [0, 0],
    u_Mid: [0.5],
    u_End: [CANVAS_SIZE, CANVAS_SIZE],
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
      ['TRIANGLE_STRIP'],
      [{ name: 'a_Position', size: 2 }],
      [
        { name: 'u_Start', data: data.u_Start, method: 'uniform2fv' },
        { name: 'u_Mid', data: data.u_Mid, method: 'uniform1fv' },
        {
          name: 'u_End',
          data: data.u_End,
          method: 'uniform2fv',
        },
        {
          name: 'u_ColorStart',
          data: data.u_ColorStart,
          method: 'uniform4fv',
        },
        {
          name: 'u_ColorMid',
          data: data.u_ColorMid,
          method: 'uniform4fv',
        },
        {
          name: 'u_ColorEnd',
          data: data.u_ColorEnd,
          method: 'uniform4fv',
        },
      ],
      []
    );
    polyRef.current.draw();
  }, []);
  useEffect(() => {
    const poly = polyRef.current;
    if (!poly) return;
    Object.entries(data).forEach(([k, v]) => {
      poly.uniformMap[k]!.data = v;
    });
    poly.updateUniforms();
    poly.draw();
  }, [data]);
  return (
    <Space direction="vertical" className={styles.container}>
      {colorList.map((v, i) => (
        <Space key={i}>
          {v.label}:
          {colorItemList.map((label, j) => (
            <InputNumber
              key={j}
              step={0.01}
              style={{ width: 120 }}
              min={0}
              max={1}
              value={data[v.key][j]}
              formatter={value => `${label}： ${value}`}
              onChange={e => {
                const color = data[v.key];
                color[j] = e;
                setData({ ...data, [v.key]: color });
              }}
            />
          ))}
        </Space>
      ))}
      {posList.map((v, i) => (
        <Space key={i}>
          {v.label}[左下角为(0,0)最大300]:
          {posItemList.map((label, j) => (
            <InputNumber
              key={j}
              step={1}
              style={{ width: 120 }}
              min={0}
              max={300}
              value={data[v.key][j]}
              formatter={value => `${label}： ${value}`}
              onChange={e => {
                const pos = data[v.key];
                pos[j] = e;
                setData({ ...data, [v.key]: pos });
              }}
            />
          ))}
        </Space>
      ))}
      <Space>
        中间位置比例(0~1):
        <InputNumber
          step={0.01}
          style={{ width: 120 }}
          min={0}
          max={1}
          value={data.u_Mid[0]}
          onChange={e => {
            setData({ ...data, u_Mid: [e] });
          }}
        />
      </Space>
      <canvas ref={canvasRef}></canvas>
    </Space>
  );
}
