import { WEBGL } from '@bestlyg/shared';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { cube } from '../assets';
import { useOrthographicOrbitControls } from '../../hooks';
import { Checkbox, Radio, Row, Space } from 'antd';

const vertexShaderSource = `
attribute vec4 a_Position;
attribute vec2 a_Pin;
uniform mat4 u_Matrix ;
varying vec2 v_Pin;
void main(){
  gl_Position = u_Matrix * a_Position;
  v_Pin=a_Pin;
}
`;
const fragmentShaderSource = `
precision mediump float;
uniform sampler2D u_Sampler;
varying vec2 v_Pin;
void main(){
  gl_FragColor=texture2D(u_Sampler,v_Pin);
}
`;

export default function OrthographicCameraControls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WEBGL.Webgl>();
  const polyRef = useRef<WEBGL.Poly>();
  const [controlForm, setControlForm] = useState<{
    right: [boolean, number];
    left: [boolean, boolean];
  }>({
    right: [true, 1],
    left: [true, true],
  });
  const panDirection = useMemo(() => {
    const { right } = controlForm;
    let ans = '';
    if (right[0]) ans += 'x';
    switch (right[1]) {
      case 1:
        ans += 'y';
        break;
      case 2:
        ans += 'z';
        break;
    }
    return ans;
  }, [controlForm]);
  const rotateDirection = useMemo(() => {
    const { left } = controlForm;
    let ans = '';
    if (left[0]) ans += 'x';
    if (left[1]) ans += 'y';
    return ans;
  }, [controlForm]);
  const { mat } = useOrthographicOrbitControls({
    canvasRef,
    onUpdated: () => {
      if (!webglRef.current || !polyRef.current) return;
      webglRef.current!.clear();
      polyRef.current.updateUniforms();
      polyRef.current!.draw();
    },
    panDirection,
    rotateDirection,
  });
  useEffect(() => {
    if (!canvasRef.current) return;
    const webgl = (webglRef.current = new WEBGL.Webgl({
      canvas: canvasRef.current!,
      vertexShaderSource,
      fragmentShaderSource,
      canvasSize: [300, 300],
    }));
    const { context } = webgl;
    context.enable(context.CULL_FACE);
    // context.enable(context.DEPTH_TEST);
    webgl.clear();
    const poly = (polyRef.current = new WEBGL.Poly(
      webglRef.current!,
      cube.source,
      ['TRIANGLES'],
      [
        { name: 'a_Position', size: 3 },
        { name: 'a_Pin', size: 2 },
      ],
      [
        {
          name: 'u_Matrix',
          data: mat.elements,
          method: 'uniformMatrix4fv',
        },
      ],
      [
        {
          name: 'u_Sampler',
          source: cube.image,
          format: 'RGB',
          minFilter: 'LINEAR',
        },
      ]
    ));
    poly.async.then(() => {
      webgl.clear();
      poly.draw();
    });
  }, []);
  return (
    <Space direction="vertical">
      <Space>
        鼠标左键
        <Checkbox
          onChange={e => {
            controlForm.left[0] = e.target.checked;
            setControlForm({ ...controlForm });
          }}
          checked={controlForm.left[0]}
        >
          左右
        </Checkbox>
        <Checkbox
          onChange={e => {
            controlForm.left[1] = e.target.checked;
            setControlForm({ ...controlForm });
          }}
          checked={controlForm.left[1]}
        >
          上下
        </Checkbox>
      </Space>
      <Space>
        鼠标右键
        <Checkbox
          onChange={e => {
            controlForm.right[0] = e.target.checked;
            setControlForm({ ...controlForm });
          }}
          checked={controlForm.right[0]}
        >
          左右
        </Checkbox>
        上下:
        <Radio.Group
          onChange={e => {
            controlForm.right[1] = e.target.value;
            setControlForm({ ...controlForm });
          }}
          value={controlForm.right[1]}
        >
          <Radio value={0}>禁用</Radio>
          <Radio value={1}>y轴移动</Radio>
          <Radio value={2}>z轴移动</Radio>
        </Radio.Group>
      </Space>
      <canvas ref={canvasRef} />
    </Space>
  );
}
