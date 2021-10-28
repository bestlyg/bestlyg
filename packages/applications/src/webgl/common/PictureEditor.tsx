import React, { useRef, useEffect } from 'react';
import { Webgl, THREE, Sence, Object3D, utils as WebglUtils } from '@bestlyg/webgl';
import { useCreation, useEventListener, useKeyPress, usePersistFn } from 'ahooks';
import { marshmello } from '../assets';

const { Matrix4, Vector3, OrthographicCamera, Vector2 } = THREE;
const imageData = {
  originVertivces: [
    [1, 1, 0],
    [-1, 1, 0],
    [-1, -1, 0],
    [1, -1, 0],
  ].flat(),
  vertivces: [
    [1, 1, 0],
    [-1, 1, 0],
    [-1, -1, 0],
    [1, -1, 0],
  ].flat(),
  pins: [
    [1, 1],
    [0, 1],
    [0, 0],
    [1, 0],
  ].flat(),
  indexes: [
    [0, 1, 2],
    [0, 2, 3],
  ].flat(),
};
const imageBorderData = {
  vertivces: [
    [1, 1, 0],
    [-1, 1, 0],
    [-1, -1, 0],
    [1, -1, 0],
  ].flat(),
  originVertivces: [
    [1, 1, 0],
    [-1, 1, 0],
    [-1, -1, 0],
    [1, -1, 0],
  ].flat(),
};
type State = 'drag' | 'rotate' | 'scale' | 'none';
const cursorMap: Record<State, React.CSSProperties['cursor']> = {
  drag: 'move',
  rotate: 'alias',
  scale: 'pointer',
  none: 'default',
};
const oppositePointMap: Record<number, number> = {
  0: 2 * 3,
  1: 3 * 3,
  2: 0 * 3,
  3: 1 * 3,
};
const angleSpace = Math.PI / 12;
export default function PictureEditor() {
  const stateRef = useRef<State>('none');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webglRef = useRef<Webgl>();
  const constants = useCreation(() => {
    const camera = new OrthographicCamera(-2, 2, 2, -2, 1, 2000);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);
    return {
      // 键盘值
      keySet: new Set<string>(),
      // 鼠标基于canvas点坐标
      clientStart: new Vector3(),
      // 鼠标基于canvas点坐标
      clientEnd: new Vector3(),
      // 鼠标基于webgl点坐标
      dragStart: new Vector3(),
      // 鼠标基于webgl点坐标
      dragEnd: new Vector3(),
      // 旋转基点
      rotateBase: new Vector3(),
      // 相机
      camera,
      // 画框矩阵
      frameMatrix: new Matrix4(),
      // 移动矩阵
      moveMatrix: new Matrix4(),
      // 旋转矩阵
      rotateMatrix: new Matrix4(),
      // 旋转基点矩阵
      rotateBaseMatrix1: new Matrix4(),
      // 旋转基点矩阵
      rotateBaseMatrix2: new Matrix4(),
      // 缩放矩阵
      scaleMatrix: new Matrix4(),
      // 投影视图矩阵
      pvMatrix: new Matrix4().multiply(camera.projectionMatrix).multiply(camera.matrixWorldInverse),
    };
  }, []);
  const senceRef = useRef<Sence>();
  const imageRef = useRef<Object3D>();
  const getModelMatrix = usePersistFn(() =>
    new Matrix4()
      .multiply(constants.rotateBaseMatrix2)
      .multiply(constants.moveMatrix)
      .multiply(constants.rotateMatrix)
      .multiply(constants.scaleMatrix)
      .multiply(constants.rotateBaseMatrix1)
  );
  const formatVertices = usePersistFn(() => {
    const { frameMatrix } = constants;
    frameMatrix.multiplyMatrices(getModelMatrix(), frameMatrix);
    for (let i = 0; i < imageData.originVertivces.length; i += 3) {
      const [x, y, z] = [
        imageData.originVertivces[i],
        imageData.originVertivces[i + 1],
        imageData.originVertivces[i + 2],
      ];
      const vec = new Vector3(x, y, z).applyMatrix4(frameMatrix);
      imageData.vertivces[i] = vec.x;
      imageData.vertivces[i + 1] = vec.y;
    }
    for (let i = 0; i < imageBorderData.originVertivces.length; i += 3) {
      const [x, y, z] = [
        imageData.originVertivces[i],
        imageData.originVertivces[i + 1],
        imageData.originVertivces[i + 2],
      ];
      const vec = new Vector3(x, y, z).applyMatrix4(frameMatrix);
      imageBorderData.vertivces[i] = vec.x;
      imageBorderData.vertivces[i + 1] = vec.y;
    }
  });
  const drag = usePersistFn(() => {
    const { dragEnd, dragStart } = constants;
    const vec = dragEnd.clone().sub(dragStart);
    constants.moveMatrix.setPosition(vec);
  });
  const rotate = usePersistFn(() => {
    const {
      dragEnd,
      dragStart,
      rotateBaseMatrix1,
      rotateBaseMatrix2,
      rotateBase,
      rotateMatrix,
      keySet,
    } = constants;
    rotateBaseMatrix1.makeTranslation(-rotateBase.x, -rotateBase.y, 0);
    rotateBaseMatrix2.makeTranslation(rotateBase.x, rotateBase.y, 0);
    const startVec = dragStart.clone().sub(rotateBase);
    const startAngle = Math.atan2(startVec.y, startVec.x);
    const endVec = dragEnd.clone().sub(rotateBase);
    const endAngle = Math.atan2(endVec.y, endVec.x);
    const angle = endAngle - startAngle;
    rotateMatrix.makeRotationZ(
      keySet.has('Alt') ? Math.round((endAngle - startAngle) / angleSpace) * angleSpace : angle
    );
  });
  const scale = usePersistFn(() => {
    const { dragEnd, dragStart, rotateBase, keySet, scaleMatrix } = constants;
    const startVec = dragStart.clone().sub(rotateBase);
    const endVec = dragEnd.clone().sub(rotateBase);
    let [sx, sy] = [endVec.x / startVec.x, endVec.y / startVec.y];
    if (keySet.has('Alt')) {
      const ratio = endVec.length() / startVec.length();
      [sx, sy] = [(sx * ratio) / Math.abs(sx), (sy * ratio) / Math.abs(sy)];
    }
    scaleMatrix.makeScale(sx, sy, 0);
  });
  const imageBorderRef = useRef<Object3D>();
  const toolkit = useCreation(() => {
    return {
      transformWorldPosition: ([x, y]: [number, number]) => {
        const vec = new Vector3(x, y).applyMatrix4(constants.pvMatrix.clone().invert());
        return new Vector2(vec.x, vec.y);
      },
      pointInImage: ({ x, y }: THREE.Vector2) => {
        const triangles: THREE.Vector3[][] = [];
        for (let i = 0; i < imageData.indexes.length; i += 3) {
          const item = imageData.indexes
            .slice(i, i + 3)
            .map(v => new Vector3(...imageData.vertivces.slice(v * 3, v * 3 + 3)));
          triangles.push(item);
        }
        const area = triangles.reduce((ans, triangle) => {
          return (
            ans +
            WebglUtils.cross(
              [triangle[0].x, triangle[0].y],
              [triangle[1].x, triangle[1].y],
              [triangle[2].x, triangle[2].y]
            )
          );
        }, 0);
        for (const triangle of triangles) {
          let check = true;
          for (let i = 0, n = triangle.length; i < n; i++) {
            const p1 = triangle[i];
            const p2 = triangle[(i + 1) % n];
            if (area * WebglUtils.cross([x, y], [p1.x, p1.y], [p2.x, p2.y]) < 0) {
              check = false;
              break;
            }
          }
          if (check) return true;
        }
        return false;
      },
      checkBorderPoint: ({
        x,
        y,
      }: THREE.Vector2): {
        point: THREE.Vector3;
        state: State;
        oppositePoint: THREE.Vector3;
      } | null => {
        const vec = new Vector3(x, y, 0);
        let ans: { point: THREE.Vector3; state: State; oppositePoint: THREE.Vector3 } | null = null;
        for (let i = 0; i < imageBorderData.vertivces.length; i += 3) {
          const [x, y, z] = [
            imageBorderData.vertivces[i],
            imageBorderData.vertivces[i + 1],
            imageBorderData.vertivces[i + 2],
          ];
          const point = new Vector3(x, y, z);
          const len = vec.clone().sub(point).length();
          if (len <= 0.3) {
            const oppositePointIdx = oppositePointMap[i / 3];
            ans = {
              point,
              state: len <= 0.1 ? 'scale' : 'rotate',
              oppositePoint: new Vector3(
                imageBorderData.vertivces[oppositePointIdx],
                imageBorderData.vertivces[oppositePointIdx + 1],
                imageBorderData.vertivces[oppositePointIdx + 2]
              ),
            };
          }
        }
        return ans;
      },
    };
  }, []);
  useEffect(() => {
    const webgl = (webglRef.current = new Webgl({
      canvas: canvasRef.current!,
      size: [300, 300],
    }));
    const sence = (senceRef.current = new Sence(webgl));
    const image = (imageRef.current = new Object3D({
      id: 'image',
      webgl,
      vertexShaderSource: `
      attribute vec4 a_Position;
      attribute vec2 a_Pin;
      uniform mat4 u_Matrix ;
      varying vec2 v_Pin;
      void main(){
        gl_Position = u_Matrix * a_Position;
        v_Pin=a_Pin;
      }
      `,
      fragmentShaderSource: `
      precision mediump float;
      uniform sampler2D u_Sampler;
      varying vec2 v_Pin;
      void main(){
        gl_FragColor=texture2D(u_Sampler,v_Pin);
      }
      `,
      drawTypes: ['TRIANGLES'],
      geoProps: {
        attributes: [
          {
            name: 'a_Position',
            data: imageData.vertivces,
            size: 3,
          },
          {
            name: 'a_Pin',
            data: imageData.pins,
            size: 2,
          },
        ],
        indexes: imageData.indexes,
      },
      matProps: {
        uniforms: [
          {
            name: 'u_Matrix',
            data: new Matrix4().elements,
            method: 'uniformMatrix4fv',
          },
        ],
        textures: [
          {
            name: 'u_Sampler',
            source: marshmello.image,
            format: 'RGB',
            options: {
              minFilter: 'LINEAR',
            },
          },
        ],
      },
    }));
    const imageBorder = (imageBorderRef.current = new Object3D({
      id: 'imageBorder',
      webgl,
      vertexShaderSource: `
      attribute vec4 a_Position;
      uniform mat4 u_Matrix ;
      void main(){
        gl_Position = u_Matrix * a_Position;
        gl_PointSize = 10.0;
      }
      `,
      fragmentShaderSource: `
      precision mediump float;
      void main(){
        float dist=distance(gl_PointCoord,vec2(0.5,0.5));
        if(dist<0.5){
          gl_FragColor=vec4(1.0,1.0,1.0,1.0);
        }else{
          discard;
        }
      }
      `,
      drawTypes: ['POINTS', 'LINE_LOOP'],
      geoProps: {
        attributes: [
          {
            name: 'a_Position',
            data: imageBorderData.vertivces,
            size: 3,
          },
        ],
      },
      matProps: {
        uniforms: [
          {
            name: 'u_Matrix',
            data: new Matrix4().elements,
            method: 'uniformMatrix4fv',
          },
        ],
        textures: [],
      },
    }));
    sence.add(image);
    sence.add(imageBorder);
    (function render() {
      const { pvMatrix, frameMatrix } = constants;
      const matrix = new Matrix4()
        .multiply(pvMatrix)
        .multiply(getModelMatrix())
        .multiply(frameMatrix).elements;
      sence.map.get('image')?.material.setUniform('u_Matrix', matrix);
      sence.map.get('imageBorder')?.material.setUniform('u_Matrix', matrix);
      sence.draw();
      requestAnimationFrame(render);
    })();
  }, []);
  useEventListener(
    'pointerdown',
    e => {
      const webgl = webglRef.current;
      const canvas = canvasRef.current;
      if (!webgl || !canvas) return;
      const { clientX, clientY } = e;
      const { webgl: webglSize } = webgl.transformPosition({ client: [clientX, clientY] });
      const p = toolkit.transformWorldPosition(webglSize);
      const pointInImage = toolkit.pointInImage(p);
      const borderPoint = toolkit.checkBorderPoint(p);
      constants.dragStart.set(p.x, p.y, 0);
      if (pointInImage) {
        stateRef.current = 'drag';
      } else if (borderPoint) {
        stateRef.current = borderPoint.state;
        const list: THREE.Vector3[] = [];
        for (let i = 0; i < imageBorderData.vertivces.length; i += 3) {
          const [x, y, z] = [
            imageBorderData.vertivces[i],
            imageBorderData.vertivces[i + 1],
            imageBorderData.vertivces[i + 2],
          ];
          list.push(new Vector3(x, y, z));
        }
        const imageCenter = new Vector3(
          (list[0].x + list[2].x) / 2,
          (list[0].y + list[2].y) / 2,
          0
        );
        if (constants.keySet.has('Shift') && borderPoint.state === 'rotate') {
          constants.rotateBase.copy(borderPoint.oppositePoint!);
        } else {
          constants.rotateBase.copy(imageCenter);
        }
      }
    },
    { target: canvasRef }
  );
  useEventListener(
    'pointermove',
    e => {
      const webgl = webglRef.current;
      const canvas = canvasRef.current;
      if (!webgl || !canvas) return;
      const { clientX, clientY } = e;
      const { webgl: webglSize } = webgl.transformPosition({ client: [clientX, clientY] });
      const p = toolkit.transformWorldPosition(webglSize);
      const pointInImage = toolkit.pointInImage(p);
      const borderPoint = toolkit.checkBorderPoint(p);
      if (pointInImage && stateRef.current === 'none') {
        canvas.style.cursor = cursorMap['drag']!;
      } else if (borderPoint) {
        canvas.style.cursor = cursorMap[borderPoint.state]!;
      } else {
        canvas.style.cursor = cursorMap['none']!;
      }
      constants.dragEnd.set(p.x, p.y, 0);
      switch (stateRef.current) {
        case 'drag':
          drag();
          break;
        case 'rotate':
          rotate();
          break;
        case 'scale':
          scale();
          break;
        default:
          break;
      }
    },
    { target: canvasRef }
  );
  useEventListener(
    'pointerup',
    e => {
      const webgl = webglRef.current;
      const canvas = canvasRef.current;
      if (!webgl || !canvas) return;
      stateRef.current = 'none';
      canvas.style.cursor = cursorMap['none']!;
      formatVertices();
      const resetMatrix = new Matrix4();
      constants.moveMatrix.copy(resetMatrix);
      constants.rotateMatrix.copy(resetMatrix);
      constants.rotateBaseMatrix1.copy(resetMatrix);
      constants.rotateBaseMatrix2.copy(resetMatrix);
      constants.scaleMatrix.copy(resetMatrix);
    },
    { target: canvasRef }
  );
  useEventListener('keydown', e => constants.keySet.add(e.key));
  useEventListener('keyup', e => constants.keySet.delete(e.key));
  return <canvas ref={canvasRef} />;
}
