import { WebglProgram, controls, Poly, THREE } from '@bestlyg/webgl';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import { cube } from '../assets';
import { Checkbox, Radio, Space } from 'antd';
import { useCreation, usePersistFn, useMount, useEventListener } from 'ahooks';
import { Matrix4 } from 'three';

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
  const orthographicCamera = useCreation(() => {
    const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, -2, 5);
    camera.position.set(1, 1, 1);
    camera.lookAt(0, 0, 0);
    return camera;
  }, []);
  const orbitControlsRef = useRef<controls.OrbitControls>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const programRef = useRef<WebglProgram>();
  const polyRef = useRef<Poly>();
  const [controlForm, setControlForm] = useState<{
    right: [boolean, number];
    left: [boolean, boolean];
  }>({
    right: [true, 1],
    left: [true, true],
  });
  useEffect(() => {
    // right
    const {
      right: [x, y],
    } = controlForm;
    const control = orbitControlsRef.current!;
    if (!control) return;
    control.screenSpacePanning = y === 1;
    if (x) {
      if (y === 0) control.panDirection = controls.Direction.HORIZONTAL;
      else control.panDirection = controls.Direction.ALL;
    } else {
      if (y === 0) control.panDirection = controls.Direction.NONE;
      else control.panDirection = controls.Direction.VERTICAL;
    }
  }, [controlForm]);
  const rotateDirection = useMemo(() => {
    const { left } = controlForm;
    let ans = '';
    if (left[0]) ans += 'x';
    if (left[1]) ans += 'y';
    return ans;
  }, [controlForm]);
  useEffect(() => {
    if (!canvasRef.current) return;
    const program = (programRef.current = new WebglProgram({
      canvas: canvasRef.current!,
      vertexShaderSource,
      fragmentShaderSource,
      canvasSize: [300, 300],
    }));
    const orbitControls = (orbitControlsRef.current = new controls.OrbitControls(
      canvasRef.current,
      orthographicCamera
    ));
    orbitControls.update();
    program.context.enable(program.context.CULL_FACE);
    // context.enable(context.DEPTH_TEST);
    program.clear();
    const poly = (polyRef.current = new Poly(
      programRef.current!,
      cube.source,
      ['TRIANGLES'],
      [
        { name: 'a_Position', size: 3 },
        { name: 'a_Pin', size: 2 },
      ],
      [
        {
          name: 'u_Matrix',
          data: orbitControlsRef.current.pvMartrix.elements,
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
      program.clear();
      poly.draw();
    });
  }, []);
  useEventListener(
    'pointerdown',
    ({ button, clientX, clientY }) => {
      switch (button) {
        case 2:
          orbitControlsRef.current!.dragStart.set(clientX, clientY);
          orbitControlsRef.current!.state = controls.State.PAN;
      }
    },
    { target: canvasRef }
  );

  useEventListener('pointerup', () => (orbitControlsRef.current!.state = controls.State.NONE), {
    target: canvasRef,
  });
  useEventListener(
    'pointermove',
    ({ clientX, clientY }) => {
      if (orbitControlsRef.current!.state === controls.State.NONE) return;
      orbitControlsRef.current?.trigger({
        x: clientX,
        y: clientY,
      });
      programRef.current?.clear();
      polyRef.current?.updateUniforms();
      polyRef.current?.draw();
    },
    {
      target: canvasRef,
    }
  );
  useEventListener('contextmenu', e => e.preventDefault(), { target: canvasRef });
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
