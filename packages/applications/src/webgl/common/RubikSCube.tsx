import { WEBGL, angleToRad } from '@bestlyg/shared';
import React, { useEffect, useRef, useState } from 'react';
import { useEventListener, useCreation } from 'ahooks';
import { Matrix4 } from 'three';
import cube1Jpg from './images/cube1.jpg';
import dogJpg from './images/dog.jpg';
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
  [
    -0.5, 0.5, 0.5, 0.25, 1 /*                                                                   */,
    -0.5, -0.5, 0.5, 0.25, 0.5 /*                                                                */,
    0.5, 0.5, 0.5, 0.5, 1 /*                                                                     */,
    0.5, -0.5, 0.5, 0.5, 0.5 /*                                                                  */,
  ],
  [
    -0.5, 0.5, -0.5, 0, 0.5 /*                                                                   */,
    -0.5, -0.5, -0.5, 0, 0 /*                                                                    */,
    -0.5, 0.5, 0.5, 0.25, 0.5 /*                                                                 */,
    -0.5, -0.5, 0.5, 0.25, 0 /*                                                                  */,
  ],
  [
    0.5, 0.5, 0.5, 0.5, 1 /*                                                                    */,
    0.5, -0.5, 0.5, 0.5, 0.5 /*                                                                 */,
    0.5, 0.5, -0.5, 0.75, 1 /*                                                                  */,
    0.5, -0.5, -0.5, 0.75, 0.5 /*                                                               */,
  ],
  [
    0.5, 0.5, -0.5, 0.25, 0.5 /*                                                                */,
    0.5, -0.5, -0.5, 0.25, 0 /*                                                                 */,
    0.5, 0.5, -0.5, 0.5, 0.5 /*                                                                 */,
    0.5, -0.5, -0.5, 0.5, 0 /*                                                                  */,
  ],
  [
    -0.5, 0.5, -0.5, 0, 1 /*                                                                    */,
    -0.5, 0.5, 0.5, 0, 0.5 /*                                                                   */,
    0.5, 0.5, -0.5, 0.25, 1 /*                                                                  */,
    0.5, 0.5, 0.5, 0.25, 0.5 /*                                                                 */,
  ],
  [
    -0.5, -0.5, 0.5, 0.5, 0.5 /*                                                                 */,
    -0.5, -0.5, -0.5, 0.5, 0 /*                                                                  */,
    0.5, -0.5, 0.5, 0.75, 0.5 /*                                                                 */,
    0.5, -0.5, -0.5, 0.75, 0 /*                                                                  */,
  ],
];
export default function RubikSCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WEBGL.Webgl>();
  const polysRef = useRef<WEBGL.Poly[]>([]);
  const composeRef = useRef<WEBGL.Compose>(new WEBGL.Compose());
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
    const polys = polysRef.current;
    const modelMatrix = new Matrix4();
    modelMatrix.makeRotationY(-Math.PI / 2);
    webgl.clear();
    const poly = new WEBGL.Poly(
      webglRef.current!,
      sources.flat(),
      ['TRIANGLE_STRIP'],
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
          source: cube1Jpg,
          format: 'RGB',
          minFilter: 'LINEAR',
        },
      ]
    );
    poly.async.then(() => {
      webgl.clear();
      poly.draw();
    });

    // (function ani() {
    //   composeRef.current.update(Date.now());
    //   poly.updateAttributes();
    //   poly.draw();
    //   requestAnimationFrame(ani);
    // })();
  }, []);
  return <canvas ref={canvasRef} />;
}
