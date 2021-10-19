import { Compose, Poly, Track, WebglProgram } from '@bestlyg/webgl';
import React, { useEffect, useRef } from 'react';
import { useEventListener } from 'ahooks';
import { sky } from '../assets';
import { Webgl } from '@bestlyg/applications';
const vertexShaderSource = `
attribute vec4 a_Position;
attribute float a_PointSize;
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
    v_Color = a_Color;
}
`;
const fragmentShaderSource = `
precision mediump float;
varying vec4 v_Color;
void main(){
    float dist=distance(gl_PointCoord,vec2(0.5,0.5));
    if(dist<0.5){
      gl_FragColor=v_Color;
    }else{
      discard;
    }
}
`;
const pointList: {
  x: number;
  y: number;
  size: number;
  r: number;
  g: number;
  b: number;
  a: number;
}[] = [];
const pointMap = ({
  x,
  y,
  size,
  r,
  g,
  b,
  a,
}: {
  x: number;
  y: number;
  size: number;
  r: number;
  g: number;
  b: number;
  a: number;
}) => [x, y, size, r, g, b, a];
export default function StarDrawWebgl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<WebglProgram>();
  const polyRef = useRef<Poly>();
  const composeRef = useRef<Compose>(new Compose());
  useEffect(() => {
    if (!canvasRef.current) return;
    pointList.length = 0;
    const webgl = (webglRef.current = new WebglProgram({
      canvas: canvasRef.current!,
      vertexShaderSource,
      fragmentShaderSource,
      canvasSize: [600, 400],
    }));
    webgl.color = [0, 0, 0, 0];
    webgl.clear();
    const ctx = webgl.context;
    ctx.enable(ctx.BLEND);
    ctx.blendFunc(ctx.SRC_ALPHA, ctx.ONE_MINUS_SRC_ALPHA);
    const poly = (polyRef.current = new Poly(
      webglRef.current,
      pointList.map(pointMap).flat(),
      ['POINTS'],
      [
        { name: 'a_Position', size: 2 },
        { name: 'a_PointSize', size: 1 },
        { name: 'a_Color', size: 4 },
      ],
      [],
      []
    ));
    polyRef.current.draw();
    (function ani() {
      composeRef.current.update(Date.now());
      poly.data = pointList.map(pointMap).flat();
      poly.updateAttributes();
      poly.draw();
      requestAnimationFrame(ani);
    })();
  }, []);
  useEventListener(
    'click',
    e => {
      const webgl = webglRef.current;
      const poly = polyRef.current;
      const compose = composeRef.current;
      if (!webgl || !poly || !compose) return;
      const { clientX, clientY } = e;
      const position = webgl.transformPosition({ client: [clientX, clientY] }).webgl;
      const item = {
        x: position[0],
        y: position[1],
        size: ~~(Math.random() * 4 + 4),
        r: 0.87,
        g: 0.91,
        b: 1,
        a: 1,
      };
      const track = new Track(item, [
        {
          key: 'a',
          loop: true,
          frames: [
            { time: 0, value: 1 },
            { time: 1000, value: 0 },
            { time: 2000, value: 1 },
          ],
        },
      ]);
      compose.addChildren(track);
      pointList.push(item);
    },
    {
      target: canvasRef.current,
    }
  );
  return (
    <canvas
      ref={canvasRef}
      style={{
        background: `url(${sky.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right bottom',
      }}
    />
  );
}
