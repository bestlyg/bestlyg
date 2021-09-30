import { WEBGL } from '@bestlyg/shared';
import React, { useEffect, useRef } from 'react';
import { Matrix4 } from 'three';
import cubeJpg from './images/cube.jpg';
const vertexShaderSource = `
attribute vec4 a_Position;
attribute vec2 a_Pin;
uniform mat4 u_ModelMatrix ;
varying vec2 v_Pin;
void main(){
  gl_Position = u_ModelMatrix * a_Position;
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
const sources = [
  // front blue
  [-0.5, 0.5, 0.5, 0.25, 1],
  [-0.5, -0.5, 0.5, 0.25, 0.5],
  [0.5, 0.5, 0.5, 0.5, 1],
  [0.5, 0.5, 0.5, 0.5, 1],
  [-0.5, -0.5, 0.5, 0.25, 0.5],
  [0.5, -0.5, 0.5, 0.5, 0.5],
  // left orange
  [-0.5, 0.5, -0.5, 0, 0.5],
  [-0.5, -0.5, -0.5, 0, 0],
  [-0.5, 0.5, 0.5, 0.25, 0.5],
  [-0.5, 0.5, 0.5, 0.25, 0.5],
  [-0.5, -0.5, -0.5, 0, 0],
  [-0.5, -0.5, 0.5, 0.25, 0],
  // right red
  [0.5, 0.5, 0.5, 0.5, 1],
  [0.5, -0.5, 0.5, 0.5, 0.5],
  [0.5, 0.5, -0.5, 0.75, 1],
  [0.5, 0.5, -0.5, 0.75, 1],
  [0.5, -0.5, 0.5, 0.5, 0.5],
  [0.5, -0.5, -0.5, 0.75, 0.5],
  // back green
  [0.5, 0.5, -0.5, 0.25, 0.5],
  [0.5, -0.5, -0.5, 0.25, 0],
  [-0.5, 0.5, -0.5, 0.5, 0.5],
  [-0.5, 0.5, -0.5, 0.5, 0.5],
  [0.5, -0.5, -0.5, 0.25, 0],
  [-0.5, -0.5, -0.5, 0.5, 0],
  // top yellow
  [-0.5, 0.5, -0.5, 0, 1],
  [-0.5, 0.5, 0.5, 0, 0.5],
  [0.5, 0.5, -0.5, 0.25, 1],
  [0.5, 0.5, -0.5, 0.25, 1],
  [-0.5, 0.5, 0.5, 0, 0.5],
  [0.5, 0.5, 0.5, 0.25, 0.5],
  // bottom white
  [-0.5, -0.5, 0.5, 0.5, 0.5],
  [-0.5, -0.5, -0.5, 0.5, 0],
  [0.5, -0.5, 0.5, 0.75, 0.5],
  [0.5, -0.5, 0.5, 0.75, 0.5],
  [-0.5, -0.5, -0.5, 0.5, 0],
  [0.5, -0.5, -0.5, 0.75, 0],
].flat();
export default function RubikSCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WEBGL.Webgl>();
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
    context.enable(context.DEPTH_TEST);
    const modelMatrix = new Matrix4();
    const rotateMatrixs = [
      new Matrix4().makeRotationX(0.01),
      new Matrix4().makeRotationY(0.01),
      new Matrix4().makeRotationZ(0.01),
    ];
    webgl.clear();
    const poly = new WEBGL.Poly(
      webglRef.current!,
      sources,
      ['TRIANGLES'],
      [
        { name: 'a_Position', size: 3 },
        { name: 'a_Pin', size: 2 },
      ],
      [
        {
          name: 'u_ModelMatrix',
          data: modelMatrix.elements,
          method: 'uniformMatrix4fv',
        },
      ],
      [
        {
          name: 'u_Sampler',
          source: cubeJpg,
          format: 'RGB',
          minFilter: 'LINEAR',
        },
      ]
    );
    poly.async.then(() => {
      webgl.clear();
      poly.draw();
    });
    (function ani() {
      webgl.clear();
      rotateMatrixs.forEach(mat => modelMatrix.multiply(mat));
      poly.updateUniforms();
      poly.draw();
      requestAnimationFrame(ani);
    })();
  }, []);
  return <canvas ref={canvasRef} />;
}
