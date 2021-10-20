import React, { useEffect, useRef } from 'react';
import { cube } from '../assets';
import { THREE, Poly, Webgl } from '@bestlyg/webgl';

const { Matrix4 } = THREE;
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
export default function RubikSCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<Webgl>();
  useEffect(() => {
    if (!canvasRef.current) return;
    const webgl = (webglRef.current = new Webgl({ canvas: canvasRef.current!, size: [300, 300] }));
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
    const poly = new Poly({
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
          name: 'u_ModelMatrix',
          data: modelMatrix.elements,
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
    });
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
