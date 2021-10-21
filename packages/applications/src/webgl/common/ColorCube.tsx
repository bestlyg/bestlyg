import React, { useRef, useEffect } from 'react';
import { Poly, Webgl, THREE } from '@bestlyg/webgl';
import { useCreation } from 'ahooks';

const { Matrix4, Color } = THREE;
const vertexShaderSource = `
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_ModelMatrix ;
varying vec4 v_Color;
void main(){
  gl_Position = u_ModelMatrix * a_Position;
  v_Color = a_Color;
}
`;
const fragmentShaderSource = `
precision mediump float;
varying vec4 v_Color;
void main(){
  gl_FragColor=v_Color;
}
`;
//    v6----- v5
//   /|      /|
//  v1------v0|
//  | |     | |
//  | |v7---|-|v4
//  |/      |/
//  v2------v3
const arrays = [
  [1, 1, 1, ...new Color('#4158D0').toArray()], //v0
  [-1, 1, 1, ...new Color('#C850C0').toArray()], //v1
  [-1, -1, 1, ...new Color('#FFCC70').toArray()], //v2
  [1, -1, 1, ...new Color('#FF4196').toArray()], //v3
  [1, -1, -1, ...new Color('#C850C0').toArray()], //v4
  [1, 1, -1, ...new Color('#FFCC70').toArray()], //v5
  [-1, 1, -1, ...new Color('#FF4196').toArray()], //v6
  [-1, -1, -1, ...new Color('#4158D0').toArray()], //v7
]
  .flat()
  .map(v => v / 2);
const indexes = [
  [0, 1, 2, 0, 2, 3], // front
  [6, 5, 4, 6, 4, 7], // back
  [1, 6, 7, 1, 7, 2], // left
  [5, 0, 3, 5, 3, 4], // right
  [5, 6, 1, 5, 1, 0], // top
  [4, 7, 2, 4, 2, 3], // bottom
].flat();
export default function ColorCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<Webgl>();
  const polyRef = useRef<Poly>();
  const rotateMatrixs = useCreation(
    () => [
      new Matrix4().makeRotationX(0.01),
      new Matrix4().makeRotationY(0.01),
      new Matrix4().makeRotationZ(0.01),
    ],
    []
  );
  const modelMatrix = useCreation(() => new Matrix4(), []);
  useEffect(() => {
    const webgl = (webglRef.current = new Webgl({
      canvas: canvasRef.current!,
      size: [300, 300],
    }));
    webgl.context.enable(webgl.context.DEPTH_TEST);
    const poly = (polyRef.current = new Poly({
      webgl,
      data: arrays,
      drawTypes: ['TRIANGLES'],
      vertexShaderSource,
      fragmentShaderSource,
      indexes,
      attributes: [
        { name: 'a_Position', size: 3 },
        { name: 'a_Color', size: 3 },
      ],
      uniforms: [{ name: 'u_ModelMatrix', data: modelMatrix.elements, method: 'uniformMatrix4fv' }],
    }));
    (function render() {
      rotateMatrixs.forEach(mat => modelMatrix.multiply(mat));
      webgl.clear();
      poly.updateUniforms();
      poly.draw();
      requestAnimationFrame(render);
    })();
  }, []);
  return <canvas ref={canvasRef} />;
}
