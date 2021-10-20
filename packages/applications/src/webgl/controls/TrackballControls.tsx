import { Webgl, controls, Poly, THREE } from '@bestlyg/webgl';
import React, { useRef, useEffect, useState } from 'react';
import { cube } from '../assets';
import { Checkbox, Radio, Space } from 'antd';
import { useCreation, useEventListener } from 'ahooks';

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

export default function TrackballControls() {
  const orthographicCamera = useCreation(() => {
    const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 1, 2000);
    camera.position.set(2, 2, 5);
    return camera;
  }, []);
  const perspectiveCamera = useCreation(() => {
    const camera = new THREE.PerspectiveCamera(60, 1, 1, 2000);
    camera.position.set(2, 2, 5);
    return camera;
  }, []);
  const trackballControlsRef = useRef<controls.TrackballControls>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<Webgl>();
  const polyRef = useRef<Poly>();
  const [controlForm, setControlForm] = useState<{
    right: [boolean, number];
    left: [boolean, boolean];
  }>({
    right: [true, 1],
    left: [true, true],
  });
  useEffect(() => {
    const {
      right: [rx, ry],
      left: [lx, ly],
    } = controlForm;
    // right
    const control = trackballControlsRef.current!;
    if (!control) return;
    control.screenSpacePanning = ry === 1;
    if (rx) {
      if (ry === 0) control.panDirection = controls.Direction.HORIZONTAL;
      else control.panDirection = controls.Direction.ALL;
    } else {
      if (ry === 0) control.panDirection = controls.Direction.NONE;
      else control.panDirection = controls.Direction.VERTICAL;
    }
    // left
    if (lx) {
      if (ly) control.rotateDirection = controls.Direction.ALL;
      else control.rotateDirection = controls.Direction.HORIZONTAL;
    } else {
      if (ly) control.rotateDirection = controls.Direction.VERTICAL;
      else control.rotateDirection = controls.Direction.NONE;
    }
  }, [controlForm]);
  useEffect(() => {
    const webgl = (webglRef.current = new Webgl({ canvas: canvasRef.current!, size: [300, 300] }));
    const orbitControls = (trackballControlsRef.current = new controls.TrackballControls(
      canvasRef.current!,
      orthographicCamera
      // perspectiveCamera
    ));
    orbitControls.update();
    webgl.context.enable(webgl.context.CULL_FACE);
    // context.enable(context.DEPTH_TEST);
    webgl.clear();
    const poly = (polyRef.current = new Poly({
      webgl,
      vertexShaderSource,
      fragmentShaderSource,
      data: cube.source,
      drawTypes: ['TRIANGLES'],
      attributes: [
        { name: 'a_Position', size: 3 },
        { name: 'a_Pin', size: 2 },
      ],
      uniforms: [
        {
          name: 'u_Matrix',
          data: trackballControlsRef.current.pvMartrix.elements,
          method: 'uniformMatrix4fv',
        },
      ],
      textures: [
        {
          name: 'u_Sampler',
          source: cube.image,
          format: 'RGB',
          minFilter: 'LINEAR',
        },
      ],
    }));
    poly.async.then(() => {
      webgl.clear();
      poly.draw();
    });
  }, []);
  const [camera, setCamera] = useState(0);
  useEffect(() => {
    trackballControlsRef.current!.camera = camera === 0 ? orthographicCamera : perspectiveCamera;
    trackballControlsRef.current!.update();
    webglRef.current?.clear();
    polyRef.current?.updateUniforms();
    polyRef.current?.draw();
  }, [camera]);
  useEventListener(
    'pointerdown',
    ({ button, clientX, clientY }) => {
      trackballControlsRef.current!.dragStart.set(clientX, clientY);
      switch (button) {
        case 0:
          trackballControlsRef.current!.state = controls.State.ROTATE;
          break;
        case 2:
          trackballControlsRef.current!.state = controls.State.PAN;
          break;
      }
    },
    { target: canvasRef }
  );
  useEventListener('pointerup', () => (trackballControlsRef.current!.state = controls.State.NONE), {
    target: canvasRef,
  });
  useEventListener(
    'pointermove',
    ({ clientX, clientY }) => {
      if (trackballControlsRef.current!.state === controls.State.NONE) return;
      trackballControlsRef.current?.trigger({
        x: clientX,
        y: clientY,
      });
      webglRef.current?.clear();
      polyRef.current?.updateUniforms();
      polyRef.current?.draw();
    },
    { target: canvasRef }
  );
  useEventListener(
    'wheel',
    e => {
      e.preventDefault();
      trackballControlsRef.current!.state = controls.State.DOLLY;
      trackballControlsRef.current?.trigger({
        dolly: e.deltaY,
      });
      webglRef.current?.clear();
      polyRef.current?.updateUniforms();
      polyRef.current?.draw();
    },
    { target: canvasRef }
  );
  useEventListener('contextmenu', e => e.preventDefault(), { target: canvasRef });
  return (
    <Space direction="vertical">
      <Space>
        相机
        <Radio.Group
          onChange={e => {
            setCamera(e.target.value);
          }}
          value={camera}
        >
          <Radio value={0}>正交相机</Radio>
          <Radio value={1}>透视相机</Radio>
        </Radio.Group>
      </Space>
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
