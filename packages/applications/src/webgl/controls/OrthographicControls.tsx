import { WEBGL } from '@bestlyg/shared';
import React, { useRef, useEffect, useState } from 'react';
import { Vector3, OrthographicCamera, Matrix4 } from 'three';
import { useCreation } from 'ahooks';
import { cube } from '../assets';
import { useOrthographicControls } from '../../hooks';

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
const cameraParams = {
  width: 2,
  height: 2,
  near: -1,
  far: 10,
  eye: new Vector3(1, 1, 1),
  target: new Vector3(0, 0, 0),
  up: new Vector3(0, 1, 0),
};
export default function OrthographicCameraControls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WEBGL.Webgl>();
  const camera = useCreation(
    () =>
      new OrthographicCamera(
        -cameraParams.width / 2,
        cameraParams.width / 2,
        cameraParams.height / 2,
        -cameraParams.height / 2,
        cameraParams.near,
        cameraParams.far
      ),
    []
  );
  const mat = useCreation(
    () => new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse),
    []
  );
  useOrthographicControls({ canvasRef, camera, onUpdated: () => {} });
  useEffect(() => {
    if (!canvasRef.current) return;
    camera.position.copy(cameraParams.eye);
    camera.lookAt(cameraParams.target);
    camera.updateMatrixWorld();
    mat.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    const webgl = (webglRef.current = new WEBGL.Webgl({
      canvas: canvasRef.current!,
      vertexShaderSource,
      fragmentShaderSource,
      canvasSize: [300, 300],
    }));
    const { context } = webgl;
    context.enable(context.CULL_FACE);
    context.enable(context.DEPTH_TEST);
    webgl.clear();
    const poly = new WEBGL.Poly(
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
    );
    poly.async.then(() => {
      webgl.clear();
      poly.draw();
    });
  }, []);
  return <canvas ref={canvasRef} />;
}
