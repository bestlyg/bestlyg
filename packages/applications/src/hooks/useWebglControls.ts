import { useRef, useCallback } from 'react';
import { Matrix4, OrthographicCamera, Vector2, Vector3, Spherical } from 'three';
import { useEventListener, useCreation, usePersistFn, useMount } from 'ahooks';
import { clamp } from 'lodash';
/** 控制器状态 */
enum ControlsState {
  NONE,
  /* 平移 */
  PAN,
  /* 旋转 */
  ROTATE,
  /* 缩放 */
  DOLLY,
}

export function useOrthographicOrbitControls({
  canvasRef,
  onUpdated,
  zoomScale = 0.95,
  panDirection = 'xy',
  rotateDirection = 'xy',
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onUpdated: () => void;
  zoomScale?: number;
  panDirection?: string;
  rotateDirection?: string;
}) {
  const cameraParams = useCreation(
    () => ({
      width: 3,
      height: 3,
      near: -1,
      far: 6,
      eye: new Vector3(1, 1, 1),
      target: new Vector3(0, 0, 0),
      up: new Vector3(0, 1, 0),
    }),
    []
  );
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
  const spherical = useCreation(
    () => new Spherical().setFromVector3(camera.position.clone().sub(cameraParams.target)),
    []
  );
  const mat = useCreation(
    () => new Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse),
    []
  );
  const update = usePersistFn(() => {
    camera.lookAt(cameraParams.target);
    camera.updateWorldMatrix(true, false);
    mat.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    onUpdated();
  });
  useMount(() => {
    camera.position.copy(cameraParams.eye);
    update();
  });
  const state = useRef(ControlsState.NONE);
  const dragStart = useCreation(() => new Vector2(), []);
  const dragEnd = useCreation(() => new Vector2(), []);
  const pan = usePersistFn((delta: Vector2) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { right, left, top, bottom, matrix } = camera;
    // 相机宽度
    const width = right - left;
    // 相机高度
    const height = top - bottom;
    // canvas x轴 移动比例
    const ratioX = delta.x / canvas.width;
    // canvas y轴 移动比例
    const ratioY = delta.y / canvas.height;
    // 相机 x轴 移动距离
    const distanceX = ratioX * width;
    // 相机 y轴 移动距离
    const distanceY = ratioY * height;
    // 沿 x轴 移动的量
    const vecX = new Vector3().setFromMatrixColumn(matrix, 0).multiplyScalar(-distanceX);
    // 沿 -z轴 移动的量
    const vecZ = new Vector3()
      .crossVectors(camera.up, new Vector3().setFromMatrixColumn(matrix, 0))
      .multiplyScalar(distanceY);
    // 沿 y轴 移动的量
    const vecY = new Vector3().setFromMatrixColumn(matrix, 1).multiplyScalar(distanceY);
    if (panDirection.includes('x')) {
      cameraParams.target.add(vecX);
      camera.position.add(vecX);
    }
    if (panDirection.includes('y')) {
      cameraParams.target.add(vecY);
      camera.position.add(vecY);
    } else if (panDirection.includes('z')) {
      cameraParams.target.add(vecZ);
      camera.position.add(vecZ);
    }
    update();
  });
  const dooly = usePersistFn((doolyScale: number) => {
    camera.zoom *= doolyScale;
    camera.updateProjectionMatrix();
    update();
  });
  const rotate = usePersistFn((delta: Vector2) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    spherical.setFromVector3(camera.position.clone().sub(cameraParams.target));
    if (rotateDirection.includes('x')) {
      spherical.theta -= (Math.PI * 2 * delta.x) / canvas.height;
    }
    if (rotateDirection.includes('y')) {
      spherical.phi = clamp(
        spherical.phi - (Math.PI * 2 * delta.y) / canvas.height,
        0.000000001,
        Math.PI * 2 * 0.999999999
      );
    }
    camera.position.copy(
      cameraParams.target.clone().add(new Vector3().setFromSpherical(spherical))
    );
    update();
  });
  const dragMap = useCreation(
    () => ({
      [ControlsState.PAN]: pan,
      [ControlsState.ROTATE]: rotate,
    }),
    []
  );
  useEventListener('contextmenu', e => e.preventDefault(), { target: canvasRef });
  useEventListener(
    'pointerdown',
    ({ button, clientX, clientY }) => {
      dragStart.set(clientX, clientY);
      if (button === 0) {
        // 左键
        state.current = ControlsState.ROTATE;
      } else if (button === 1) {
        // 滚轮
      } else if (button === 2) {
        // 右键
        state.current = ControlsState.PAN;
      }
    },
    { target: canvasRef }
  );
  useEventListener('pointerup', () => (state.current = ControlsState.NONE), { target: canvasRef });
  useEventListener(
    'pointermove',
    ({ clientX, clientY }) => {
      if (state.current === ControlsState.NONE) return;
      dragEnd.set(clientX, clientY);
      dragMap[state.current]?.(dragEnd.clone().sub(dragStart));
      dragStart.copy(dragEnd);
    },
    { target: canvasRef }
  );
  useEventListener(
    'wheel',
    e => {
      e.preventDefault();
      const { deltaY } = e;
      const doolyScale = deltaY > 0 ? zoomScale : 1 / zoomScale;
      dooly(doolyScale);
    },
    { target: canvasRef }
  );
  return {
    camera,
    mat,
  };
}
