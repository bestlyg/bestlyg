import { WEBGL } from '@bestlyg/shared';
import React, { useRef, useEffect } from 'react';
import { cube } from '../assets';
import { useOrthographicTrackballControls } from '../../hooks';

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

export default function OrthographicTrackballControls() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WEBGL.Webgl>();
  const polyRef = useRef<WEBGL.Poly>();
  const { mat } = useOrthographicTrackballControls({
    canvasRef,
    onUpdated: () => {
      if (!webglRef.current || !polyRef.current) return;
      webglRef.current!.clear();
      polyRef.current.updateUniforms();
      polyRef.current!.draw();
    },
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
  return <canvas ref={canvasRef} />;
}
